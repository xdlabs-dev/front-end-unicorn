import './button.scss';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps {
  /** Visible label. Ignored if `children` is provided. */
  label?: string;
  /** Visual style. Default: 'primary'. */
  variant?: ButtonVariant;
  /** Size. Default: 'md'. */
  size?: ButtonSize;
  /** Native disabled state. */
  disabled?: boolean;
  /** Native button type. Default: 'button'. */
  type?: 'button' | 'submit' | 'reset';
  /** Click handler. */
  onClick?: (event: MouseEvent) => void;
  /** Optional child node(s) — overrides `label`. */
  children?: Node | Node[] | string;
  /** Extra class names appended to the root element. */
  className?: string;
}

const VARIANT_CLASS: Record<ButtonVariant, string> = {
  primary: 'feu-btn--primary',
  secondary: 'feu-btn--secondary',
  ghost: 'feu-btn--ghost',
};

const SIZE_CLASS: Record<ButtonSize, string> = {
  sm: 'feu-btn--sm',
  md: '',
  lg: 'feu-btn--lg',
};

/**
 * Factory: build a button DOM node from props. Pure DOM — no framework required.
 */
export function createButton(props: ButtonProps = {}): HTMLButtonElement {
  const {
    label = '',
    variant = 'primary',
    size = 'md',
    disabled = false,
    type = 'button',
    onClick,
    children,
    className,
  } = props;

  const btn = document.createElement('button');
  btn.type = type;
  btn.classList.add('feu-btn', VARIANT_CLASS[variant]);
  if (SIZE_CLASS[size]) btn.classList.add(SIZE_CLASS[size]);
  if (className) btn.classList.add(...className.split(' ').filter(Boolean));
  if (disabled) btn.disabled = true;

  if (children !== undefined) {
    appendChildren(btn, children);
  } else {
    btn.textContent = label;
  }

  if (onClick) btn.addEventListener('click', onClick);
  return btn;
}

function appendChildren(parent: HTMLElement, children: Node | Node[] | string): void {
  if (typeof children === 'string') {
    parent.textContent = children;
    return;
  }
  const arr = Array.isArray(children) ? children : [children];
  for (const c of arr) parent.appendChild(c);
}
