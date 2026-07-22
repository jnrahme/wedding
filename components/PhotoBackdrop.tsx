import Image from 'next/image';
import { wedding } from '@/config/wedding';

type PhotoBackdropProps = {
  src: string;
  alt?: string;
  priority?: boolean;
  sizes?: string;
  gradient?: 'vertical' | 'diagonal';
};

function clampDarkness(value: number) {
  return Math.max(0, Math.min(100, value));
}

export function PhotoBackdrop({
  src,
  alt = '',
  priority = false,
  sizes = '(max-width: 640px) 100vw, 430px',
  gradient = 'vertical',
}: PhotoBackdropProps) {
  const darkness = clampDarkness(wedding.photoDarkness);
  const imageOpacity = Math.max(35, 100 - Math.round(darkness * 0.48));
  const gradientStart = Math.round(darkness * 0.58);
  const gradientMiddle = Math.round(darkness * 0.88);
  const gradientEnd = Math.min(96, Math.round(darkness * 1.47));
  const gradientDirection = gradient === 'diagonal' ? 'to bottom right' : 'to bottom';

  return (
    <>
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className="object-cover"
        style={{ opacity: imageOpacity / 100 }}
      />
      <div className="absolute inset-0 bg-black" style={{ opacity: darkness / 100 }} />
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(${gradientDirection}, rgba(0,0,0,${gradientStart / 100}), rgba(0,0,0,${
            gradientMiddle / 100
          }), rgba(0,0,0,${gradientEnd / 100}))`,
        }}
      />
    </>
  );
}
