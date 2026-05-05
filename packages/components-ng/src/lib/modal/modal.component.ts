import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'feu-modal',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (open) {
      <div class="feu-modal-backdrop" role="presentation" (click)="onBackdropClick($event)">
        <div class="feu-modal" role="dialog" aria-modal="true" [attr.aria-label]="title">
          <header class="feu-modal__header">
            <h3 class="feu-modal__title">{{ title }}</h3>
            <button
              type="button"
              class="feu-modal__close"
              aria-label="Close"
              (click)="close()"
            >×</button>
          </header>
          <div class="feu-modal__body">
            <ng-content></ng-content>
          </div>
        </div>
      </div>
    }
  `,
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent {
  @Input() title = '';
  @Input() open = false;
  @Output() openChange = new EventEmitter<boolean>();
  @Output() closed = new EventEmitter<void>();

  close(): void {
    this.open = false;
    this.openChange.emit(false);
    this.closed.emit();
  }

  onBackdropClick(event: MouseEvent): void {
    if (event.target === event.currentTarget) this.close();
  }
}
