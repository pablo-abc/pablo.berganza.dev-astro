const e=[["https://cdn.svgporn.com/logos/javascript.svg","JavaScript"],["https://cdn.svgporn.com/logos/typescript-icon.svg","TypeScript"],["https://cdn.svgporn.com/logos/clojure.svg","Clojure"],["/assets/abilities/cljs-white.svg","ClojureScript"],["https://cdn.svgporn.com/logos/python.svg","Python"],["https://cdn.svgporn.com/logos/docker.svg","Docker"],["/assets/abilities/nestjs.svg","NestJS"],["/assets/abilities/react.svg","React"],["/assets/abilities/svelte.svg","Svelte"]],n=e.map(s=>s[1]).join(", "),o=document.createElement("template");o.innerHTML=`
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
`;class l extends HTMLElement{constructor(){super();this.attachShadow({mode:"open"}),this.lang="en",this.index=0,this.interval=void 0}static get observedAttributes(){return["lang","index"]}get container(){return this.shadowRoot.querySelector("div")}get image(){return this.shadowRoot.querySelector("img")}updateImg(){this.image.setAttribute("src",e[this.index][0])}connectedCallback(){const t=o.content.cloneNode(!0);this.shadowRoot.appendChild(t);const i=this.lang==="en"?`I have experience with: ${n}`:`Tengo experiencia con: ${n}`;this.container.setAttribute("aria-label",i),this.updateImg(),this.interval=setInterval(()=>{this.image.classList.remove("visible"),this.index===e.length-1?this.index=0:this.index+=1,setTimeout(()=>{this.updateImg(),this.image.classList.add("visible")},200)},2e3)}disconnectedCallback(){clearInterval(this.interval)}attributeChangedCallback(t,i,a){switch(t){case"lang":this.lang=a;break;case"index":this.index=Number(a);break}}}customElements.define("my-abilities",l);
