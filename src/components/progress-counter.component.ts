import { parsers } from "../helpers";

export class ProgressCounter extends HTMLElement {
  private shadow: ShadowRoot;
  private ready: boolean = false;

  //#region >>> attributes and properties <<<

  get percent() {
    return parsers.toFloat(this.getAttribute('percent')) ?? 0;
  }
  set percent(value: number) {
    this.setAttribute('percent', value.toString());
    // this.update();
  }

  get text() {
    return this.getAttribute('text') ?? `${this.percent < 0 ? 0 : this.percent.toFixed(2)}%`;
  }
  set text(value: string) {
    this.setAttribute('text', value);
    // this.update();
  }

  get size() {
    return parsers.toInt(this.getAttribute('size')) ?? 200;
  }
  set size(value: number) {
    this.setAttribute('size', value.toString());
    // this.render();
  }

  get thickness() {
    return parsers.toInt(this.getAttribute('thickness')) ?? 20;
  }
  set thickness(value: number) {
    this.setAttribute('thickness', value.toString());
    // this.render();
  }
  
  get bgColor() {
    return this.getAttribute('bg-color') ?? '#cfdbe7';
  }
  set bgColor(value: string) {
    this.setAttribute('bg-color', value);
    // this.render();
  }
  get timerColor() {
    return this.getAttribute('timer-color') ?? 'teal';
  }
  set timerColor(value: string) {
    this.setAttribute('timer-color', value);
    // this.render();
  }
  get textColor() {
    return this.getAttribute('text-color') ?? 'black';
  }
  set textColor(value: string) {
    this.setAttribute('text-color', value);
    // this.render();
  }

  //#endregion

  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'open' });
    this.ready = true;
  }

  connectedCallback() {
    this.ready = true;
    this.render();
  }

  disconnectedCallback() {
    this.ready = false;
    //remove existing elements
    while (this.shadow.firstChild) {
      this.shadow.removeChild(this.shadow.firstChild);
    }    
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {    
    if (this.ready && oldValue !== newValue) {
      if ([ 'percent', 'text' ].includes(name)) {
        this.update();
      }
      else {
        this.render();
      }
    } 
  }


  render() {
    if (this.ready) {
      //remove existing elements
      while (this.shadow.firstChild) {
        this.shadow.removeChild(this.shadow.firstChild);
      }

      //create new elements
      const clone = ProgressCounter.getTemplate(
        this.size, this.thickness, 
        this.bgColor, this.timerColor, 
        this.textColor).content.cloneNode(true);
      this.shadow.appendChild(clone);
      this.update()
    }
  }

  update() {
    if (this.ready) {
      this.updateArcs(this.percent);
      const output = this.shadow.querySelector('.output');
      if (output) {
        output.textContent = this.text;
      }
    }
  }

  private updateArcs(percent: number) {
    const first = this.shadow.querySelector('.arc-fill-1');
    const second = this.shadow.querySelector('.arc-fill-2');
    const third = this.shadow.querySelector('.arc-fill-3');
    const fourth = this.shadow.querySelector('.arc-fill-4');

    if (first && second && third && fourth) {
      [first, second, third, fourth].forEach((arc, index) => {
        const rotation = parsers.toInt(arc.getAttribute('data-rotation')) ?? 0;
        const remaining = (percent < index * .25)
                            ? 0 //none of this arc is filled 
                            : (percent >= (index + 1) * .25)
                              ? 1 //all of this arc is filled
                              : (percent - (index * .25)) / .25;  
        arc.setAttribute('style', `transform: rotate(${rotation}deg) skew(${90 - (remaining * 90)}deg)`);        
      });
    }
  }

  static get observedAttributes() {
    return ['percent', 'text', 'size', 'thickness', 'bg-color', 'timer-color', 'text-color'];
  }

  private static getTemplate(size?: number | null, thickness?: number | null, bgColor: string = '#cfdbe7', timerColor: string = 'black', textColor: string = 'black') {
    const template = document.createElement('template');
    template.innerHTML = `
      <style>
        .wrapper {
          --size: ${size ?? 200}px;
          --thickness: ${thickness ?? 20}px;
          --output-color: ${textColor};
          --bg-color: ${bgColor};
          --arc-fill-color: ${timerColor};
          position: relative;
          z-index: 0;
        }
        .circle {
          position: relative;
          overflow: hidden;
          background-color: ${bgColor};
          box-shadow: inset 0 2px 4px 0 rgb(0 0 0 / 0.05);
          border-radius: 100%;
          width: var(--size);
          height: var(--size);
        }
        .arc-fill {
          position: absolute;
          top: 50%; left: 50%;
          transform-origin: 0 0;
          background-color: var(--arc-fill-color);
          width: 100vw;
          height: 100vw;    
        }
        
        .inner {
          position: absolute;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          background-color: white;
          border-radius: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          width: calc(var(--size) - var(--thickness));
          height: calc(var(--size) - var(--thickness));
          box-shadow: inset rgba(34, 36, 38, 0.15) 0px 0px 3px 2px; 
        }
        .output {
          font-size: 2rem;
          color: var(--output-color);
        }
      </style>
      <div class="wrapper" aria-live="polite">
        <div class="circle">
          <div class="arc-fill arc-fill-1" data-rotation="270"></div>
          <div class="arc-fill arc-fill-2" data-rotation="0"></div>
          <div class="arc-fill arc-fill-3" data-rotation="90"></div>
          <div class="arc-fill arc-fill-4" data-rotation="180"></div>
        </div>
        
        <div class="inner">
          <span class="output">75%</span>
        </div>
      </div>
    `;

    return template;
  }

  static register() {
    customElements.define('hallpass-progress-counter', ProgressCounter);
  }

}
