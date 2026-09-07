/* Regenerate the local review from canonical MDX using the site's renderer. */
import fs from 'node:fs';
import path from 'node:path';
import Module from 'node:module';
import {fileURLToPath} from 'node:url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repo = path.resolve(__dirname, '../../..');
const localRequire = Module.createRequire(path.join(repo, 'package.json'));
const ts = localRequire('typescript');
const React = localRequire('react');
const { renderToStaticMarkup } = localRequire('react-dom/server');
const matter = localRequire('gray-matter');
const source = fs.readFileSync(path.join(repo, 'components/content-renderer.tsx'), 'utf8')
  .replace('import { cn } from "@/lib/utils";', 'const cn = (...classes: unknown[]) => classes.filter(Boolean).join(" ");');
const compiled = ts.transpileModule(source, { compilerOptions: {
  jsx: ts.JsxEmit.ReactJSX, module: ts.ModuleKind.CommonJS,
  target: ts.ScriptTarget.ES2020, esModuleInterop: true
} }).outputText;
const rendererModule = new Module(path.join(repo, 'content-review-renderer.cjs'));
rendererModule.paths = Module._nodeModulePaths(repo);
rendererModule._compile(compiled, path.join(repo, 'content-review-renderer.cjs'));
const { ContentRenderer } = rendererModule.exports;
const families = [
  ['tianjin', '天津津铁', 'Tianjin Jintie', '../tianjin-notes-2026-09-07', ['tianjin-stm32-light-calibration-control', 'tianjin-stm32-i2c-oled-debugging']],
  ['turing', '南京图灵', 'Nanjing Turing', '.', ['turing-windows-runtime-dependencies', 'turing-local-role-permissions']],
  ['juanyun', '卷云相变散热器', 'Juanyun Cooling', '.', ['juanyun-cooperative-task-timing', 'juanyun-flash-parameter-recovery']],
  ['foc', '无感 FOC', 'Sensorless FOC', '.', ['foc-angle-handoff', 'foc-current-sampling-timing']],
  ['chime', 'Claude Chime', 'Claude Chime', '.', ['claude-chime-startup-current', 'claude-chime-switched-adc-divider']]
];
const esc = value => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('"', '&quot;');
const notes = families.flatMap(([group, zh, en, dir, slugs]) => slugs.map(slug => {
  const {data, content} = matter(fs.readFileSync(path.resolve(__dirname, dir, slug + '.mdx'), 'utf8'));
  const html = renderToStaticMarkup(React.createElement(ContentRenderer, {source: content}))
    .replaceAll('href="/', 'href="https://www.66ccff-labs.com/');
  return {slug, group, familyZh: zh, familyEn: en, ...data, html};
}));
const labels = notes.map(note => Object.fromEntries(Object.entries(note).filter(([key]) => key !== 'html')));
const options = families.map(([group,zh,en]) => `<option value="${group}" data-zh="${esc(zh)}" data-en="${esc(en)}">${esc(zh)}</option>`).join('');
const articles = notes.map((n,i) => `<article data-note="${n.slug}" hidden><header><div class="eyebrow"><span class="lang-zh">${esc(n.familyZh)} · ${String(i+1).padStart(2,'0')} / 10</span><span class="lang-en">${esc(n.familyEn)} · ${String(i+1).padStart(2,'0')} / 10</span></div><h1><span class="lang-zh">${esc(n.titleZh)}</span><span class="lang-en">${esc(n.title)}</span></h1><p class="summary lang-zh">${esc(n.summaryZh)}</p><p class="summary lang-en">${esc(n.summary)}</p></header><div class="prose">${n.html}</div><footer><a href="https://www.66ccff-labs.com/work/${n.projectSlug}" target="_blank" rel="noreferrer"><span class="lang-zh">项目主页</span><span class="lang-en">Project page</span></a></footer></article>`).join('');
const css = fs.readFileSync(path.resolve(__dirname,'../tianjin-notes-2026-09-07/preview.html'),'utf8').match(/<style>([\s\S]*?)<\/style>/)[1];
fs.writeFileSync(path.join(__dirname, 'preview.html'), `<!doctype html><html lang="zh-CN" data-lang="zh"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex"><link rel="icon" href="data:,"><title>学习笔记集中审阅</title><style>${css}
nav{max-height:240px;overflow:auto}select{font:inherit;font-size:14px;min-height:42px;border:1px solid #ccd6cd;border-radius:5px;background:#fff;color:#26352e;padding:8px;max-width:100%}.note-tabs{display:flex;gap:8px;flex-wrap:wrap;width:100%}.note-tabs button{text-align:left}.pager{display:flex;justify-content:space-between;gap:12px;margin-top:36px}button:disabled{opacity:.35;cursor:default}table{table-layout:fixed}th,td{overflow-wrap:anywhere;padding:10px 12px}p,li{overflow-wrap:anywhere}@media(max-width:560px){.note-tabs button{font-size:12px;flex:1}th,td{font-size:12px;padding:8px}.languages{margin-left:auto}}
</style></head><body><nav aria-label="Review navigation"><select id="project" aria-label="Project">${options}</select><div class="languages"><button data-language="zh">中文</button><button data-language="en">English</button></div><div class="note-tabs" id="note-tabs"></div></nav><div class="status"><span class="lang-zh">5 个项目 · 10 篇学习笔记 · 待审阅，中英文均已备齐</span><span class="lang-en">5 projects · 10 study notes · Bilingual drafts for review</span></div><main>${articles}<div class="pager"><button id="previous"><span class="lang-zh">上一篇</span><span class="lang-en">Previous</span></button><button id="next"><span class="lang-zh">下一篇</span><span class="lang-en">Next</span></button></div></main><script>
const notes=${JSON.stringify(labels).replaceAll('<','\\u003c')};
const query=new URLSearchParams(location.search);
let current=notes.findIndex(n=>n.slug===query.get('note'));if(current<0)current=0;
let lang=query.get('lang')==='en'?'en':'zh';
function sync(){
 const n=notes[current];document.documentElement.dataset.lang=lang;document.documentElement.lang=lang==='zh'?'zh-CN':'en';document.title=(lang==='zh'?n.titleZh:n.title)+' · Review';
 document.querySelectorAll('[data-note]').forEach(el=>el.hidden=el.dataset.note!==n.slug);
 document.getElementById('project').value=n.group;
 document.querySelectorAll('option').forEach(el=>el.textContent=el.dataset[lang]);
 const tabs=document.getElementById('note-tabs');tabs.replaceChildren();
 notes.forEach((item,i)=>{if(item.group!==n.group)return;const b=document.createElement('button');b.textContent=lang==='zh'?item.titleZh:item.title;b.setAttribute('aria-pressed',String(i===current));b.dataset.select=item.slug;b.onclick=()=>select(i);tabs.appendChild(b)});
 document.querySelectorAll('[data-language]').forEach(el=>el.setAttribute('aria-pressed',String(el.dataset.language===lang)));
 document.getElementById('previous').disabled=current===0;document.getElementById('next').disabled=current===notes.length-1;
 history.replaceState(null,'','?note='+n.slug+'&lang='+lang);
}
function select(i){current=i;sync();scrollTo(0,0)}
document.getElementById('project').onchange=e=>select(notes.findIndex(n=>n.group===e.target.value));
document.querySelectorAll('[data-language]').forEach(el=>el.onclick=()=>{lang=el.dataset.language;sync()});
document.getElementById('previous').onclick=()=>select(current-1);document.getElementById('next').onclick=()=>select(current+1);sync();
</script></body></html>`);
process.stdout.write(`Rendered ${notes.length} bilingual notes.\n`);
