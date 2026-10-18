import type { ReactNode } from "react";

const gold = "#273E2B";
const goldSoft = "#A7C4AB";
const plum = "#273E2B";

function Stage({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`icon-3d relative inline-flex h-14 w-14 items-center justify-center ${className}`}
      style={{ perspective: "420px" }}
      aria-hidden
    >
      <span className="icon-3d-inner relative block h-11 w-11" style={{ transformStyle: "preserve-3d" }}>
        {children}
      </span>
    </span>
  );
}

function ChatIcon() {
  return (
    <Stage className="icon-3d-float">
      <span
        className="absolute inset-0 rounded-2xl"
        style={{
          background: `linear-gradient(145deg, ${goldSoft}, ${gold})`,
          transform: "translateZ(10px)",
          boxShadow: "0 8px 16px -8px rgba(224,138,42,0.55)",
        }}
      />
      <span
        className="absolute left-2 top-2 h-6 w-7 rounded-lg bg-white"
        style={{ transform: "translateZ(16px)" }}
      />
      <span
        className="absolute bottom-2 right-1.5 h-4 w-5 rounded-md"
        style={{ background: plum, transform: "translateZ(20px)" }}
      />
    </Stage>
  );
}

function PencilIcon() {
  return (
    <Stage className="icon-3d-tilt">
      <span
        className="absolute left-1/2 top-1 h-9 w-3.5 -translate-x-1/2 rounded-sm"
        style={{
          background: `linear-gradient(90deg, ${gold}, ${goldSoft}, ${gold})`,
          transform: "rotateZ(-28deg) translateZ(12px)",
          boxShadow: "4px 6px 10px rgba(12,4,32,0.18)",
        }}
      />
      <span
        className="absolute left-[18px] top-1 h-2 w-3.5"
        style={{
          background: plum,
          clipPath: "polygon(50% 0, 100% 100%, 0 100%)",
          transform: "rotateZ(-28deg) translateZ(14px)",
        }}
      />
    </Stage>
  );
}

function CoverIcon() {
  return (
    <Stage className="icon-3d-spin-y">
      <span
        className="absolute left-2 top-1 h-9 w-7 rounded-sm"
        style={{
          background: `linear-gradient(160deg, ${goldSoft} 0%, ${gold} 55%, ${plum} 100%)`,
          transform: "rotateY(-18deg) translateZ(14px)",
          boxShadow: "6px 8px 14px rgba(12,4,32,0.22)",
        }}
      />
      <span
        className="absolute left-[11px] top-2 h-7 w-1 rounded-sm bg-white/50"
        style={{ transform: "rotateY(-18deg) translateZ(16px)" }}
      />
    </Stage>
  );
}

function PagesIcon() {
  return (
    <Stage className="icon-3d-float">
      <span
        className="absolute left-3 top-2 h-8 w-6 rounded-sm bg-white"
        style={{
          transform: "rotateZ(-12deg) translateZ(6px)",
          boxShadow: "0 4px 8px rgba(12,4,32,0.12)",
        }}
      />
      <span
        className="absolute left-4 top-1.5 h-8 w-6 rounded-sm"
        style={{
          background: goldSoft,
          transform: "rotateZ(2deg) translateZ(12px)",
        }}
      />
      <span
        className="absolute left-5 top-1 h-8 w-6 rounded-sm"
        style={{
          background: gold,
          transform: "rotateZ(10deg) translateZ(18px)",
          boxShadow: "4px 6px 12px rgba(224,138,42,0.35)",
        }}
      />
    </Stage>
  );
}

function GlobeIcon() {
  return (
    <Stage className="icon-3d-spin-y">
      <span
        className="absolute left-1.5 top-1.5 h-8 w-8 rounded-full"
        style={{
          background: `radial-gradient(circle at 30% 30%, ${goldSoft}, ${gold} 55%, ${plum})`,
          transform: "translateZ(12px)",
          boxShadow: "0 8px 14px -6px rgba(224,138,42,0.5)",
        }}
      />
      <span
        className="absolute left-1.5 top-[18px] h-px w-8 bg-white/40"
        style={{ transform: "translateZ(16px)" }}
      />
      <span
        className="absolute left-[22px] top-1.5 h-8 w-px bg-white/40"
        style={{ transform: "translateZ(16px)" }}
      />
    </Stage>
  );
}

function MegaphoneIcon() {
  return (
    <Stage className="icon-3d-tilt">
      <span
        className="absolute left-2 top-3 h-5 w-7"
        style={{
          background: `linear-gradient(90deg, ${plum}, ${gold})`,
          clipPath: "polygon(0 35%, 70% 0, 70% 100%, 0 65%)",
          transform: "translateZ(14px)",
        }}
      />
      <span
        className="absolute right-1.5 top-2 h-7 w-4 rounded-r-md"
        style={{
          background: goldSoft,
          transform: "translateZ(18px)",
          boxShadow: "4px 6px 12px rgba(224,138,42,0.4)",
        }}
      />
    </Stage>
  );
}

export const journeyIcons = [
  ChatIcon,
  PencilIcon,
  CoverIcon,
  PagesIcon,
  GlobeIcon,
  MegaphoneIcon,
];
