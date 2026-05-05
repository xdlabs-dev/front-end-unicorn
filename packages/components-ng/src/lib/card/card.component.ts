import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'feu-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="feu-card">
      @if (title) {
        <h3 class="feu-card__title">{{ title }}</h3>
      }
      <div class="feu-card__body">
        <ng-content></ng-content>
      </div>
      <div class="feu-card__footer">
        <ng-content select="[footer]"></ng-content>
      </div>
    </div>
  `,
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  @Input() title?: string;
}
