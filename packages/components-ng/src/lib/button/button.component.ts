import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'feu-button',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button
      [type]="type"
      [disabled]="disabled"
      class="feu-btn"
      [class.feu-btn--primary]="variant === 'primary'"
      [class.feu-btn--secondary]="variant === 'secondary'"
      [class.feu-btn--ghost]="variant === 'ghost'"
      [class.feu-btn--sm]="size === 'sm'"
      [class.feu-btn--lg]="size === 'lg'"
      (click)="clicked.emit($event)"
    >
      <ng-content>{{ label }}</ng-content>
    </button>
  `,
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input() label = '';
  @Input() variant: ButtonVariant = 'primary';
  @Input() size: ButtonSize = 'md';
  @Input() disabled = false;
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Output() clicked = new EventEmitter<MouseEvent>();
}
