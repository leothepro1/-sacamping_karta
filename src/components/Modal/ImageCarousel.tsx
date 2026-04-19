import useEmblaCarousel from 'embla-carousel-react';
import { useCallback } from 'react';
import { cloudinaryUrl } from '../../lib/cloudinary';

interface ImageCarouselProps {
  images: readonly string[];
  alt: string;
}

export function ImageCarousel({ images, alt }: ImageCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  const scrollPrev = useCallback(() => {
    emblaApi?.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext();
  }, [emblaApi]);

  if (images.length === 0) return null;

  return (
    <div className="relative overflow-hidden rounded-t-xl">
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex">
          {images.map((publicId, index) => (
            <div key={publicId} className="min-w-0 flex-[0_0_100%]">
              <img
                src={cloudinaryUrl(publicId, { width: 640, height: 360 })}
                alt={`${alt} ${String(index + 1)}`}
                className="h-56 w-full object-cover"
                loading={index === 0 ? 'eager' : 'lazy'}
              />
            </div>
          ))}
        </div>
      </div>

      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={scrollPrev}
            className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-2 text-white transition-colors hover:bg-black/60"
            aria-label="Previous image"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={scrollNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-2 text-white transition-colors hover:bg-black/60"
            aria-label="Next image"
          >
            ›
          </button>
        </>
      )}
    </div>
  );
}
