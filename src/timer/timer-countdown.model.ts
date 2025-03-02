export type TimerCountdownCallback = (remaining: number) => void;
export type TimerUnits = 'seconds' | 'minutes';

export class TimerCountdown {
  private container: HTMLElement | null = null;
  private progress: HTMLElement | null = null;
  private duration: number = 0;
  private readonly callback: TimerCountdownCallback | null = null;
  private intervalId: number | null = null;

  constructor(callback?: TimerCountdownCallback) {
    this.callback = callback ?? null;
  }

  start(duration: number) {

    if (this.intervalId !== null) {
      this.stop();
    }

    this.duration = duration;

    const startTime = Date.now();
    this.intervalId = window.setInterval(() => {
      const elapsed = Date.now() - startTime;
      const remaining = this.duration - elapsed;
      this.refresh(remaining);
      if (remaining <= 0) {
        this.stop();
        this.notifyCallback(0);
      } else {
        this.notifyCallback(remaining);
      }
    }, 1000);

    this.refresh();
  }

  stop() {
    if (this.intervalId === null) {
      return;
    }

    clearInterval(this.intervalId);
    this.intervalId = null;
  }

  render(target: HTMLElement) {
    if (this.container) {
      this.container.remove();
    }

    this.container = document.createElement('div');
    this.container.classList.add('invisible', 'flex', 'justify-center', 'items-center', 'gap-4');
    target.appendChild(this.container);

    this.progress = document.createElement('hallpass-progress-counter');
    this.container.appendChild(this.progress);
  }

  refresh(remaining?: number) {
    if (this.container?.classList.contains('invisible')) {
      this.container.classList.remove('invisible');
    }
    if (this.progress) {
      remaining ??= this.duration;
    
      const seconds = Math.max(0, Math.ceil(remaining / 1000));
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;

      const percentRemaining = minutes > 0
        ? minutes / 60
        : seconds / 60;

      this.progress.setAttribute('percent', percentRemaining.toString());
      this.progress.setAttribute('text', remaining > 0 
          ?  `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
          : `Done!`);
    }
  }

  notifyCallback(remaining: number) {
    if (typeof this.callback === 'function') {
      this.callback(remaining);
    }
  }
}