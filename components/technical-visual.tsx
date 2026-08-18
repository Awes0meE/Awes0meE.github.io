import Image from "next/image";
import clsx from "clsx";

type TechnicalVisualProps = {
  className?: string;
};

export function TechnicalVisual({ className }: TechnicalVisualProps) {
  return (
    <div
      className={clsx(
        "grid w-full max-w-[calc(100vw-2.5rem)] min-w-0 gap-3 overflow-hidden sm:h-[430px] sm:max-w-full sm:self-center sm:grid-rows-[1.25fr_1fr] lg:h-[520px]",
        className
      )}
    >
      <div className="grid min-h-[190px] grid-cols-2 gap-3 sm:min-h-0">
        <div className="relative overflow-hidden rounded-lg border border-line bg-paper">
          <Image
            src="/uploads/hero/embedded-controller-isolated-tight-v3.webp"
            alt="Embedded controller board with a 0.96-inch OLED display"
            fill
            loading="eager"
            sizes="(min-width: 1024px) 28vw, 50vw"
            className="object-contain object-center"
          />
        </div>
        <div className="relative overflow-hidden rounded-lg border border-line bg-paper">
          <Image
            src="/uploads/hero/hardware-prototype-isolated-tight-v3.webp"
            alt="Embedded hardware prototype with a TFT display, camera, and physical controls"
            fill
            loading="eager"
            sizes="(min-width: 1024px) 28vw, 50vw"
            className="object-contain object-center"
          />
        </div>
      </div>
      <div className="grid min-h-[130px] grid-cols-3 gap-3 sm:min-h-0">
        <div className="relative overflow-hidden rounded-lg border border-line bg-paper">
          <Image
            src="/uploads/hero/battery-power-isolated-tight-v3.webp"
            alt="Battery-powered electronics prototype with a USB power board"
            fill
            sizes="(min-width: 1024px) 19vw, 34vw"
            className="object-contain object-center"
          />
        </div>
        <div className="relative overflow-hidden rounded-lg border border-line bg-paper">
          <Image
            src="/uploads/hero/power-supply-board-isolated-tight-v1.webp"
            alt="Custom 12 V, 5 V, and 3.3 V power-supply board"
            fill
            sizes="(min-width: 1024px) 19vw, 34vw"
            className="object-contain object-center"
          />
        </div>
        <div className="relative overflow-hidden rounded-lg border border-line bg-paper">
          <Image
            src="/uploads/hero/ad831-mixer-cutout-v1.png"
            alt="AD831 mixer board with SMA connectors"
            fill
            sizes="(min-width: 1024px) 19vw, 34vw"
            className="object-contain object-center drop-shadow-[0_8px_8px_rgba(23,32,29,0.18)]"
          />
        </div>
      </div>
    </div>
  );
}
