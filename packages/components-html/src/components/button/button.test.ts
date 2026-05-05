import { describe, it, expect, vi } from 'vitest';
import { createButton } from './button';

describe('createButton', () => {
  it('renders with label', () => {
    const btn = createButton({ label: 'Click me' });
    expect(btn.tagName).toBe('BUTTON');
    expect(btn.textContent).toBe('Click me');
    expect(btn.classList.contains('feu-btn')).toBe(true);
    expect(btn.classList.contains('feu-btn--primary')).toBe(true);
  });

  it('applies variant and size', () => {
    const btn = createButton({ label: 'x', variant: 'ghost', size: 'lg' });
    expect(btn.classList.contains('feu-btn--ghost')).toBe(true);
    expect(btn.classList.contains('feu-btn--lg')).toBe(true);
  });

  it('respects disabled', () => {
    const btn = createButton({ label: 'x', disabled: true });
    expect(btn.disabled).toBe(true);
  });

  it('fires onClick', () => {
    const onClick = vi.fn();
    const btn = createButton({ label: 'x', onClick });
    btn.click();
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
