type PlaceholderImageProps = {
  alt: string;
  className?: string;
  label?: string;
  labelClassName?: string;
};

export function PlaceholderImage({
  alt,
  className = "",
  label,
  labelClassName = "",
}: PlaceholderImageProps) {
  return (
    <div
      role="img"
      aria-label={alt}
      className={`relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-ivory via-sand/60 to-coral/15 ${className}`}
    >
      <div
        aria-hidden
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(circle at 30% 40%, rgba(29,94,219,0.22), transparent 45%), radial-gradient(circle at 70% 70%, rgba(26,26,26,0.06), transparent 40%)",
        }}
      />
      <span
        className={`relative z-10 max-w-[90%] px-4 text-center font-sans font-medium tracking-wide text-charcoal ${
          labelClassName || "text-xs sm:text-sm"
        }`}
      >
        {label ?? alt}
      </span>
    </div>
  );
}
