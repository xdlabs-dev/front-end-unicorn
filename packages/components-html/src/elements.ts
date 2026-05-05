/**
 * Custom Element wrappers around the factory functions, for declarative use
 * in Astro templates and other static-HTML contexts. Importing this module
 * registers <feu-button> and <feu-input> on the global custom-element registry.
 */

import { createButton, type ButtonVariant, type ButtonSize } from './components/button/button';
import { createInput } from './components/input/input';

class FeuButtonElement extends HTMLElement {
  static get observedAttributes(): string[] {
    return ['label', 'variant', 'size', 'disabled', 'type'];
  }

  connectedCallback(): void {
    this.render();
  }

  attributeChangedCallback(): void {
    if (this.isConnected) this.render();
  }

  private render(): void {
    this.replaceChildren(
      createButton({
        label: this.getAttribute('label') ?? this.textContent?.trim() ?? '',
        variant: (this.getAttribute('variant') as ButtonVariant | null) ?? 'primary',
        size: (this.getAttribute('size') as ButtonSize | null) ?? 'md',
        disabled: this.hasAttribute('disabled'),
        type: (this.getAttribute('type') as 'button' | 'submit' | 'reset' | null) ?? 'button',
      }),
    );
  }
}

class FeuInputElement extends HTMLElement {
  static get observedAttributes(): string[] {
    return ['label', 'value', 'placeholder', 'type', 'name', 'disabled', 'invalid'];
  }

  connectedCallback(): void {
    this.render();
  }

  attributeChangedCallback(): void {
    if (this.isConnected) this.render();
  }

  private render(): void {
    this.replaceChildren(
      createInput({
        label: this.getAttribute('label') ?? undefined,
        value: this.getAttribute('value') ?? '',
        placeholder: this.getAttribute('placeholder') ?? undefined,
        type: (this.getAttribute('type') as 'text' | 'email' | 'password' | 'number' | 'search' | null) ?? 'text',
        name: this.getAttribute('name') ?? undefined,
        disabled: this.hasAttribute('disabled'),
        invalid: this.hasAttribute('invalid'),
      }),
    );
  }
}

if (typeof customElements !== 'undefined') {
  if (!customElements.get('feu-button')) customElements.define('feu-button', FeuButtonElement);
  if (!customElements.get('feu-input')) customElements.define('feu-input', FeuInputElement);
}

export { FeuButtonElement, FeuInputElement };
