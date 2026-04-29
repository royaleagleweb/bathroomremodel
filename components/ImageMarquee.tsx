type Props = {
  images: string[];
  reverse?: boolean;
  height?: number;
};

export function ImageMarquee({ images, reverse = false, height = 320 }: Props) {
  if (images.length === 0) return null;

  // Duplicate the list so the translate3d(-50%) loop is seamless.
  const loop = [...images, ...images];

  return (
    <div className="relative w-full overflow-hidden bg-charcoal-deep">
      <div
        className={`flex gap-4 w-max ${
          reverse ? "animate-marquee-reverse" : "animate-marquee"
        }`}
        style={{ height }}
      >
        {loop.map((src, i) => (
          <div
            key={i}
            className="relative shrink-0 rounded-2xl overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.4)]"
            style={{ width: height * 1.35, height }}
          >
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-110"
              style={{ backgroundImage: `url(${src})` }}
            />
          </div>
        ))}
      </div>
      {/* edge fade */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-charcoal-deep to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-charcoal-deep to-transparent" />
    </div>
  );
}
