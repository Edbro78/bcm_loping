import { useState, type FormEvent } from 'react';
import { ui } from '../i18n/ui';
import { useUi } from '../i18n/useUi';
import type { Locale } from '../state/previewLocale';
import { usePreviewLocale } from '../state/previewLocale';

const TO = 'edvard.brother@outlook.com';

export function contactMailto(locale: Locale, name: string, email: string, question: string): string {
  const t = ui[locale].contact;
  const subject = t.mailtoSubject;
  const body = [
    t.mailtoNameLine.replace('{name}', name.trim() || t.nameNotGiven),
    t.mailtoEmailLine.replace('{email}', email.trim()),
    '',
    question.trim(),
  ].join('\n');
  return `mailto:${TO}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

function validEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

export function ContactPage() {
  const { locale } = usePreviewLocale();
  const t = useUi().contact;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [question, setQuestion] = useState('');
  const [tried, setTried] = useState(false);
  const [opened, setOpened] = useState(false);

  const emailBad = tried && !validEmail(email);
  const questionBad = tried && question.trim().length < 5;

  function submit(e: FormEvent) {
    e.preventDefault();
    setTried(true);
    setOpened(false);
    if (!validEmail(email) || question.trim().length < 5) return;
    window.location.href = contactMailto(locale, name, email, question);
    setOpened(true);
  }

  return (
    <article className="contact wrap" id="kontakt">
      <div className="contact-in">
        <p className="kicker ink">{t.kicker}</p>
        <h1>{t.h1}</h1>
        <p className="intro">{t.intro}</p>
        <form className="card contact-form" onSubmit={submit} noValidate>
          <label className="lbl" htmlFor="kontakt-navn">
            {t.name}
          </label>
          <input id="kontakt-navn" name="navn" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} />

          <label className="lbl" htmlFor="kontakt-epost">
            {t.email}
          </label>
          <input
            id="kontakt-epost"
            name="epost"
            type="email"
            autoComplete="email"
            required
            aria-invalid={emailBad}
            className={emailBad ? 'bad' : ''}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {emailBad && <p className="field-error">{t.emailError}</p>}

          <label className="lbl" htmlFor="kontakt-spm">
            {t.question}
          </label>
          <textarea
            id="kontakt-spm"
            name="sporsmal"
            required
            aria-invalid={questionBad}
            className={questionBad ? 'bad' : ''}
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
          {questionBad && <p className="field-error">{t.questionError}</p>}

          <button type="submit" className="btn primary">
            {t.submit}
          </button>
          {opened && (
            <p className="help contact-sent" role="status">
              {t.sent.replace('{email}', TO)}
            </p>
          )}
        </form>
      </div>
    </article>
  );
}
