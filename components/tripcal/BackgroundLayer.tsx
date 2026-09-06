import Image from "next/image";

const BACKGROUND_IMAGE_URL = "/images/travel-bg.jpg";

export default function BackgroundLayer() {
  return (
    <div className="fixed inset-0 -z-20 overflow-hidden pointer-events-none">
      <Image
        src={BACKGROUND_IMAGE_URL}
        alt="Travel landmarks background"
        fill
        priority
        sizes="100vw"
        quality={90}
        className="object-cover object-center filter brightness-[1.02] contrast-[0.98]"
      />
      {/* Soft light-blue leaning towards white overlay & subtle blur */}
      <div className="absolute inset-0 bg-gradient-to-b from-sky-50/90 via-sky-50/80 to-white/95 backdrop-blur-[1.5px]" />
      {/* Decorative soft ambient light orbs */}
      <div className="absolute top-10 left-1/4 w-96 h-96 rounded-full bg-sky-200/40 blur-3xl" />
      <div className="absolute bottom-12 right-1/4 w-96 h-96 rounded-full bg-blue-100/50 blur-3xl" />
    </div>
  );
}
