import { describe, expect, it } from 'vitest';
import { contactMailto } from './ContactPage';

describe('contactMailto', () => {
  it('adresserer spørsmålet direkte til innboksen', () => {
    const url = contactMailto('Kari', 'kari@example.com', 'Når åpner garderobene?');
    expect(url.startsWith('mailto:edvard.brother@outlook.com?')).toBe(true);
    const parsed = new URL(url);
    expect(parsed.searchParams.get('subject')).toBe('Spørsmål til BCM-løpeguiden');
    expect(parsed.searchParams.get('body')).toContain('Navn: Kari');
    expect(parsed.searchParams.get('body')).toContain('E-post: kari@example.com');
    expect(parsed.searchParams.get('body')).toContain('Når åpner garderobene?');
  });
});
