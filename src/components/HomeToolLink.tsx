import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

type Props = {
  children: ReactNode;
};

/** Lenke til verktøy på forsiden – brukes på artikkelsider uten duplisert UI. */
export function HomeToolLink({ children }: Props) {
  return (
    <p className="about-tool-link">
      <Link to="/">{children}</Link>
    </p>
  );
}
