import { ding } from "../helpers/ding";
import { TimerCountdown } from "./timer-countdown.model";
import { createTimerInput } from "./timer-input";

export function createTimer(target?: HTMLElement | null) {
  if (!target) {
    target = document.createElement('div');
    document.body.appendChild(target);
  }
  const container = document.createElement('div');
  container.classList.add('my-12', 'flex', 'flex-col', 'justify-center', 'items-center', 'gap-4');
  target.appendChild(container);

  const countdown = new TimerCountdown((remaining) => {
    if (remaining <= 0) {
      //wait a tick for the progress counter to update
      setTimeout(() => {
        ding()
          .then(() => {
            alert('Time is up!');
          })
          .catch((error) => {
            console.error("ding() failed ... ", error);
            alert('Time is up!'); //show the alert even if the sound fails
          });
      }, 100);
    }
  });

  createTimerInput(container, (value) => { 
    countdown.start(value * 60 * 1000); //convert minutes to milliseconds
  });

  countdown.render(container);
}

