import { ding } from "../helpers/ding";
import { TimerCountdown } from "./timer-countdown.model";
import { createTimerInput, TimerInputCallback, TimerInputControls } from "./timer-input";

export function createTimer(target?: HTMLElement | null) {
  if (!target) {
    target = document.createElement('div');
    document.body.appendChild(target);
  }
  const container = document.createElement('div');
  container.classList.add('my-12', 'flex', 'flex-col', 'justify-center', 'items-center', 'gap-4');
  target.appendChild(container);

  //need countdown before creating the coordinator
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


  let controls: TimerInputControls = {};

  const coordinator: TimerInputCallback = (action, value) => {
    switch (action) {
      case 'start':
        controls.startBtn?.setAttribute('disabled', 'true');
        controls.stopBtn?.removeAttribute('disabled');
        countdown.start((value ?? 0) * 60 * 1000); //convert minutes to milliseconds
        break;
      case 'stop':
        controls.startBtn?.removeAttribute('disabled');
        controls.stopBtn?.setAttribute('disabled', 'true');
        countdown.stop();
        break;
    }
  }
  controls = createTimerInput(container, (...args) => coordinator(...args));

  countdown.render(container);
}

