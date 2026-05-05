import './card.scss';

export interface CardProps {
  title?: string;
  body?: string | Node;
  footer?: Node | Node[];
  className?: string;
}

export function createCard(props: CardProps = {}): HTMLDivElement {
  const { title, body, footer, className } = props;
  const card = document.createElement('div');
  card.className = 'feu-card';
  if (className) card.classList.add(...className.split(' ').filter(Boolean));

  if (title) {
    const h = document.createElement('h3');
    h.className = 'feu-card__title';
    h.textContent = title;
    card.appendChild(h);
  }

  if (body !== undefined) {
    const b = document.createElement('div');
    b.className = 'feu-card__body';
    if (typeof body === 'string') b.textContent = body;
    else b.appendChild(body);
    card.appendChild(b);
  }

  if (footer) {
    const f = document.createElement('div');
    f.className = 'feu-card__footer';
    const arr = Array.isArray(footer) ? footer : [footer];
    arr.forEach((n) => f.appendChild(n));
    card.appendChild(f);
  }

  return card;
}
