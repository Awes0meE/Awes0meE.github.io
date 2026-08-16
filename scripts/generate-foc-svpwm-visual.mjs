import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const outputPath = path.join(
  process.cwd(),
  "public",
  "uploads",
  "projects",
  "sensorless-foc-learning-route",
  "foc-svpwm-signal-chain.svg"
);

const colors = {
  ink: "#17201d",
  graphite: "#4f5854",
  line: "#d9dfda",
  paper: "#fbfcfa",
  pine: "#124c34",
  moss: "#2f7a56",
  copper: "#b65f23",
  chalk: "#f2f4f0",
  blue: "#2f6690",
  violet: "#7656a8"
};

function svpwm(valpha, vbeta, udc = 1, tpwm = 1) {
  let sector = 0;
  let tx;
  let ty;

  if (vbeta > 0) sector += 1;
  if ((Math.sqrt(3) * valpha - vbeta) / 2 > 0) sector += 2;
  if ((-Math.sqrt(3) * valpha - vbeta) / 2 > 0) sector += 4;

  switch (sector) {
    case 1:
      tx = (-1.5 * valpha + Math.sqrt(3) / 2 * vbeta) * (tpwm / udc);
      ty = (1.5 * valpha + Math.sqrt(3) / 2 * vbeta) * (tpwm / udc);
      break;
    case 2:
      tx = (1.5 * valpha + Math.sqrt(3) / 2 * vbeta) * (tpwm / udc);
      ty = -(Math.sqrt(3) * vbeta * tpwm / udc);
      break;
    case 3:
      tx = -(-1.5 * valpha + Math.sqrt(3) / 2 * vbeta) * (tpwm / udc);
      ty = Math.sqrt(3) * vbeta * tpwm / udc;
      break;
    case 4:
      tx = -(Math.sqrt(3) * vbeta * tpwm / udc);
      ty = (-1.5 * valpha + Math.sqrt(3) / 2 * vbeta) * (tpwm / udc);
      break;
    case 5:
      tx = Math.sqrt(3) * vbeta * tpwm / udc;
      ty = -(1.5 * valpha + Math.sqrt(3) / 2 * vbeta) * (tpwm / udc);
      break;
    case 6:
      tx = -(1.5 * valpha + Math.sqrt(3) / 2 * vbeta) * (tpwm / udc);
      ty = -(-1.5 * valpha + Math.sqrt(3) / 2 * vbeta) * (tpwm / udc);
      break;
    default:
      throw new Error(`Unexpected SVPWM sector ${sector}`);
  }

  const total = tx + ty;
  if (total > tpwm) {
    const scale = tpwm / total;
    tx *= scale;
    ty *= scale;
  }

  const ta = (tpwm - (tx + ty)) / 4;
  const tb = tx / 2 + ta;
  const tc = ty / 2 + tb;
  const mapping = {
    1: [tb, ta, tc],
    2: [ta, tc, tb],
    3: [ta, tb, tc],
    4: [tc, tb, ta],
    5: [tc, ta, tb],
    6: [tb, tc, ta]
  };
  const [tcmp1, tcmp2, tcmp3] = mapping[sector];

  return {
    sector,
    tx,
    ty,
    compare: [tcmp1, tcmp2, tcmp3].map((value) => (2 * value) / tpwm)
  };
}

function sampledPath(values, x, y, width, height, min = 0, max = 1) {
  return values
    .map((value, index) => {
      const px = x + (index / (values.length - 1)) * width;
      const normalized = (value - min) / (max - min);
      const py = y + height - normalized * height;
      return `${index === 0 ? "M" : "L"}${px.toFixed(2)} ${py.toFixed(2)}`;
    })
    .join(" ");
}

function arrow(x1, y1, x2, y2) {
  return `<path d="M${x1} ${y1} L${x2} ${y2}" class="arrow" marker-end="url(#arrowhead)"/>`;
}

function box(x, y, width, title, subtitle) {
  return `
    <g>
      <rect x="${x}" y="${y}" width="${width}" height="82" rx="14" class="block"/>
      <text x="${x + width / 2}" y="${y + 31}" class="box-title" text-anchor="middle">${title}</text>
      <text x="${x + width / 2}" y="${y + 57}" class="box-subtitle" text-anchor="middle">${subtitle}</text>
    </g>`;
}

