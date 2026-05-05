import './modal.scss';

export interface ModalProps {
  title?: string;
  body?: string | Node;
  open?: boolean;
  onClose?: () => void;
  className?: string;
}

export interface ModalHandle {
  /** Root backdrop element. */
  element: HTMLDivElement;
  open(): void;
  close(): void;
  setOpen(open: boolean): void;
}

export function createModal(props: ModalProps = {}): ModalHandle {
  const { title, body, open = false, onClose, className } = props;

  const backdrop = document.createElement('div');
  backdrop.className = 'feu-modal-backdrop';
  backdrop.setAttribute('role', 'presentation');
  backdrop.style.display = open ? 'flex' : 'none';
  if (className) backdrop.classList.add(...className.split(' ').filter(Boolean));

  const modal = document.createElement('div');
  modal.className = 'feu-modal';
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-modal', 'true');
  if (title) modal.setAttribute('aria-label', title);

  const header = document.createElement('header');
  header.className = 'feu-modal__header';
  const h = document.createElement('h3');
  h.className = 'feu-modal__title';
  h.textContent = title ?? '';
  const closeBtn = document.createElement('button');
  closeBtn.type = 'button';
  closeBtn.className = 'feu-modal__close';
  closeBtn.setAttribute('aria-label', 'Close');
  closeBtn.textContent = '×';
  header.appendChild(h);
  header.appendChild(closeBtn);

  const bodyEl = document.createElement('div');
  bodyEl.className = 'feu-modal__body';
  if (body !== undefined) {
    if (typeof body === 'string') bodyEl.textContent = body;
    else bodyEl.appendChild(body);
  }

  modal.appendChild(header);
  modal.appendChild(bodyEl);
  backdrop.appendChild(modal);

  const close = () => {
    backdrop.style.display = 'none';
    onClose?.();
  };

  closeBtn.addEventListener('click', close);
  backdrop.addEventListener('click', (e) => {
    if (e.target === backdrop) close();
  });

  return {
    element: backdrop,
    open: () => { backdrop.style.display = 'flex'; },
    close,
    setOpen: (v: boolean) => { backdrop.style.display = v ? 'flex' : 'none'; },
  };
}
