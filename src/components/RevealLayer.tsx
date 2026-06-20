import { useEffect, useRef } from "react";

const SPOTLIGHT_R = 310;
const LERP = 0.075; // cinematic lag — lower = more trail

interface RevealLayerProps {
  image: string;
}

/** Builds the CSS radial-gradient mask string for a given position. */
function buildMask(x: number, y: number): string {
  return [
    `radial-gradient(`,
    `circle ${SPOTLIGHT_R}px at ${x}px ${y}px,`,
    `black   0%,`,
    `black   36%,`,
    `rgba(0,0,0,0.88) 50%,`,
    `rgba(0,0,0,0.60) 62%,`,
    `rgba(0,0,0,0.28) 74%,`,
    `rgba(0,0,0,0.08) 84%,`,
    `transparent      92%`,
    `)`,
  ].join(" ");
}

/**
 * Self-contained reveal layer:
 * - owns mouse tracking + RAF lerp loop internally
 * - mutates the div's mask-image directly → zero React re-renders on the hot path
 * - uses pure CSS gradient mask → fully GPU-composited, no canvas encoding
 */
export default function RevealLayer({ image }: RevealLayerProps) {
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const div = divRef.current;
    if (!div) return;

    // Start off-screen so the helmet is hidden until the user moves the cursor
    const mouse = { x: -9999, y: -9999 };
    const smooth = { x: -9999, y: -9999 };
    let raf: number;
    let entered = false;

    const applyMask = (x: number, y: number) => {
      const mask = buildMask(x, y);
      div.style.maskImage = mask;
      (div.style as unknown as Record<string, string>)["-webkit-mask-image"] =
        mask;
    };

    // Hide completely until cursor enters the viewport
    div.style.maskImage =
      "radial-gradient(circle 0px at -9999px -9999px, black, transparent)";
    (div.style as unknown as Record<string, string>)["-webkit-mask-image"] =
      "radial-gradient(circle 0px at -9999px -9999px, black, transparent)";

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      if (!entered) {
        // Snap smooth to mouse on first entry to avoid a long travel-in
        smooth.x = e.clientX;
        smooth.y = e.clientY;
        entered = true;
      }
    };

    const loop = () => {
      smooth.x += (mouse.x - smooth.x) * LERP;
      smooth.y += (mouse.y - smooth.y) * LERP;
      applyMask(smooth.x, smooth.y);
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={divRef}
      className="absolute inset-0 bg-center bg-cover bg-no-repeat pointer-events-none"
      style={{
        backgroundImage: `url(${image})`,
        willChange: "mask-image",
      }}
    />
  );
}