const sampleCount = 241;
const samples = Array.from({ length: sampleCount }, (_, index) => {
  const angle = (index / (sampleCount - 1)) * Math.PI * 2 + 1e-7;
  return svpwm(0.48 * Math.cos(angle), 0.48 * Math.sin(angle));
});
const compare1 = samples.map((sample) => sample.compare[0]);
const compare2 = samples.map((sample) => sample.compare[1]);
const compare3 = samples.map((sample) => sample.compare[2]);

const comparePlot = { x: 558, y: 342, width: 930, height: 218 };
const comparePaths = [compare1, compare2, compare3].map((values) =>
  sampledPath(values, comparePlot.x, comparePlot.y, comparePlot.width, comparePlot.height)
);

const carrier = Array.from({ length: 241 }, (_, index) => {
  const phase = ((index / 240) * 5) % 1;
  return phase <= 0.5 ? phase * 2 : 2 - phase * 2;
});
const carrierPath = sampledPath(carrier, 80, 756, 430, 132);

const currentSampleCount = 241;
const currentA = Array.from({ length: currentSampleCount }, (_, index) =>
  Math.sin((index / (currentSampleCount - 1)) * Math.PI * 4)
);
const currentB = Array.from({ length: currentSampleCount }, (_, index) =>
  Math.sin((index / (currentSampleCount - 1)) * Math.PI * 4 - (2 * Math.PI) / 3)
);
const currentC = Array.from({ length: currentSampleCount }, (_, index) =>
  Math.sin((index / (currentSampleCount - 1)) * Math.PI * 4 + (2 * Math.PI) / 3)
);
const currentPlot = { x: 1085, y: 762, width: 410, height: 126 };
const currentPaths = [currentA, currentB, currentC].map((values) =>
  sampledPath(values, currentPlot.x, currentPlot.y, currentPlot.width, currentPlot.height, -1.2, 1.2)
);

const vectorCenter = { x: 260, y: 441 };
const vectorRadius = 122;
const vectorPoints = Array.from({ length: 6 }, (_, index) => {
  const angle = (-index * Math.PI) / 3;
  return {
    x: vectorCenter.x + vectorRadius * Math.cos(angle),
    y: vectorCenter.y + vectorRadius * Math.sin(angle)
  };
});
const hexagon = `${vectorPoints.map((point) => `${point.x.toFixed(2)},${point.y.toFixed(2)}`).join(" ")} ${vectorPoints[0].x.toFixed(2)},${vectorPoints[0].y.toFixed(2)}`;
const desiredAngle = -0.38;
const desiredEnd = {
  x: vectorCenter.x + vectorRadius * 0.79 * Math.cos(desiredAngle),
  y: vectorCenter.y + vectorRadius * 0.79 * Math.sin(desiredAngle)
};

const pulseRects = Array.from({ length: 5 }, (_, cycle) => {
  const base = 592 + cycle * 76;
  return `
    <rect x="${base}" y="778" width="24" height="30" rx="3" class="pulse-high"/>
    <rect x="${base + 52}" y="778" width="24" height="30" rx="3" class="pulse-high"/>
    <rect x="${base + 28}" y="840" width="20" height="30" rx="3" class="pulse-low"/>`;
}).join("");

const chain = [
  box(42, 118, 168, "Phase currents", "相电流 Ia / Ib / Ic"),
  box(230, 118, 166, "Clarke + Park", "静止系 → 旋转系"),
  box(416, 118, 142, "d/q PI", "电流调节"),
  box(578, 118, 156, "Inverse Park", "回到 αβ"),
  box(754, 118, 128, "αβ vector", "电压指令"),
  box(902, 118, 184, "SVPWM_Calc()", "sector + Tx / Ty"),
  box(1106, 118, 142, "Tcmp1-3", "写入 CCR1-3"),
  box(1268, 118, 286, "Six complementary PWM outputs", "三组上下桥臂脉冲")
].join("");

const chainArrows = [
  arrow(210, 159, 226, 159),
  arrow(396, 159, 412, 159),
  arrow(558, 159, 574, 159),
  arrow(734, 159, 750, 159),
  arrow(882, 159, 898, 159),
  arrow(1086, 159, 1102, 159),
  arrow(1248, 159, 1264, 159)
].join("");

