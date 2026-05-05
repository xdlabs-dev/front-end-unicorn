import './input.scss';

export interface InputProps {
  label?: string;
  value?: string;
  placeholder?: string;
  type?: 'text' | 'email' | 'password' | 'number' | 'search';
  name?: string;
  id?: string;
  disabled?: boolean;
  invalid?: boolean;
  onInput?: (event: Event) => void;
  onChange?: (event: Event) => void;
  className?: string;
}

let uid = 0;
const nextId = () => `feu-input-${++uid}`;

export function createInput(props: InputProps = {}): HTMLDivElement {
  const {
    label,
    value = '',
    placeholder,
    type = 'text',
    name,
    id = nextId(),
    disabled = false,
    invalid = false,
    onInput,
    onChange,
    className,
  } = props;

  const wrapper = document.createElement('div');
  wrapper.className = 'feu-input-wrapper';
  if (className) wrapper.classList.add(...className.split(' ').filter(Boolean));

  if (label) {
    const lab = document.createElement('label');
    lab.className = 'feu-input-label';
    lab.htmlFor = id;
    lab.textContent = label;
    wrapper.appendChild(lab);
  }

  const input = document.createElement('input');
  input.className = 'feu-input';
  input.type = type;
  input.id = id;
  input.value = value;
  if (name) input.name = name;
  if (placeholder) input.placeholder = placeholder;
  if (disabled) input.disabled = true;
  if (invalid) input.setAttribute('aria-invalid', 'true');
  if (onInput) input.addEventListener('input', onInput);
  if (onChange) input.addEventListener('change', onChange);

  wrapper.appendChild(input);
  return wrapper;
}
