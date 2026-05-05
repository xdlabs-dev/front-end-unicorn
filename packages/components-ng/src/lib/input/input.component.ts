import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

let uid = 0;

@Component({
  selector: 'feu-input',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="feu-input-wrapper">
      @if (label) {
        <label class="feu-input-label" [attr.for]="id">{{ label }}</label>
      }
      <input
        class="feu-input"
        [id]="id"
        [type]="type"
        [name]="name"
        [placeholder]="placeholder"
        [disabled]="disabled"
        [attr.aria-invalid]="invalid ? 'true' : null"
        [value]="value"
        (input)="onInput($event)"
        (change)="changed.emit($event)"
      />
    </div>
  `,
  styleUrls: ['./input.component.scss'],
})
export class InputComponent {
  @Input() label?: string;
  @Input() value = '';
  @Input() placeholder?: string;
  @Input() type: 'text' | 'email' | 'password' | 'number' | 'search' = 'text';
  @Input() name?: string;
  @Input() id = `feu-input-${++uid}`;
  @Input() disabled = false;
  @Input() invalid = false;
  @Output() valueChange = new EventEmitter<string>();
  @Output() changed = new EventEmitter<Event>();

  onInput(event: Event): void {
    const next = (event.target as HTMLInputElement).value;
    this.value = next;
    this.valueChange.emit(next);
  }
}
