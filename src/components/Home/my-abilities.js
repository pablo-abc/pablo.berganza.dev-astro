const abilities = [
  ['https://cdn.svgporn.com/logos/javascript.svg', 'JavaScript'],
  ['https://cdn.svgporn.com/logos/typescript-icon.svg', 'TypeScript'],
  ['https://cdn.svgporn.com/logos/lit-icon.svg', 'Lit'],
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
    ${abilities
      .map(
        (ability, i) =>
          /* HTML */ `<img
            class="${i === 0 ? 'visible' : ''}"
            src="${ability[0]}"
            aria-hidden="true"
            alt=""
          />`,
      )
      .join('')}
  </div>
`;

export class MyAbilities extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' }).appendChild(
      template.content.cloneNode(true),
    );
    this.lang = 'en';
    this.interval = undefined;
  }

  static get observedAttributes() {
    return ['lang'];
  }

  get container() {
    return this.shadowRoot.querySelector('div');
  }

  get images() {
    return Array.from(this.shadowRoot.querySelectorAll('img'));
  }

  get visibleImage() {
    return this.shadowRoot.querySelector('img.visible');
  }

  updateImg() {
    const { images, visibleImage } = this;
    const visibleIndex = images.indexOf(visibleImage);
    const nextIndex = (visibleIndex + 1) % images.length;
    visibleImage.classList.remove('visible');
    images[nextIndex].classList.add('visible');
  }

  connectedCallback() {
    const label =
      this.lang === 'en'
        ? `I have experience with: ${abString}`
        : `Tengo experiencia con: ${abString}`;
    this.container.setAttribute('aria-label', label);
    this.interval = setInterval(() => this.updateImg(), 2000);
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
    }
  }
}

customElements.define('my-abilities', MyAbilities);
