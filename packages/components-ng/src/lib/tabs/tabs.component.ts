import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

export interface TabItem {
  id: string;
  label: string;
}

@Component({
  selector: 'feu-tabs',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="feu-tabs">
      <div class="feu-tabs__list" role="tablist">
        @for (item of items; track item.id) {
          <button
            type="button"
            class="feu-tabs__tab"
            role="tab"
            [id]="'feu-tab-' + item.id"
            [attr.aria-controls]="'feu-panel-' + item.id"
            [attr.aria-selected]="item.id === activeId"
            [tabindex]="item.id === activeId ? 0 : -1"
            (click)="select(item.id)"
          >{{ item.label }}</button>
        }
      </div>
      <ng-content></ng-content>
    </div>
  `,
  styleUrls: ['./tabs.component.scss'],
})
export class TabsComponent {
  @Input() items: TabItem[] = [];
  @Input() activeId = '';
  @Output() activeIdChange = new EventEmitter<string>();

  select(id: string): void {
    this.activeId = id;
    this.activeIdChange.emit(id);
  }
}

@Component({
  selector: 'feu-tab-panel',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      class="feu-tabs__panel"
      role="tabpanel"
      [id]="'feu-panel-' + tabId"
      [attr.aria-labelledby]="'feu-tab-' + tabId"
      [hidden]="tabId !== activeId"
    >
      <ng-content></ng-content>
    </div>
  `,
  styleUrls: ['./tabs.component.scss'],
})
export class TabPanelComponent {
  @Input() tabId = '';
  @Input() activeId = '';
}
