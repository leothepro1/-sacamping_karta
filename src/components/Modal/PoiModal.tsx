import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ImageCarousel } from './ImageCarousel';
import { CtaButtons } from './CtaButtons';
import type { Poi } from '../../data/types';

interface PoiModalProps {
  poi: Poi;
  onClose: () => void;
}

export function PoiModal({ poi, onClose }: PoiModalProps) {
  const { t } = useTranslation();
  const title = t(`${poi.i18nKey}.title`);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      <div className="relative z-10 w-full max-w-md overflow-hidden rounded-xl bg-white shadow-2xl">
        <ImageCarousel images={poi.images} alt={title} />

        <div className="space-y-4 p-5">
          <div>
            <h2 className="text-xl font-bold text-gray-900">{title}</h2>
            <p className="mt-1 text-sm text-gray-600">{t(`${poi.i18nKey}.description`)}</p>
          </div>

          <CtaButtons primary={poi.cta.primary} secondary={poi.cta.secondary} />
        </div>

        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/40 text-white transition-colors hover:bg-black/60"
          aria-label={t('modal.close')}
        >
          ×
        </button>
      </div>
    </div>
  );
}