const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 1080" role="img" aria-labelledby="title description">
  <title id="title">FOC and SVPWM signal chain derived from this STM32 firmware</title>
  <desc id="description">A bilingual diagram separating current transforms, SVPWM compare trajectories, the center-aligned timer carrier, complementary gate pulses, and motor phase currents.</desc>
  <defs>
    <marker id="arrowhead" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
      <path d="M0 0 L8 4 L0 8 Z" fill="${colors.pine}"/>
    </marker>
    <style>
      text { font-family: Inter, "Segoe UI", "Microsoft YaHei", sans-serif; fill: ${colors.ink}; }
      .title { font-size: 30px; font-weight: 700; letter-spacing: -0.5px; }
      .subtitle { font-size: 16px; fill: ${colors.graphite}; }
      .panel-title { font-size: 19px; font-weight: 700; }
      .panel-subtitle { font-size: 14px; fill: ${colors.graphite}; }
      .box-title { font-size: 15px; font-weight: 700; }
      .box-subtitle { font-size: 12px; fill: ${colors.graphite}; }
      .label { font-size: 13px; fill: ${colors.graphite}; }
      .tiny { font-size: 11px; fill: ${colors.graphite}; }
      .block { fill: white; stroke: ${colors.line}; stroke-width: 1.5; }
      .panel { fill: white; stroke: ${colors.line}; stroke-width: 1.5; }
      .arrow { fill: none; stroke: ${colors.pine}; stroke-width: 2; }
      .grid { stroke: ${colors.line}; stroke-width: 1; stroke-dasharray: 4 7; }
      .axis { stroke: ${colors.graphite}; stroke-width: 1.2; }
      .vector { stroke: ${colors.moss}; stroke-width: 2; fill: none; marker-end: url(#arrowhead); }
      .desired { stroke: ${colors.copper}; stroke-width: 4; fill: none; marker-end: url(#arrowhead); }
      .compare-1 { stroke: ${colors.pine}; stroke-width: 3; fill: none; }
      .compare-2 { stroke: ${colors.copper}; stroke-width: 3; fill: none; }
      .compare-3 { stroke: ${colors.blue}; stroke-width: 3; fill: none; }
      .carrier { stroke: ${colors.violet}; stroke-width: 2.5; fill: none; }
      .compare-line { stroke: ${colors.copper}; stroke-width: 2; stroke-dasharray: 8 6; }
      .pulse-high { fill: ${colors.pine}; }
      .pulse-low { fill: ${colors.copper}; }
      .current-a { stroke: ${colors.pine}; stroke-width: 2.5; fill: none; }
      .current-b { stroke: ${colors.copper}; stroke-width: 2.5; fill: none; }
      .current-c { stroke: ${colors.blue}; stroke-width: 2.5; fill: none; }
    </style>
  </defs>

  <rect width="1600" height="1080" fill="${colors.paper}"/>
  <text x="42" y="55" class="title">From current vector to switching pulses / 从电流矢量到开关脉冲</text>
  <text x="42" y="82" class="subtitle">A code-grounded reading of Clarke, Park, SVPWM_Calc(), TIM1 center-aligned mode, and CCR1-3</text>

${chain}
  ${chainArrows}

  <rect x="42" y="252" width="438" height="374" rx="18" class="panel"/>
  <text x="66" y="286" class="panel-title">Adjacent-vector synthesis / 相邻矢量合成</text>
  <text x="66" y="310" class="panel-subtitle">Sector selection + Tx / Ty + symmetric zero-vector time</text>
  <path d="M${vectorCenter.x - 156} ${vectorCenter.y} L${vectorCenter.x + 156} ${vectorCenter.y}" class="axis"/>
  <path d="M${vectorCenter.x} ${vectorCenter.y + 150} L${vectorCenter.x} ${vectorCenter.y - 150}" class="axis"/>
  <path d="M${hexagon}" fill="none" stroke="${colors.line}" stroke-width="2"/>
  ${vectorPoints.map((point) => `<path d="M${vectorCenter.x} ${vectorCenter.y} L${point.x.toFixed(2)} ${point.y.toFixed(2)}" class="vector"/>`).join("")}
  <path d="M${vectorCenter.x} ${vectorCenter.y} L${desiredEnd.x.toFixed(2)} ${desiredEnd.y.toFixed(2)}" class="desired"/>
  <text x="${desiredEnd.x + 8}" y="${desiredEnd.y - 6}" class="label">Vαβ request</text>
  <text x="367" y="422" class="tiny">Tx</text>
  <text x="324" y="354" class="tiny">Ty</text>
  <text x="68" y="596" class="label">The code limits Tx + Ty, then shares the remaining time symmetrically.</text>

  <rect x="502" y="252" width="1052" height="374" rx="18" class="panel"/>
  <text x="528" y="286" class="panel-title">Saddle-shaped compare trajectories / 马鞍形比较值轨迹</text>
  <text x="528" y="310" class="panel-subtitle">Normalized Tcmp1-3 while the αβ request rotates through one electrical cycle</text>
  <path d="M${comparePlot.x} ${comparePlot.y + comparePlot.height} L${comparePlot.x + comparePlot.width} ${comparePlot.y + comparePlot.height}" class="axis"/>
  <path d="M${comparePlot.x} ${comparePlot.y} L${comparePlot.x} ${comparePlot.y + comparePlot.height}" class="axis"/>
  ${Array.from({ length: 7 }, (_, index) => {
    const x = comparePlot.x + (index / 6) * comparePlot.width;
    return `<path d="M${x} ${comparePlot.y} L${x} ${comparePlot.y + comparePlot.height}" class="grid"/><text x="${x + 5}" y="${comparePlot.y + 18}" class="tiny">S${index === 6 ? 1 : index + 1}</text>`;
  }).join("")}
  ${[0, 0.5, 1].map((value) => {
    const y = comparePlot.y + comparePlot.height - value * comparePlot.height;
    return `<path d="M${comparePlot.x} ${y} L${comparePlot.x + comparePlot.width} ${y}" class="grid"/><text x="${comparePlot.x - 35}" y="${y + 4}" class="tiny">${value.toFixed(1)}</text>`;
  }).join("")}
  <path d="${comparePaths[0]}" class="compare-1"/>
  <path d="${comparePaths[1]}" class="compare-2"/>
  <path d="${comparePaths[2]}" class="compare-3"/>
  <line x1="568" y1="590" x2="600" y2="590" class="compare-1"/><text x="609" y="595" class="label">Tcmp1</text>
  <line x1="706" y1="590" x2="738" y2="590" class="compare-2"/><text x="747" y="595" class="label">Tcmp2</text>
  <line x1="844" y1="590" x2="876" y2="590" class="compare-3"/><text x="885" y="595" class="label">Tcmp3</text>
  <text x="1038" y="595" class="label">compare / duty references, not phase current</text>

  <rect x="42" y="650" width="1512" height="365" rx="18" class="panel"/>
  <text x="66" y="688" class="panel-title">Three waveform layers that must stay separate / 三层波形不能混为一谈</text>

  <text x="78" y="728" class="box-title">1  TIM1 center-aligned carrier</text>
  <text x="78" y="748" class="tiny">up/down counter behaves like a digital triangle / 计数器上下计数</text>
  <path d="M80 888 L510 888" class="axis"/>
  <path d="${carrierPath}" class="carrier"/>
  <path d="M80 806 L510 806" class="compare-line"/>
  <text x="86" y="799" class="tiny">one compare value</text>

  <text x="568" y="728" class="box-title">2  Complementary gate pulses</text>
  <text x="568" y="748" class="tiny">one pair shown; three pairs make six outputs / 示意一组上下桥臂</text>
  <text x="568" y="799" class="label">A_H</text>
  <text x="568" y="861" class="label">A_L</text>
${pulseRects}
  <path d="M592 812 L976 812" class="axis"/>
  <path d="M592 874 L976 874" class="axis"/>

  <text x="1044" y="728" class="box-title">3  Motor phase current</text>
  <text x="1044" y="748" class="tiny">continuous response after the inverter and motor / 电机侧连续响应</text>
  <path d="M${currentPlot.x} ${currentPlot.y + currentPlot.height / 2} L${currentPlot.x + currentPlot.width} ${currentPlot.y + currentPlot.height / 2}" class="axis"/>
  <path d="${currentPaths[0]}" class="current-a"/>
  <path d="${currentPaths[1]}" class="current-b"/>
  <path d="${currentPaths[2]}" class="current-c"/>
  <text x="1086" y="915" class="tiny" fill="${colors.pine}">Ia</text>
  <text x="1120" y="915" class="tiny" fill="${colors.copper}">Ib</text>
  <text x="1154" y="915" class="tiny" fill="${colors.blue}">Ic</text>

  <rect x="66" y="943" width="1464" height="48" rx="10" fill="${colors.chalk}"/>
  <text x="88" y="965" class="label">Firmware path  SVPWM_Calc() → Tcmp1-3 → CCR1-3; TIM1 center-aligned mode forms the carrier.</text>
  <text x="88" y="984" class="tiny">The CPU does not store a triangle lookup array, and the saddle-shaped compare traces are not literal motor phase current.</text>
</svg>
`;

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, svg, "utf8");
console.log(`Generated ${path.relative(process.cwd(), outputPath).replaceAll(path.sep, "/")}`);
