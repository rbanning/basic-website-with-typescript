export function ding(): Promise<void> {
  //inspiration: https://ourcodeworld.com/articles/read/1627/how-to-easily-generate-a-beep-notification-sound-with-javascript

  //todo: we can pass these in as arguments
  const duration = 200;
  const frequency = 440;
  const volume = 100;

  return new Promise((resolve, reject) => {
    try {
      const context = new AudioContext();
      const oscillator = context.createOscillator();
      const gain = context.createGain();
      oscillator.connect(context.destination);
  
      //set frequency
      oscillator.frequency.value = frequency;
  
      //set type
      oscillator.type = "sine";
      gain.connect(context.destination);
  
      //set volume
      gain.gain.value = volume * 0.01;
  
      //start oscillator
      oscillator.start(context.currentTime);
      oscillator.stop(context.currentTime + duration * 0.001);
      
      oscillator.onended = () => {
        resolve();
      };
        
    } catch (error) {
      reject(error);
    }
  });
}
