export type TimerInputCallback = (value: number) => void;

export function createTimerInput(target: HTMLElement, callback: TimerInputCallback) {
  const field = document.createElement('div');
  field.classList.add('flex', 'items-center', 'gap-2');
  target.appendChild(field);

  const label = document.createElement('label');
  label.textContent = 'Timer (minutes)';
  label.classList.add('text-slate-800');
  label.htmlFor = 'timer-input';
  field.appendChild(label);

  const input = document.createElement('input');
  input.type = 'number';
  input.value = '45';
  input.min = '1';
  input.max = '3600';
  input.id = 'timer-input';
  input.classList.add('w-fit', 'text-slate-800', 'focus:text-black', 'border', 'border-slate-300', 'rounded-md', 'p-1', );
  field.appendChild(input);

  const button = document.createElement('button');
  button.textContent = 'Start';
  button.classList.add('p-2', 'text-sm', 'bg-slate-800', 'text-white', 'rounded-md');
  button.addEventListener('click', () => {
    callback(parseInt(input.value, 10));
  });
  field.appendChild(button);

}