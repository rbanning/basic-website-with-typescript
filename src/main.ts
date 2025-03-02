import { ProgressCounter } from "./components/progress-counter.component";
import { createFooter } from "./footer";
import { createTimer } from "./timer/timer";

function main() {
  //register all web components
  ProgressCounter.register();

  createFooter();
  createTimer(document.getElementById('timer'));
}

main();