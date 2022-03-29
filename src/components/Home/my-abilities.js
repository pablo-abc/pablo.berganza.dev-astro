const abilities = [
  ['https://cdn.svgporn.com/logos/javascript.svg', 'JavaScript'],
  ['https://cdn.svgporn.com/logos/typescript-icon.svg', 'TypeScript'],
  ['https://cdn.svgporn.com/logos/clojure.svg', 'Clojure'],
  ['/assets/abilities/cljs-white.svg', 'ClojureScript'],
  ['https://cdn.svgporn.com/logos/python.svg', 'Python'],
  ['https://cdn.svgporn.com/logos/docker.svg', 'Docker'],
  ['/assets/abilities/nestjs.svg', 'NestJS'],
  ['/assets/abilities/react.svg', 'React'],
  ['/assets/abilities/svelte.svg', 'Svelte'],
];

const abString = abilities.map((ab) => ab[1]).join(', ');

const template = document.createElement('template');

template.innerHTML = /* HTML */ `
  <style>
    div {
      position: relative;
      width: 100%;
      height: 100%;
    }
    img {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
      transition: opacity 0.2s;
    }
    .visible {
      opacity: 1;
    }
  </style>
  <div>
    <img class="visible" aria-hidden="true" alt="" />
  </div>
`;

export class MyAbilities extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.lang = 'en';
    this.index = 0;
    this.interval = undefined;
  }

  static get observedAttributes() {
    return ['lang', 'index'];
  }

  get container() {
    return this.shadowRoot.querySelector('div');
  }

  get image() {
    return this.shadowRoot.querySelector('img');
  }

  updateImg() {
    this.image.setAttribute('src', abilities[this.index][0]);
  }

  connectedCallback() {
    const content = template.content.cloneNode(true);
    this.shadowRoot.appendChild(content);
    const label =
      this.lang === 'en'
        ? `I have experience with: ${abString}`
        : `Tengo experiencia con: ${abString}`;
    this.container.setAttribute('aria-label', label);
    this.updateImg();
    this.interval = setInterval(() => {
      this.image.classList.remove('visible');
      if (this.index === abilities.length - 1) this.index = 0;
      else this.index += 1;
      setTimeout(() => {
        this.updateImg();
        this.image.classList.add('visible');
      }, 200);
    }, 2000);
  }

  disconnectedCallback() {
    clearInterval(this.interval);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) return;
    switch (name) {
      case 'lang':
        this.lang = newValue;
        break;
      case 'index':
        this.index = Number(newValue);
        break;
    }
  }
}

customElements.define('my-abilities', MyAbilities);
