import Image from "next/image";
import clsx from "clsx";

type TechnicalVisualProps = {
  className?: string;
};

export function TechnicalVisual({ className }: TechnicalVisualProps) {
  return (
    <div className={clsx("grid w-full max-w-[calc(100vw-2.5rem)] min-w-0 gap-3 overflow-hidden sm:max-w-full sm:grid-cols-[1fr_0.48fr]", className)}>
      <div className="relative min-h-[330px] overflow-hidden rounded-lg border border-line bg-chalk">
        <Image
          src="/uploads/visuals/circuit-board.svg"
          alt="Circuit board on engineering notes"
          fill
          priority
          sizes="(min-width: 1024px) 45vw, 100vw"
          className="object-cover"
        />
      </div>
      <div className="grid gap-3">
        <div className="relative min-h-[158px] overflow-hidden rounded-lg border border-line bg-[#13201b]">
          <Image
            src="/uploads/visuals/dashboard.svg"
            alt="Control dashboard visualization"
            fill
            sizes="(min-width: 1024px) 20vw, 100vw"
            className="object-cover"
          />
        </div>
        <div className="relative min-h-[158px] overflow-hidden rounded-lg border border-line bg-chalk">
          <Image
            src="/uploads/visuals/lab-notes.svg"
            alt="Engineering notebook"
            fill
            sizes="(min-width: 1024px) 20vw, 100vw"
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
}
