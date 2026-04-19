import { useTranslation } from 'react-i18next';
import type { PoiCta } from '../../data/types';

interface CtaButtonsProps {
  primary: PoiCta;
  secondary?: PoiCta | undefined;
}

export function CtaButtons({ primary, secondary }: CtaButtonsProps) {
  const { t } = useTranslation();

  return (
    <div className="flex gap-3">
      <a
        href={primary.url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 rounded-lg bg-brand-primary px-4 py-2.5 text-center text-sm font-semibold text-white transition-colors hover:bg-brand-primary/90"
      >
        {t(primary.i18nKey)}
      </a>
      {secondary && (
        <a
          href={secondary.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 rounded-lg border-2 border-brand-primary px-4 py-2.5 text-center text-sm font-semibold text-brand-primary transition-colors hover:bg-brand-primary/10"
        >
          {t(secondary.i18nKey)}
        </a>
      )}
    </div>
  );
}
