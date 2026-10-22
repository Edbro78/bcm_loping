import { useUi } from '../i18n/useUi';
import { usePreviewLocale } from '../state/previewLocale';

function FlagNorway() {
  return (
    <svg className="owner-flag-svg" viewBox="0 0 22 16" aria-hidden="true">
      <rect width="22" height="16" fill="#ba0c2f" />
      <rect x="6" width="4" height="16" fill="#fff" />
      <rect y="6" width="22" height="4" fill="#fff" />
      <rect x="7" width="2" height="16" fill="#00205b" />
      <rect y="7" width="22" height="2" fill="#00205b" />
    </svg>
  );
}

function FlagBritain() {
  return (
    <svg className="owner-flag-svg" viewBox="0 0 60 30" aria-hidden="true">
      <rect width="60" height="30" fill="#012169" />
      <path d="M0 0 60 30M60 0 0 30" stroke="#fff" strokeWidth="6" />
      <path d="M0 0 60 30M60 0 0 30" stroke="#c8102e" strokeWidth="4" />
      <path d="M30 0v30M0 15h60" stroke="#fff" strokeWidth="10" />
      <path d="M30 0v30M0 15h60" stroke="#c8102e" strokeWidth="6" />
    </svg>
  );
}

export function OwnerDeviceSeg() {
  const { device, setDevice } = usePreviewLocale();
  const o = useUi().owner;
  return (
    <div className="owner-device" role="group" aria-label={o.device}>
      <div className="seg owner-seg owner-seg--device">
        <button type="button" aria-pressed={device === 'desktop'} onClick={() => setDevice('desktop')}>
          {o.pc}
        </button>
        <button type="button" aria-pressed={device === 'mobile'} onClick={() => setDevice('mobile')}>
          {o.mobile}
        </button>
      </div>
    </div>
  );
}

export function OwnerLangSeg() {
  const { locale, setLocale } = usePreviewLocale();
  const o = useUi().owner;
  return (
    <div className="owner-lang" role="group" aria-label={o.language}>
      <div className="seg owner-seg owner-seg--lang">
        <button
          type="button"
          aria-pressed={locale === 'nb'}
          aria-label={o.norwegian}
          onClick={() => setLocale('nb')}
        >
          <FlagNorway />
        </button>
        <button
          type="button"
          aria-pressed={locale === 'en'}
          aria-label={o.english}
          onClick={() => setLocale('en')}
        >
          <FlagBritain />
        </button>
      </div>
    </div>
  );
}

export function OwnerToolbar() {
  const o = useUi().owner;
  return (
    <div className="owner-tools" aria-label={o.preview}>
      <OwnerDeviceSeg />
      <OwnerLangSeg />
    </div>
  );
}
