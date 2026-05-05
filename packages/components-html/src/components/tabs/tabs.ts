import './tabs.scss';

export interface TabItem {
  id: string;
  label: string;
  content: string | Node;
}

export interface TabsProps {
  items: TabItem[];
  activeId?: string;
  onChange?: (id: string) => void;
  className?: string;
}

export interface TabsHandle {
  element: HTMLDivElement;
  setActive(id: string): void;
}

export function createTabs(props: TabsProps): TabsHandle {
  const { items, activeId, onChange, className } = props;
  if (items.length === 0) throw new Error('createTabs: items must be non-empty');

  let current = activeId ?? items[0]!.id;

  const root = document.createElement('div');
  root.className = 'feu-tabs';
  if (className) root.classList.add(...className.split(' ').filter(Boolean));

  const list = document.createElement('div');
  list.className = 'feu-tabs__list';
  list.setAttribute('role', 'tablist');

  const panels: HTMLDivElement[] = [];
  const tabs: HTMLButtonElement[] = [];

  items.forEach((item) => {
    const tab = document.createElement('button');
    tab.type = 'button';
    tab.className = 'feu-tabs__tab';
    tab.setAttribute('role', 'tab');
    tab.id = `feu-tab-${item.id}`;
    tab.setAttribute('aria-controls', `feu-panel-${item.id}`);
    tab.textContent = item.label;
    tab.addEventListener('click', () => setActive(item.id));
    list.appendChild(tab);
    tabs.push(tab);

    const panel = document.createElement('div');
    panel.className = 'feu-tabs__panel';
    panel.setAttribute('role', 'tabpanel');
    panel.id = `feu-panel-${item.id}`;
    panel.setAttribute('aria-labelledby', `feu-tab-${item.id}`);
    if (typeof item.content === 'string') panel.textContent = item.content;
    else panel.appendChild(item.content);
    panels.push(panel);
  });

  root.appendChild(list);
  panels.forEach((p) => root.appendChild(p));

  function setActive(id: string): void {
    current = id;
    items.forEach((item, i) => {
      const selected = item.id === id;
      tabs[i]!.setAttribute('aria-selected', String(selected));
      tabs[i]!.tabIndex = selected ? 0 : -1;
      panels[i]!.hidden = !selected;
    });
    onChange?.(id);
  }

  setActive(current);

  return { element: root, setActive };
}
