import { useState, type FormEvent } from 'react';

const TO = 'edvard.brother@outlook.com';

export function contactMailto(name: string, email: string, question: string): string {
  const subject = 'Spørsmål til BCM-løpeguiden';
  const body = [`Navn: ${name.trim() || '(ikke oppgitt)'}`, `E-post: ${email.trim()}`, '', question.trim()].join('\n');
  return `mailto:${TO}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

function validEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

export function ContactPage() {
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
    window.location.href = contactMailto(name, email, question);
    setOpened(true);
  }

  return (
    <article className="contact wrap" id="kontakt">
      <div className="contact-in">
        <p className="kicker ink">BCM 2027</p>
        <h1>Kontakt oss</h1>
        <p className="intro">
          Send et spørsmål om løypa, tempoplanen eller siden. Meldingen åpnes i e-postprogrammet ditt, ferdig adressert, og sendes derfra.
        </p>
        <form className="card contact-form" onSubmit={submit} noValidate>
          <label className="lbl" htmlFor="kontakt-navn">
            Navn
          </label>
          <input id="kontakt-navn" name="navn" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} />

          <label className="lbl" htmlFor="kontakt-epost">
            E-post
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
          {emailBad && <p className="field-error">Skriv en e-postadresse vi kan svare til.</p>}

          <label className="lbl" htmlFor="kontakt-spm">
            Spørsmål
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
          {questionBad && <p className="field-error">Skriv spørsmålet, minst et par ord.</p>}

          <button type="submit" className="btn primary">
            Send spørsmål
          </button>
          {opened && (
            <p className="help contact-sent" role="status">
              E-posten er klar i e-postprogrammet ditt. Trykk send der, så går den til {TO}.
            </p>
          )}
        </form>
      </div>
    </article>
  );
}
