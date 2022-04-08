var ee=(t,e,o)=>{if(!e.has(t))throw TypeError("Cannot "+o)},kt=(t,e,o)=>(ee(t,e,"read from private field"),o?o.call(t):e.get(t)),pt=(t,e,o)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,o)},Ct=(t,e,o,i)=>(ee(t,e,"write to private field"),i?i.call(t,o):e.set(t,o),o),Ot=(t,e,o)=>(ee(t,e,"access private method"),o),Z,at,ae,Ht,le,Nt,de,Ut,he,ce;const He=document.createElement("template");He.innerHTML=`
  <style>
    ::slotted(button) {
      background: var(--walisto-button-bg);
      border: none;
      border-radius: 10px;
      padding: 0.6rem 0.5rem 0.4rem 0.7rem;
      color: var(--walisto-button-font-color);
      cursor: pointer;
      transition: background 0.1s, transform 0.1s;
    }

    ::slotted(button:focus-visible) {
      outline: var(--walisto-outline-fv);
      outline-offset: 2px;
    }

    ::slotted(button:hover) {
      background: var(--walisto-button-bg-hover);
    }

    ::slotted(button:active) {
      background: var(--walisto-button-bg-active);
      transform: scale(0.95);
    }
  </style>
  <slot></slot>
`;class oo extends HTMLElement{connectedCallback(){var e;this.attachShadow({mode:"open"});const o=document.importNode(He.content,!0);(e=this.shadowRoot)==null||e.appendChild(o)}}customElements.define("walisto-button",oo);const xt=new WeakMap,io={[String.toString()]:String,[Boolean.toString()]:t=>t===""||!!t&&t!=="false",[Number.toString()]:Number};function ro(t){return t.converter?t.converter:t.type?io[t.type.toString()]:String}function so(t,e){return t!==e}function T(t={}){return function(e,o,i){var r;xt.has(e)||xt.set(e,new Set);const l={name:t.name||o.toLowerCase(),property:o,converter:ro(t),hasChanged:t.hasChanged||so,descriptor:i};(r=xt.get(e))==null||r.add(l)}}function q(t){return function(e,o){Object.defineProperty(e,o,{configurable:!0,get(){return this.shadowRoot?this.shadowRoot.querySelector(t):this.querySelector(t)}})}}function no(t){const e=t.properties;if(!e)return;const o=Object.keys(e);for(const i of o)T(e[i])(t.prototype,i)}function ao(t){return t.charAt(0).toUpperCase()+t.slice(1)}function mt(t){return function(e){let o=e.observedAttributes||[];no(e);const i=Array.from(xt.get(e.prototype)||[]),r=e.prototype.attributeChangedCallback;e.prototype.attributeChangedCallback=function(h,p,n){const d=i.find(v=>v.name===h);d&&d.hasChanged(p,n)&&(this[d.property]=d.converter(n)),r?.call(this,h,p,n)},Object.defineProperty(e,"observedAttributes",{configurable:!0,get(){return i.map(h=>h.name).concat(o)},set(h){o=h}});class l extends e{constructor(...p){super(...p);for(const n of i){const d=n.property,v=n.descriptor;if(v&&!v.set)continue;let s;Object.defineProperty(this,d,{configurable:!0,set(a){var f,c;if(!n.hasChanged(s,a))return;const m=ao(d),A=s;s=this[`before${m}Change`]?this[`before${m}Change`](A,a):a,(f=v?.set)==null||f.call(v,a),(c=this[`after${m}Change`])==null||c.call(this,A,a)},get(){return v?.get?v.get():s}})}}}return customElements.get(t)||customElements.define(t,l),l}}var lo=Object.defineProperty,ho=Object.getOwnPropertyDescriptor,Ne=(t,e,o,i)=>{for(var r=i>1?void 0:i?ho(e,o):e,l=t.length-1,h;l>=0;l--)(h=t[l])&&(r=(i?h(e,o,r):h(r))||r);return i&&r&&lo(e,o,r),r};const Ue=document.createElement("template");Ue.innerHTML=`
  <style>
    :host {
      --walisto-font-family: monospace;
      --walisto-width: 40rem;
      --walisto-item-gap: 0.5rem;
      font-family: var(--walisto-font-family);
      display: block;
    }

    .container walisto-item:not(:first-child) {
      margin-top: var(--walisto-item-gap);
    }

    .container {
      margin: 0;
      max-width: var(--walisto-width);
    }
  </style>
  <dl class="container" data-target="walisto-container.dl">
    <slot></slot>
  </dl>
`;let Kt=class extends HTMLElement{get template(){return this.dl.querySelector("slot").assignedElements().find(e=>e instanceof HTMLTemplateElement)}connectedCallback(){var t;this.attachShadow({mode:"open"});const e=document.importNode(Ue.content,!0);(t=this.shadowRoot)==null||t.appendChild(e);const o=document.importNode(this.template.content,!0);this.dl.appendChild(o)}};Ne([q("dl")],Kt.prototype,"dl",2);Kt=Ne([mt("walisto-container")],Kt);var co=Object.defineProperty,uo=Object.getOwnPropertyDescriptor,bt=(t,e,o,i)=>{for(var r=i>1?void 0:i?uo(e,o):e,l=t.length-1,h;l>=0;l--)(h=t[l])&&(r=(i?h(e,o,r):h(r))||r);return i&&r&&co(e,o,r),r};const Re=document.createElement("template");Re.innerHTML=`
  <style>
    .success {
      --walisto-button-font-color: #6d3;
    }

    #copy-button svg {
      height: 1.3rem;
    }
  </style>
  <walisto-button>
    <button type="button" id="copy-button" part="button"></button>
  </walisto-button>
`;let tt=(ae=class extends HTMLElement{constructor(){super(),pt(this,Z,void 0),pt(this,at,void 0),this.label="",this.address="",Ct(this,Z,!1),Ct(this,at,()=>{!this.address||(navigator.clipboard.writeText(this.address),Ct(this,Z,!0),this.walistoButton.classList.add("success"),this.update(),setTimeout(()=>{this.walistoButton.classList.remove("success"),Ct(this,Z,!1),this.update()},500))}),this.attachShadow({mode:"open"})}_renderContent(){return kt(this,Z)?`
        <svg
          aria-hidden="true"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
          ></path>
        </svg>
      `:`
      <svg
        aria-hidden="true"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
        ></path>
      </svg>
    `}update(){const t=this.label||"Copy to clipboard";this.button.setAttribute("aria-label",t),this.button.setAttribute("title",t),this.button.innerHTML=this._renderContent()}connectedCallback(){var t;const e=document.importNode(Re.content,!0);(t=this.shadowRoot)==null||t.appendChild(e),this.update(),this.button.addEventListener("click",kt(this,at))}disconnectedCallback(){this.button.removeEventListener("click",kt(this,at))}},Z=new WeakMap,at=new WeakMap,ae);bt([q("walisto-button")],tt.prototype,"walistoButton",2);bt([q("button")],tt.prototype,"button",2);bt([T()],tt.prototype,"label",2);bt([T()],tt.prototype,"address",2);tt=bt([mt("walisto-copy-button")],tt);var oe=window.ShadowRoot&&(window.ShadyCSS===void 0||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,ie=Symbol(),ue=new Map,Be=class{constructor(t,e){if(this._$cssResult$=!0,e!==ie)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t}get styleSheet(){let t=ue.get(this.cssText);return oe&&t===void 0&&(ue.set(this.cssText,t=new CSSStyleSheet),t.replaceSync(this.cssText)),t}toString(){return this.cssText}},De=t=>new Be(typeof t=="string"?t:t+"",ie),yt=(t,...e)=>{const o=t.length===1?t[0]:e.reduce((i,r,l)=>i+(h=>{if(h._$cssResult$===!0)return h.cssText;if(typeof h=="number")return h;throw Error("Value passed to 'css' function must be a 'css' function result: "+h+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(r)+t[l+1],t[0]);return new Be(o,ie)},po=(t,e)=>{oe?t.adoptedStyleSheets=e.map(o=>o instanceof CSSStyleSheet?o:o.styleSheet):e.forEach(o=>{const i=document.createElement("style"),r=window.litNonce;r!==void 0&&i.setAttribute("nonce",r),i.textContent=o.cssText,t.appendChild(i)})},pe=oe?t=>t:t=>t instanceof CSSStyleSheet?(e=>{let o="";for(const i of e.cssRules)o+=i.cssText;return De(o)})(t):t,Rt,ve=window.trustedTypes,vo=ve?ve.emptyScript:"",fe=window.reactiveElementPolyfillSupport,Wt={toAttribute(t,e){switch(e){case Boolean:t=t?vo:null;break;case Object:case Array:t=t==null?t:JSON.stringify(t)}return t},fromAttribute(t,e){let o=t;switch(e){case Boolean:o=t!==null;break;case Number:o=t===null?null:Number(t);break;case Object:case Array:try{o=JSON.parse(t)}catch{o=null}}return o}},Ie=(t,e)=>e!==t&&(e==e||t==t),Bt={attribute:!0,type:String,converter:Wt,reflect:!1,hasChanged:Ie},Y=class extends HTMLElement{constructor(){super(),this._$Et=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Ei=null,this.o()}static addInitializer(t){var e;(e=this.l)!==null&&e!==void 0||(this.l=[]),this.l.push(t)}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach((e,o)=>{const i=this._$Eh(o,e);i!==void 0&&(this._$Eu.set(i,o),t.push(i))}),t}static createProperty(t,e=Bt){if(e.state&&(e.attribute=!1),this.finalize(),this.elementProperties.set(t,e),!e.noAccessor&&!this.prototype.hasOwnProperty(t)){const o=typeof t=="symbol"?Symbol():"__"+t,i=this.getPropertyDescriptor(t,o,e);i!==void 0&&Object.defineProperty(this.prototype,t,i)}}static getPropertyDescriptor(t,e,o){return{get(){return this[e]},set(i){const r=this[t];this[e]=i,this.requestUpdate(t,r,o)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||Bt}static finalize(){if(this.hasOwnProperty("finalized"))return!1;this.finalized=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),this.elementProperties=new Map(t.elementProperties),this._$Eu=new Map,this.hasOwnProperty("properties")){const e=this.properties,o=[...Object.getOwnPropertyNames(e),...Object.getOwnPropertySymbols(e)];for(const i of o)this.createProperty(i,e[i])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const o=new Set(t.flat(1/0).reverse());for(const i of o)e.unshift(pe(i))}else t!==void 0&&e.push(pe(t));return e}static _$Eh(t,e){const o=e.attribute;return o===!1?void 0:typeof o=="string"?o:typeof t=="string"?t.toLowerCase():void 0}o(){var t;this._$Ep=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$Em(),this.requestUpdate(),(t=this.constructor.l)===null||t===void 0||t.forEach(e=>e(this))}addController(t){var e,o;((e=this._$Eg)!==null&&e!==void 0?e:this._$Eg=[]).push(t),this.renderRoot!==void 0&&this.isConnected&&((o=t.hostConnected)===null||o===void 0||o.call(t))}removeController(t){var e;(e=this._$Eg)===null||e===void 0||e.splice(this._$Eg.indexOf(t)>>>0,1)}_$Em(){this.constructor.elementProperties.forEach((t,e)=>{this.hasOwnProperty(e)&&(this._$Et.set(e,this[e]),delete this[e])})}createRenderRoot(){var t;const e=(t=this.shadowRoot)!==null&&t!==void 0?t:this.attachShadow(this.constructor.shadowRootOptions);return po(e,this.constructor.elementStyles),e}connectedCallback(){var t;this.renderRoot===void 0&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(t=this._$Eg)===null||t===void 0||t.forEach(e=>{var o;return(o=e.hostConnected)===null||o===void 0?void 0:o.call(e)})}enableUpdating(t){}disconnectedCallback(){var t;(t=this._$Eg)===null||t===void 0||t.forEach(e=>{var o;return(o=e.hostDisconnected)===null||o===void 0?void 0:o.call(e)})}attributeChangedCallback(t,e,o){this._$AK(t,o)}_$ES(t,e,o=Bt){var i,r;const l=this.constructor._$Eh(t,o);if(l!==void 0&&o.reflect===!0){const h=((r=(i=o.converter)===null||i===void 0?void 0:i.toAttribute)!==null&&r!==void 0?r:Wt.toAttribute)(e,o.type);this._$Ei=t,h==null?this.removeAttribute(l):this.setAttribute(l,h),this._$Ei=null}}_$AK(t,e){var o,i,r;const l=this.constructor,h=l._$Eu.get(t);if(h!==void 0&&this._$Ei!==h){const p=l.getPropertyOptions(h),n=p.converter,d=(r=(i=(o=n)===null||o===void 0?void 0:o.fromAttribute)!==null&&i!==void 0?i:typeof n=="function"?n:null)!==null&&r!==void 0?r:Wt.fromAttribute;this._$Ei=h,this[h]=d(e,p.type),this._$Ei=null}}requestUpdate(t,e,o){let i=!0;t!==void 0&&(((o=o||this.constructor.getPropertyOptions(t)).hasChanged||Ie)(this[t],e)?(this._$AL.has(t)||this._$AL.set(t,e),o.reflect===!0&&this._$Ei!==t&&(this._$E_===void 0&&(this._$E_=new Map),this._$E_.set(t,o))):i=!1),!this.isUpdatePending&&i&&(this._$Ep=this._$EC())}async _$EC(){this.isUpdatePending=!0;try{await this._$Ep}catch(e){Promise.reject(e)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Et&&(this._$Et.forEach((i,r)=>this[r]=i),this._$Et=void 0);let e=!1;const o=this._$AL;try{e=this.shouldUpdate(o),e?(this.willUpdate(o),(t=this._$Eg)===null||t===void 0||t.forEach(i=>{var r;return(r=i.hostUpdate)===null||r===void 0?void 0:r.call(i)}),this.update(o)):this._$EU()}catch(i){throw e=!1,this._$EU(),i}e&&this._$AE(o)}willUpdate(t){}_$AE(t){var e;(e=this._$Eg)===null||e===void 0||e.forEach(o=>{var i;return(i=o.hostUpdated)===null||i===void 0?void 0:i.call(o)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EU(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$Ep}shouldUpdate(t){return!0}update(t){this._$E_!==void 0&&(this._$E_.forEach((e,o)=>this._$ES(o,this[o],e)),this._$E_=void 0),this._$EU()}updated(t){}firstUpdated(t){}};Y.finalized=!0,Y.elementProperties=new Map,Y.elementStyles=[],Y.shadowRootOptions={mode:"open"},fe?.({ReactiveElement:Y}),((Rt=globalThis.reactiveElementVersions)!==null&&Rt!==void 0?Rt:globalThis.reactiveElementVersions=[]).push("1.2.3");var Dt,et=globalThis.trustedTypes,ge=et?et.createPolicy("lit-html",{createHTML:t=>t}):void 0,j=`lit$${(Math.random()+"").slice(9)}$`,je="?"+j,fo=`<${je}>`,ot=document,ft=(t="")=>ot.createComment(t),gt=t=>t===null||typeof t!="object"&&typeof t!="function",Fe=Array.isArray,go=t=>{var e;return Fe(t)||typeof((e=t)===null||e===void 0?void 0:e[Symbol.iterator])=="function"},lt=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,me=/-->/g,be=/>/g,W=/>|[ 	\n\r](?:([^\s"'>=/]+)([ 	\n\r]*=[ 	\n\r]*(?:[^ 	\n\r"'`<>=]|("|')|))|$)/g,ye=/'/g,we=/"/g,qe=/^(?:script|style|textarea|title)$/i,mo=t=>(e,...o)=>({_$litType$:t,strings:e,values:o}),Q=mo(1),B=Symbol.for("lit-noChange"),L=Symbol.for("lit-nothing"),_e=new WeakMap,bo=(t,e,o)=>{var i,r;const l=(i=o?.renderBefore)!==null&&i!==void 0?i:e;let h=l._$litPart$;if(h===void 0){const p=(r=o?.renderBefore)!==null&&r!==void 0?r:null;l._$litPart$=h=new Mt(e.insertBefore(ft(),p),p,void 0,o??{})}return h._$AI(t),h},X=ot.createTreeWalker(ot,129,null,!1),yo=(t,e)=>{const o=t.length-1,i=[];let r,l=e===2?"<svg>":"",h=lt;for(let n=0;n<o;n++){const d=t[n];let v,s,a=-1,f=0;for(;f<d.length&&(h.lastIndex=f,s=h.exec(d),s!==null);)f=h.lastIndex,h===lt?s[1]==="!--"?h=me:s[1]!==void 0?h=be:s[2]!==void 0?(qe.test(s[2])&&(r=RegExp("</"+s[2],"g")),h=W):s[3]!==void 0&&(h=W):h===W?s[0]===">"?(h=r??lt,a=-1):s[1]===void 0?a=-2:(a=h.lastIndex-s[2].length,v=s[1],h=s[3]===void 0?W:s[3]==='"'?we:ye):h===we||h===ye?h=W:h===me||h===be?h=lt:(h=W,r=void 0);const c=h===W&&t[n+1].startsWith("/>")?" ":"";l+=h===lt?d+fo:a>=0?(i.push(v),d.slice(0,a)+"$lit$"+d.slice(a)+j+c):d+j+(a===-2?(i.push(void 0),n):c)}const p=l+(t[o]||"<?>")+(e===2?"</svg>":"");if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return[ge!==void 0?ge.createHTML(p):p,i]},St=class{constructor({strings:t,_$litType$:e},o){let i;this.parts=[];let r=0,l=0;const h=t.length-1,p=this.parts,[n,d]=yo(t,e);if(this.el=St.createElement(n,o),X.currentNode=this.el.content,e===2){const v=this.el.content,s=v.firstChild;s.remove(),v.append(...s.childNodes)}for(;(i=X.nextNode())!==null&&p.length<h;){if(i.nodeType===1){if(i.hasAttributes()){const v=[];for(const s of i.getAttributeNames())if(s.endsWith("$lit$")||s.startsWith(j)){const a=d[l++];if(v.push(s),a!==void 0){const f=i.getAttribute(a.toLowerCase()+"$lit$").split(j),c=/([.?@])?(.*)/.exec(a);p.push({type:1,index:r,name:c[2],strings:f,ctor:c[1]==="."?_o:c[1]==="?"?Ao:c[1]==="@"?Co:Lt})}else p.push({type:6,index:r})}for(const s of v)i.removeAttribute(s)}if(qe.test(i.tagName)){const v=i.textContent.split(j),s=v.length-1;if(s>0){i.textContent=et?et.emptyScript:"";for(let a=0;a<s;a++)i.append(v[a],ft()),X.nextNode(),p.push({type:2,index:++r});i.append(v[s],ft())}}}else if(i.nodeType===8)if(i.data===je)p.push({type:2,index:r});else{let v=-1;for(;(v=i.data.indexOf(j,v+1))!==-1;)p.push({type:7,index:r}),v+=j.length-1}r++}}static createElement(t,e){const o=ot.createElement("template");return o.innerHTML=t,o}};function it(t,e,o=t,i){var r,l,h,p;if(e===B)return e;let n=i!==void 0?(r=o._$Cl)===null||r===void 0?void 0:r[i]:o._$Cu;const d=gt(e)?void 0:e._$litDirective$;return n?.constructor!==d&&((l=n?._$AO)===null||l===void 0||l.call(n,!1),d===void 0?n=void 0:(n=new d(t),n._$AT(t,o,i)),i!==void 0?((h=(p=o)._$Cl)!==null&&h!==void 0?h:p._$Cl=[])[i]=n:o._$Cu=n),n!==void 0&&(e=it(t,n._$AS(t,e.values),n,i)),e}var wo=class{constructor(t,e){this.v=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}p(t){var e;const{el:{content:o},parts:i}=this._$AD,r=((e=t?.creationScope)!==null&&e!==void 0?e:ot).importNode(o,!0);X.currentNode=r;let l=X.nextNode(),h=0,p=0,n=i[0];for(;n!==void 0;){if(h===n.index){let d;n.type===2?d=new Mt(l,l.nextSibling,this,t):n.type===1?d=new n.ctor(l,n.name,n.strings,this,t):n.type===6&&(d=new Eo(l,this,t)),this.v.push(d),n=i[++p]}h!==n?.index&&(l=X.nextNode(),h++)}return r}m(t){let e=0;for(const o of this.v)o!==void 0&&(o.strings!==void 0?(o._$AI(t,o,e),e+=o.strings.length-2):o._$AI(t[e])),e++}},Mt=class{constructor(t,e,o,i){var r;this.type=2,this._$AH=L,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=o,this.options=i,this._$Cg=(r=i?.isConnected)===null||r===void 0||r}get _$AU(){var t,e;return(e=(t=this._$AM)===null||t===void 0?void 0:t._$AU)!==null&&e!==void 0?e:this._$Cg}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return e!==void 0&&t.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=it(this,t,e),gt(t)?t===L||t==null||t===""?(this._$AH!==L&&this._$AR(),this._$AH=L):t!==this._$AH&&t!==B&&this.$(t):t._$litType$!==void 0?this.T(t):t.nodeType!==void 0?this.S(t):go(t)?this.A(t):this.$(t)}M(t,e=this._$AB){return this._$AA.parentNode.insertBefore(t,e)}S(t){this._$AH!==t&&(this._$AR(),this._$AH=this.M(t))}$(t){this._$AH!==L&&gt(this._$AH)?this._$AA.nextSibling.data=t:this.S(ot.createTextNode(t)),this._$AH=t}T(t){var e;const{values:o,_$litType$:i}=t,r=typeof i=="number"?this._$AC(t):(i.el===void 0&&(i.el=St.createElement(i.h,this.options)),i);if(((e=this._$AH)===null||e===void 0?void 0:e._$AD)===r)this._$AH.m(o);else{const l=new wo(r,this),h=l.p(this.options);l.m(o),this.S(h),this._$AH=l}}_$AC(t){let e=_e.get(t.strings);return e===void 0&&_e.set(t.strings,e=new St(t)),e}A(t){Fe(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let o,i=0;for(const r of t)i===e.length?e.push(o=new Mt(this.M(ft()),this.M(ft()),this,this.options)):o=e[i],o._$AI(r),i++;i<e.length&&(this._$AR(o&&o._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){var o;for((o=this._$AP)===null||o===void 0||o.call(this,!1,!0,e);t&&t!==this._$AB;){const i=t.nextSibling;t.remove(),t=i}}setConnected(t){var e;this._$AM===void 0&&(this._$Cg=t,(e=this._$AP)===null||e===void 0||e.call(this,t))}},Lt=class{constructor(t,e,o,i,r){this.type=1,this._$AH=L,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=r,o.length>2||o[0]!==""||o[1]!==""?(this._$AH=Array(o.length-1).fill(new String),this.strings=o):this._$AH=L}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,e=this,o,i){const r=this.strings;let l=!1;if(r===void 0)t=it(this,t,e,0),l=!gt(t)||t!==this._$AH&&t!==B,l&&(this._$AH=t);else{const h=t;let p,n;for(t=r[0],p=0;p<r.length-1;p++)n=it(this,h[o+p],e,p),n===B&&(n=this._$AH[p]),l||(l=!gt(n)||n!==this._$AH[p]),n===L?t=L:t!==L&&(t+=(n??"")+r[p+1]),this._$AH[p]=n}l&&!i&&this.k(t)}k(t){t===L?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},_o=class extends Lt{constructor(){super(...arguments),this.type=3}k(t){this.element[this.name]=t===L?void 0:t}},$o=et?et.emptyScript:"",Ao=class extends Lt{constructor(){super(...arguments),this.type=4}k(t){t&&t!==L?this.element.setAttribute(this.name,$o):this.element.removeAttribute(this.name)}},Co=class extends Lt{constructor(t,e,o,i,r){super(t,e,o,i,r),this.type=5}_$AI(t,e=this){var o;if((t=(o=it(this,t,e,0))!==null&&o!==void 0?o:L)===B)return;const i=this._$AH,r=t===L&&i!==L||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,l=t!==L&&(i===L||r);r&&this.element.removeEventListener(this.name,this,i),l&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e,o;typeof this._$AH=="function"?this._$AH.call((o=(e=this.options)===null||e===void 0?void 0:e.host)!==null&&o!==void 0?o:this.element,t):this._$AH.handleEvent(t)}},Eo=class{constructor(t,e,o){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=o}get _$AU(){return this._$AM._$AU}_$AI(t){it(this,t)}},$e=window.litHtmlPolyfillSupport;$e?.(St,Mt),((Dt=globalThis.litHtmlVersions)!==null&&Dt!==void 0?Dt:globalThis.litHtmlVersions=[]).push("2.1.3");var It,jt,F=class extends Y{constructor(){super(...arguments),this.renderOptions={host:this},this._$Dt=void 0}createRenderRoot(){var t,e;const o=super.createRenderRoot();return(t=(e=this.renderOptions).renderBefore)!==null&&t!==void 0||(e.renderBefore=o.firstChild),o}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Dt=bo(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),(t=this._$Dt)===null||t===void 0||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this._$Dt)===null||t===void 0||t.setConnected(!1)}render(){return B}};F.finalized=!0,F._$litElement$=!0,(It=globalThis.litElementHydrateSupport)===null||It===void 0||It.call(globalThis,{LitElement:F});var Ae=globalThis.litElementPolyfillSupport;Ae?.({LitElement:F});((jt=globalThis.litElementVersions)!==null&&jt!==void 0?jt:globalThis.litElementVersions=[]).push("3.1.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 *//**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var Tt=yt`
  :host {
    box-sizing: border-box;
  }

  :host *,
  :host *::before,
  :host *::after {
    box-sizing: inherit;
  }

  [hidden] {
    display: none !important;
  }
`,xo=yt`
  ${Tt}

  :host {
    display: inline-block;
  }

  .qr-code {
    position: relative;
  }

  canvas {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`,re={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},se=t=>(...e)=>({_$litDirective$:t,values:e}),ne=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,o){this._$Ct=t,this._$AM=e,this._$Ci=o}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var So=se(class extends ne{constructor(t){var e;if(super(t),t.type!==re.ATTRIBUTE||t.name!=="style"||((e=t.strings)===null||e===void 0?void 0:e.length)>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(t){return Object.keys(t).reduce((e,o)=>{const i=t[o];return i==null?e:e+`${o=o.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${i};`},"")}update(t,[e]){const{style:o}=t.element;if(this.ct===void 0){this.ct=new Set;for(const i in e)this.ct.add(i);return this.render(e)}this.ct.forEach(i=>{e[i]==null&&(this.ct.delete(i),i.includes("-")?o.removeProperty(i):o[i]="")});for(const i in e){const r=e[i];r!=null&&(this.ct.add(i),i.includes("-")?o.setProperty(i,r):o[i]=r)}return B}});/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var Ve=Object.defineProperty,Mo=Object.defineProperties,Lo=Object.getOwnPropertyDescriptor,To=Object.getOwnPropertyDescriptors,Ce=Object.getOwnPropertySymbols,Po=Object.prototype.hasOwnProperty,zo=Object.prototype.propertyIsEnumerable,Ee=(t,e,o)=>e in t?Ve(t,e,{enumerable:!0,configurable:!0,writable:!0,value:o}):t[e]=o,rt=(t,e)=>{for(var o in e||(e={}))Po.call(e,o)&&Ee(t,o,e[o]);if(Ce)for(var o of Ce(e))zo.call(e,o)&&Ee(t,o,e[o]);return t},Pt=(t,e)=>Mo(t,To(e)),C=(t,e,o,i)=>{for(var r=i>1?void 0:i?Lo(e,o):e,l=t.length-1,h;l>=0;l--)(h=t[l])&&(r=(i?h(e,o,r):h(r))||r);return i&&r&&Ve(e,o,r),r};function H(t,e){const o=rt({waitUntilFirstUpdate:!1},e);return(i,r)=>{const{update:l}=i;if(t in i){const h=t;i.update=function(p){if(p.has(h)){const n=p.get(h),d=this[h];n!==d&&(!o.waitUntilFirstUpdate||this.hasUpdated)&&this[r](n,d)}l.call(this,p)}}}}var zt=t=>e=>typeof e=="function"?((o,i)=>(window.customElements.define(o,i),i))(t,e):((o,i)=>{const{kind:r,elements:l}=i;return{kind:r,elements:l,finisher(h){window.customElements.define(o,h)}}})(t,e),ko=(t,e)=>e.kind==="method"&&e.descriptor&&!("value"in e.descriptor)?Pt(rt({},e),{finisher(o){o.createProperty(e.key,t)}}):{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:e.key,initializer(){typeof e.initializer=="function"&&(this[e.key]=e.initializer.call(this))},finisher(o){o.createProperty(e.key,t)}};function S(t){return(e,o)=>o!==void 0?((i,r,l)=>{r.constructor.createProperty(l,i)})(t,e,o):ko(t,e)}function Oo(t){return S(Pt(rt({},t),{state:!0}))}var Ho=({finisher:t,descriptor:e})=>(o,i)=>{var r;if(i===void 0){const l=(r=o.originalKey)!==null&&r!==void 0?r:o.key,h=e!=null?{kind:"method",placement:"prototype",key:l,descriptor:e(o.key)}:Pt(rt({},o),{key:l});return t!=null&&(h.finisher=function(p){t(p,l)}),h}{const l=o.constructor;e!==void 0&&Object.defineProperty(o,i,e(i)),t?.(l,i)}};function wt(t,e){return Ho({descriptor:o=>{const i={get(){var r,l;return(l=(r=this.renderRoot)===null||r===void 0?void 0:r.querySelector(t))!==null&&l!==void 0?l:null},enumerable:!0,configurable:!0};if(e){const r=typeof o=="symbol"?Symbol():"__"+o;i.get=function(){var l,h;return this[r]===void 0&&(this[r]=(h=(l=this.renderRoot)===null||l===void 0?void 0:l.querySelector(t))!==null&&h!==void 0?h:null),this[r]}}return i}})}var Ft;((Ft=window.HTMLSlotElement)===null||Ft===void 0?void 0:Ft.prototype.assignedElements)!=null;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 *//**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var Ke=null,We=class{};We.render=function(t,e){Ke(t,e)};self.QrCreator=We;(function(t){function e(p,n,d,v){var s={},a=t(d,n);a.u(p),a.J(),v=v||0;var f=a.h(),c=a.h()+2*v;return s.text=p,s.level=n,s.version=d,s.O=c,s.a=function(m,A){return m-=v,A-=v,0>m||m>=f||0>A||A>=f?!1:a.a(m,A)},s}function o(p,n,d,v,s,a,f,c,m,A){function M(b,y,u,g,_,E,x){b?(p.lineTo(y+E,u+x),p.arcTo(y,u,g,_,a)):p.lineTo(y,u)}f?p.moveTo(n+a,d):p.moveTo(n,d),M(c,v,d,v,s,-a,0),M(m,v,s,n,s,0,-a),M(A,n,s,n,d,a,0),M(f,n,d,v,d,0,a)}function i(p,n,d,v,s,a,f,c,m,A){function M(b,y,u,g){p.moveTo(b+u,y),p.lineTo(b,y),p.lineTo(b,y+g),p.arcTo(b,y,b+u,y,a)}f&&M(n,d,a,a),c&&M(v,d,-a,a),m&&M(v,s,-a,-a),A&&M(n,s,a,-a)}function r(p,n){var d=n.fill;if(typeof d=="string")p.fillStyle=d;else{var v=d.type,s=d.colorStops;if(d=d.position.map(f=>Math.round(f*n.size)),v==="linear-gradient")var a=p.createLinearGradient.apply(p,d);else if(v==="radial-gradient")a=p.createRadialGradient.apply(p,d);else throw Error("Unsupported fill");s.forEach(([f,c])=>{a.addColorStop(f,c)}),p.fillStyle=a}}function l(p,n){t:{var d=n.text,v=n.v,s=n.N,a=n.K,f=n.P;for(s=Math.max(1,s||1),a=Math.min(40,a||40);s<=a;s+=1)try{var c=e(d,v,s,f);break t}catch{}c=void 0}if(!c)return null;for(d=p.getContext("2d"),n.background&&(d.fillStyle=n.background,d.fillRect(n.left,n.top,n.size,n.size)),v=c.O,a=n.size/v,d.beginPath(),f=0;f<v;f+=1)for(s=0;s<v;s+=1){var m=d,A=n.left+s*a,M=n.top+f*a,b=f,y=s,u=c.a,g=A+a,_=M+a,E=b-1,x=b+1,$=y-1,w=y+1,O=Math.floor(Math.min(.5,Math.max(0,n.R))*a),R=u(b,y),K=u(E,$),$t=u(E,y);E=u(E,w);var At=u(b,w);w=u(x,w),y=u(x,y),x=u(x,$),b=u(b,$),A=Math.round(A),M=Math.round(M),g=Math.round(g),_=Math.round(_),R?o(m,A,M,g,_,O,!$t&&!b,!$t&&!At,!y&&!At,!y&&!b):i(m,A,M,g,_,O,$t&&b&&K,$t&&At&&E,y&&At&&w,y&&b&&x)}return r(d,n),d.fill(),p}var h={minVersion:1,maxVersion:40,ecLevel:"L",left:0,top:0,size:200,fill:"#000",background:null,text:"no text",radius:.5,quiet:0};Ke=function(p,n){var d={};Object.assign(d,h,p),d.N=d.minVersion,d.K=d.maxVersion,d.v=d.ecLevel,d.left=d.left,d.top=d.top,d.size=d.size,d.fill=d.fill,d.background=d.background,d.text=d.text,d.R=d.radius,d.P=d.quiet,n instanceof HTMLCanvasElement?((n.width!==d.size||n.height!==d.size)&&(n.width=d.size,n.height=d.size),n.getContext("2d").clearRect(0,0,n.width,n.height),l(n,d)):(p=document.createElement("canvas"),p.width=d.size,p.height=d.size,d=l(p,d),n.appendChild(d))}})(function(){function t(n){var d=o.s(n);return{S:function(){return 4},b:function(){return d.length},write:function(v){for(var s=0;s<d.length;s+=1)v.put(d[s],8)}}}function e(){var n=[],d=0,v={B:function(){return n},c:function(s){return(n[Math.floor(s/8)]>>>7-s%8&1)==1},put:function(s,a){for(var f=0;f<a;f+=1)v.m((s>>>a-f-1&1)==1)},f:function(){return d},m:function(s){var a=Math.floor(d/8);n.length<=a&&n.push(0),s&&(n[a]|=128>>>d%8),d+=1}};return v}function o(n,d){function v(b,y){for(var u=-1;7>=u;u+=1)if(!(-1>=b+u||c<=b+u))for(var g=-1;7>=g;g+=1)-1>=y+g||c<=y+g||(f[b+u][y+g]=0<=u&&6>=u&&(g==0||g==6)||0<=g&&6>=g&&(u==0||u==6)||2<=u&&4>=u&&2<=g&&4>=g)}function s(b,y){for(var u=c=4*n+17,g=Array(u),_=0;_<u;_+=1){g[_]=Array(u);for(var E=0;E<u;E+=1)g[_][E]=null}for(f=g,v(0,0),v(c-7,0),v(0,c-7),u=l.G(n),g=0;g<u.length;g+=1)for(_=0;_<u.length;_+=1){E=u[g];var x=u[_];if(f[E][x]==null)for(var $=-2;2>=$;$+=1)for(var w=-2;2>=w;w+=1)f[E+$][x+w]=$==-2||$==2||w==-2||w==2||$==0&&w==0}for(u=8;u<c-8;u+=1)f[u][6]==null&&(f[u][6]=u%2==0);for(u=8;u<c-8;u+=1)f[6][u]==null&&(f[6][u]=u%2==0);for(u=l.w(a<<3|y),g=0;15>g;g+=1)_=!b&&(u>>g&1)==1,f[6>g?g:8>g?g+1:c-15+g][8]=_,f[8][8>g?c-g-1:9>g?15-g:14-g]=_;if(f[c-8][8]=!b,7<=n){for(u=l.A(n),g=0;18>g;g+=1)_=!b&&(u>>g&1)==1,f[Math.floor(g/3)][g%3+c-8-3]=_;for(g=0;18>g;g+=1)_=!b&&(u>>g&1)==1,f[g%3+c-8-3][Math.floor(g/3)]=_}if(m==null){for(b=p.I(n,a),u=e(),g=0;g<A.length;g+=1)_=A[g],u.put(4,4),u.put(_.b(),l.f(4,n)),_.write(u);for(g=_=0;g<b.length;g+=1)_+=b[g].j;if(u.f()>8*_)throw Error("code length overflow. ("+u.f()+">"+8*_+")");for(u.f()+4<=8*_&&u.put(0,4);u.f()%8!=0;)u.m(!1);for(;!(u.f()>=8*_)&&(u.put(236,8),!(u.f()>=8*_));)u.put(17,8);var O=0;for(_=g=0,E=Array(b.length),x=Array(b.length),$=0;$<b.length;$+=1){var R=b[$].j,K=b[$].o-R;for(g=Math.max(g,R),_=Math.max(_,K),E[$]=Array(R),w=0;w<E[$].length;w+=1)E[$][w]=255&u.B()[w+O];for(O+=R,w=l.C(K),R=i(E[$],w.b()-1).l(w),x[$]=Array(w.b()-1),w=0;w<x[$].length;w+=1)K=w+R.b()-x[$].length,x[$][w]=0<=K?R.c(K):0}for(w=u=0;w<b.length;w+=1)u+=b[w].o;for(u=Array(u),w=O=0;w<g;w+=1)for($=0;$<b.length;$+=1)w<E[$].length&&(u[O]=E[$][w],O+=1);for(w=0;w<_;w+=1)for($=0;$<b.length;$+=1)w<x[$].length&&(u[O]=x[$][w],O+=1);m=u}for(b=m,u=-1,g=c-1,_=7,E=0,y=l.F(y),x=c-1;0<x;x-=2)for(x==6&&--x;;){for($=0;2>$;$+=1)f[g][x-$]==null&&(w=!1,E<b.length&&(w=(b[E]>>>_&1)==1),y(g,x-$)&&(w=!w),f[g][x-$]=w,--_,_==-1&&(E+=1,_=7));if(g+=u,0>g||c<=g){g-=u,u=-u;break}}}var a=r[d],f=null,c=0,m=null,A=[],M={u:function(b){b=t(b),A.push(b),m=null},a:function(b,y){if(0>b||c<=b||0>y||c<=y)throw Error(b+","+y);return f[b][y]},h:function(){return c},J:function(){for(var b=0,y=0,u=0;8>u;u+=1){s(!0,u);var g=l.D(M);(u==0||b>g)&&(b=g,y=u)}s(!1,y)}};return M}function i(n,d){if(typeof n.length>"u")throw Error(n.length+"/"+d);var v=function(){for(var a=0;a<n.length&&n[a]==0;)a+=1;for(var f=Array(n.length-a+d),c=0;c<n.length-a;c+=1)f[c]=n[c+a];return f}(),s={c:function(a){return v[a]},b:function(){return v.length},multiply:function(a){for(var f=Array(s.b()+a.b()-1),c=0;c<s.b();c+=1)for(var m=0;m<a.b();m+=1)f[c+m]^=h.i(h.g(s.c(c))+h.g(a.c(m)));return i(f,0)},l:function(a){if(0>s.b()-a.b())return s;for(var f=h.g(s.c(0))-h.g(a.c(0)),c=Array(s.b()),m=0;m<s.b();m+=1)c[m]=s.c(m);for(m=0;m<a.b();m+=1)c[m]^=h.i(h.g(a.c(m))+f);return i(c,0).l(a)}};return s}o.s=function(n){for(var d=[],v=0;v<n.length;v++){var s=n.charCodeAt(v);128>s?d.push(s):2048>s?d.push(192|s>>6,128|s&63):55296>s||57344<=s?d.push(224|s>>12,128|s>>6&63,128|s&63):(v++,s=65536+((s&1023)<<10|n.charCodeAt(v)&1023),d.push(240|s>>18,128|s>>12&63,128|s>>6&63,128|s&63))}return d};var r={L:1,M:0,Q:3,H:2},l=function(){function n(s){for(var a=0;s!=0;)a+=1,s>>>=1;return a}var d=[[],[6,18],[6,22],[6,26],[6,30],[6,34],[6,22,38],[6,24,42],[6,26,46],[6,28,50],[6,30,54],[6,32,58],[6,34,62],[6,26,46,66],[6,26,48,70],[6,26,50,74],[6,30,54,78],[6,30,56,82],[6,30,58,86],[6,34,62,90],[6,28,50,72,94],[6,26,50,74,98],[6,30,54,78,102],[6,28,54,80,106],[6,32,58,84,110],[6,30,58,86,114],[6,34,62,90,118],[6,26,50,74,98,122],[6,30,54,78,102,126],[6,26,52,78,104,130],[6,30,56,82,108,134],[6,34,60,86,112,138],[6,30,58,86,114,142],[6,34,62,90,118,146],[6,30,54,78,102,126,150],[6,24,50,76,102,128,154],[6,28,54,80,106,132,158],[6,32,58,84,110,136,162],[6,26,54,82,110,138,166],[6,30,58,86,114,142,170]],v={w:function(s){for(var a=s<<10;0<=n(a)-n(1335);)a^=1335<<n(a)-n(1335);return(s<<10|a)^21522},A:function(s){for(var a=s<<12;0<=n(a)-n(7973);)a^=7973<<n(a)-n(7973);return s<<12|a},G:function(s){return d[s-1]},F:function(s){switch(s){case 0:return function(a,f){return(a+f)%2==0};case 1:return function(a){return a%2==0};case 2:return function(a,f){return f%3==0};case 3:return function(a,f){return(a+f)%3==0};case 4:return function(a,f){return(Math.floor(a/2)+Math.floor(f/3))%2==0};case 5:return function(a,f){return a*f%2+a*f%3==0};case 6:return function(a,f){return(a*f%2+a*f%3)%2==0};case 7:return function(a,f){return(a*f%3+(a+f)%2)%2==0};default:throw Error("bad maskPattern:"+s)}},C:function(s){for(var a=i([1],0),f=0;f<s;f+=1)a=a.multiply(i([1,h.i(f)],0));return a},f:function(s,a){if(s!=4||1>a||40<a)throw Error("mode: "+s+"; type: "+a);return 10>a?8:16},D:function(s){for(var a=s.h(),f=0,c=0;c<a;c+=1)for(var m=0;m<a;m+=1){for(var A=0,M=s.a(c,m),b=-1;1>=b;b+=1)if(!(0>c+b||a<=c+b))for(var y=-1;1>=y;y+=1)0>m+y||a<=m+y||(b!=0||y!=0)&&M==s.a(c+b,m+y)&&(A+=1);5<A&&(f+=3+A-5)}for(c=0;c<a-1;c+=1)for(m=0;m<a-1;m+=1)A=0,s.a(c,m)&&(A+=1),s.a(c+1,m)&&(A+=1),s.a(c,m+1)&&(A+=1),s.a(c+1,m+1)&&(A+=1),(A==0||A==4)&&(f+=3);for(c=0;c<a;c+=1)for(m=0;m<a-6;m+=1)s.a(c,m)&&!s.a(c,m+1)&&s.a(c,m+2)&&s.a(c,m+3)&&s.a(c,m+4)&&!s.a(c,m+5)&&s.a(c,m+6)&&(f+=40);for(m=0;m<a;m+=1)for(c=0;c<a-6;c+=1)s.a(c,m)&&!s.a(c+1,m)&&s.a(c+2,m)&&s.a(c+3,m)&&s.a(c+4,m)&&!s.a(c+5,m)&&s.a(c+6,m)&&(f+=40);for(m=A=0;m<a;m+=1)for(c=0;c<a;c+=1)s.a(c,m)&&(A+=1);return f+=Math.abs(100*A/a/a-50)/5*10}};return v}(),h=function(){for(var n=Array(256),d=Array(256),v=0;8>v;v+=1)n[v]=1<<v;for(v=8;256>v;v+=1)n[v]=n[v-4]^n[v-5]^n[v-6]^n[v-8];for(v=0;255>v;v+=1)d[n[v]]=v;return{g:function(s){if(1>s)throw Error("glog("+s+")");return d[s]},i:function(s){for(;0>s;)s+=255;for(;256<=s;)s-=255;return n[s]}}}(),p=function(){function n(s,a){switch(a){case r.L:return d[4*(s-1)];case r.M:return d[4*(s-1)+1];case r.Q:return d[4*(s-1)+2];case r.H:return d[4*(s-1)+3]}}var d=[[1,26,19],[1,26,16],[1,26,13],[1,26,9],[1,44,34],[1,44,28],[1,44,22],[1,44,16],[1,70,55],[1,70,44],[2,35,17],[2,35,13],[1,100,80],[2,50,32],[2,50,24],[4,25,9],[1,134,108],[2,67,43],[2,33,15,2,34,16],[2,33,11,2,34,12],[2,86,68],[4,43,27],[4,43,19],[4,43,15],[2,98,78],[4,49,31],[2,32,14,4,33,15],[4,39,13,1,40,14],[2,121,97],[2,60,38,2,61,39],[4,40,18,2,41,19],[4,40,14,2,41,15],[2,146,116],[3,58,36,2,59,37],[4,36,16,4,37,17],[4,36,12,4,37,13],[2,86,68,2,87,69],[4,69,43,1,70,44],[6,43,19,2,44,20],[6,43,15,2,44,16],[4,101,81],[1,80,50,4,81,51],[4,50,22,4,51,23],[3,36,12,8,37,13],[2,116,92,2,117,93],[6,58,36,2,59,37],[4,46,20,6,47,21],[7,42,14,4,43,15],[4,133,107],[8,59,37,1,60,38],[8,44,20,4,45,21],[12,33,11,4,34,12],[3,145,115,1,146,116],[4,64,40,5,65,41],[11,36,16,5,37,17],[11,36,12,5,37,13],[5,109,87,1,110,88],[5,65,41,5,66,42],[5,54,24,7,55,25],[11,36,12,7,37,13],[5,122,98,1,123,99],[7,73,45,3,74,46],[15,43,19,2,44,20],[3,45,15,13,46,16],[1,135,107,5,136,108],[10,74,46,1,75,47],[1,50,22,15,51,23],[2,42,14,17,43,15],[5,150,120,1,151,121],[9,69,43,4,70,44],[17,50,22,1,51,23],[2,42,14,19,43,15],[3,141,113,4,142,114],[3,70,44,11,71,45],[17,47,21,4,48,22],[9,39,13,16,40,14],[3,135,107,5,136,108],[3,67,41,13,68,42],[15,54,24,5,55,25],[15,43,15,10,44,16],[4,144,116,4,145,117],[17,68,42],[17,50,22,6,51,23],[19,46,16,6,47,17],[2,139,111,7,140,112],[17,74,46],[7,54,24,16,55,25],[34,37,13],[4,151,121,5,152,122],[4,75,47,14,76,48],[11,54,24,14,55,25],[16,45,15,14,46,16],[6,147,117,4,148,118],[6,73,45,14,74,46],[11,54,24,16,55,25],[30,46,16,2,47,17],[8,132,106,4,133,107],[8,75,47,13,76,48],[7,54,24,22,55,25],[22,45,15,13,46,16],[10,142,114,2,143,115],[19,74,46,4,75,47],[28,50,22,6,51,23],[33,46,16,4,47,17],[8,152,122,4,153,123],[22,73,45,3,74,46],[8,53,23,26,54,24],[12,45,15,28,46,16],[3,147,117,10,148,118],[3,73,45,23,74,46],[4,54,24,31,55,25],[11,45,15,31,46,16],[7,146,116,7,147,117],[21,73,45,7,74,46],[1,53,23,37,54,24],[19,45,15,26,46,16],[5,145,115,10,146,116],[19,75,47,10,76,48],[15,54,24,25,55,25],[23,45,15,25,46,16],[13,145,115,3,146,116],[2,74,46,29,75,47],[42,54,24,1,55,25],[23,45,15,28,46,16],[17,145,115],[10,74,46,23,75,47],[10,54,24,35,55,25],[19,45,15,35,46,16],[17,145,115,1,146,116],[14,74,46,21,75,47],[29,54,24,19,55,25],[11,45,15,46,46,16],[13,145,115,6,146,116],[14,74,46,23,75,47],[44,54,24,7,55,25],[59,46,16,1,47,17],[12,151,121,7,152,122],[12,75,47,26,76,48],[39,54,24,14,55,25],[22,45,15,41,46,16],[6,151,121,14,152,122],[6,75,47,34,76,48],[46,54,24,10,55,25],[2,45,15,64,46,16],[17,152,122,4,153,123],[29,74,46,14,75,47],[49,54,24,10,55,25],[24,45,15,46,46,16],[4,152,122,18,153,123],[13,74,46,32,75,47],[48,54,24,14,55,25],[42,45,15,32,46,16],[20,147,117,4,148,118],[40,75,47,7,76,48],[43,54,24,22,55,25],[10,45,15,67,46,16],[19,148,118,6,149,119],[18,75,47,31,76,48],[34,54,24,34,55,25],[20,45,15,61,46,16]],v={I:function(s,a){var f=n(s,a);if(typeof f>"u")throw Error("bad rs block @ typeNumber:"+s+"/errorCorrectLevel:"+a);s=f.length/3,a=[];for(var c=0;c<s;c+=1)for(var m=f[3*c],A=f[3*c+1],M=f[3*c+2],b=0;b<m;b+=1){var y=M,u={};u.o=A,u.j=y,a.push(u)}return a}};return v}();return o}());var No=QrCreator,z=class extends F{constructor(){super(...arguments),this.value="",this.label="",this.size=128,this.fill="#000",this.background="#fff",this.radius=0,this.errorCorrection="H"}firstUpdated(){this.generate()}generate(){!this.hasUpdated||No.render({text:this.value,radius:this.radius,ecLevel:this.errorCorrection,fill:this.fill,background:this.background==="transparent"?null:this.background,size:this.size*2},this.canvas)}render(){return Q`
      <div
        class="qr-code"
        part="base"
        style=${So({width:`${this.size}px`,height:`${this.size}px`})}
      >
        <canvas role="img" aria-label=${this.label.length>0?this.label:this.value}></canvas>
      </div>
    `}};z.styles=xo;C([wt("canvas")],z.prototype,"canvas",2);C([S()],z.prototype,"value",2);C([S()],z.prototype,"label",2);C([S({type:Number})],z.prototype,"size",2);C([S()],z.prototype,"fill",2);C([S()],z.prototype,"background",2);C([S({type:Number})],z.prototype,"radius",2);C([S({attribute:"error-correction"})],z.prototype,"errorCorrection",2);C([H("background"),H("errorCorrection"),H("fill"),H("radius"),H("size"),H("value")],z.prototype,"generate",1);z=C([zt("sl-qr-code")],z);function xe(t){const e=t.tagName.toLowerCase();return t.getAttribute("tabindex")==="-1"||t.hasAttribute("disabled")||t.hasAttribute("aria-disabled")&&t.getAttribute("aria-disabled")!=="false"||e==="input"&&t.getAttribute("type")==="radio"&&!t.hasAttribute("checked")||t.offsetParent===null||window.getComputedStyle(t).visibility==="hidden"?!1:(e==="audio"||e==="video")&&t.hasAttribute("controls")||t.hasAttribute("tabindex")||t.hasAttribute("contenteditable")&&t.getAttribute("contenteditable")!=="false"?!0:["button","input","select","textarea","a","audio","video","summary"].includes(e)}function Uo(t){var e,o;const i=[];function r(p){p instanceof HTMLElement&&(i.push(p),p.shadowRoot!==null&&p.shadowRoot.mode==="open"&&r(p.shadowRoot)),[...p.querySelectorAll("*")].forEach(n=>r(n))}r(t);const l=(e=i.find(p=>xe(p)))!=null?e:null,h=(o=i.reverse().find(p=>xe(p)))!=null?o:null;return{start:l,end:h}}var dt=[],Ro=class{constructor(t){this.tabDirection="forward",this.element=t,this.handleFocusIn=this.handleFocusIn.bind(this),this.handleKeyDown=this.handleKeyDown.bind(this),this.handleKeyUp=this.handleKeyUp.bind(this)}activate(){dt.push(this.element),document.addEventListener("focusin",this.handleFocusIn),document.addEventListener("keydown",this.handleKeyDown),document.addEventListener("keyup",this.handleKeyUp)}deactivate(){dt=dt.filter(t=>t!==this.element),document.removeEventListener("focusin",this.handleFocusIn),document.removeEventListener("keydown",this.handleKeyDown),document.removeEventListener("keyup",this.handleKeyUp)}isActive(){return dt[dt.length-1]===this.element}checkFocus(){if(this.isActive()&&!this.element.matches(":focus-within")){const{start:t,end:e}=Uo(this.element),o=this.tabDirection==="forward"?t:e;typeof o?.focus=="function"&&o.focus({preventScroll:!0})}}handleFocusIn(){this.checkFocus()}handleKeyDown(t){t.key==="Tab"&&t.shiftKey&&(this.tabDirection="backward"),requestAnimationFrame(()=>this.checkFocus())}handleKeyUp(){this.tabDirection="forward"}},Qt=new Set;function Se(t){Qt.add(t),document.body.classList.add("sl-scroll-lock")}function Me(t){Qt.delete(t),Qt.size===0&&document.body.classList.remove("sl-scroll-lock")}var Gt=new Set,Bo=new MutationObserver(Qe),Jt=new Map,ut=document.documentElement.lang||navigator.language,vt;Bo.observe(document.documentElement,{attributes:!0,attributeFilter:["lang"]});function Do(...t){t.map(e=>{const o=e.$code.toLowerCase();Jt.set(o,e),vt||(vt=e)}),Qe()}function Io(t,e,...o){const i=t.toLowerCase().slice(0,2),r=t.length>2?t.toLowerCase():"",l=Jt.get(r),h=Jt.get(i);let p;if(l&&l[e])p=l[e];else if(h&&h[e])p=h[e];else if(vt&&vt[e])p=vt[e];else return console.error(`No translation found for: ${e}`),e;return typeof p=="function"?p(...o):p}function jo(t,e,o){return e=new Date(e),new Intl.DateTimeFormat(t,o).format(e)}function Fo(t,e,o){return e=Number(e),isNaN(e)?"":new Intl.NumberFormat(t,o).format(e)}function qo(t,e,o,i){return new Intl.RelativeTimeFormat(t,i).format(e,o)}function Qe(){ut=document.documentElement.lang||navigator.language,[...Gt.keys()].map(t=>{typeof t.requestUpdate=="function"&&t.requestUpdate()})}var Vo=class{constructor(t){this.host=t,this.host.addController(this)}hostConnected(){Gt.add(this.host)}hostDisconnected(){Gt.delete(this.host)}term(t,...e){return Io(this.host.lang||ut,t,...e)}date(t,e){return jo(this.host.lang||ut,t,e)}number(t,e){return Fo(this.host.lang||ut,t,e)}relativeTime(t,e,o){return qo(this.host.lang||ut,t,e,o)}},Ko={$code:"en",$name:"English",$dir:"ltr",close:"Close",copy:"Copy",currentValue:"Current value",progress:"Progress",remove:"Remove",resize:"Resize",scrollToEnd:"Scroll to end",scrollToStart:"Scroll to start",selectAColorFromTheScreen:"Select a color from the screen",toggleColorFormat:"Toggle color format"};Do(Ko);var Wo=yt`
  ${Tt}

  :host {
    --width: 31rem;
    --header-spacing: var(--sl-spacing-large);
    --body-spacing: var(--sl-spacing-large);
    --footer-spacing: var(--sl-spacing-large);

    display: contents;
  }

  .dialog {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: var(--sl-z-index-dialog);
  }

  .dialog__panel {
    display: flex;
    flex-direction: column;
    z-index: 2;
    width: var(--width);
    max-width: calc(100% - var(--sl-spacing-2x-large));
    max-height: calc(100% - var(--sl-spacing-2x-large));
    background-color: var(--sl-panel-background-color);
    border-radius: var(--sl-border-radius-medium);
    box-shadow: var(--sl-shadow-x-large);
  }

  .dialog__panel:focus {
    outline: none;
  }

  /* Ensure there's enough vertical padding for phones that don't update vh when chrome appears (e.g. iPhone) */
  @media screen and (max-width: 420px) {
    .dialog__panel {
      max-height: 80vh;
    }
  }

  .dialog--open .dialog__panel {
    display: flex;
    opacity: 1;
    transform: none;
  }

  .dialog__header {
    flex: 0 0 auto;
    display: flex;
  }

  .dialog__title {
    flex: 1 1 auto;
    font: inherit;
    font-size: var(--sl-font-size-large);
    line-height: var(--sl-line-height-dense);
    padding: var(--header-spacing);
    margin: 0;
  }

  .dialog__close {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    font-size: var(--sl-font-size-x-large);
    padding: 0 var(--header-spacing);
  }

  .dialog__body {
    flex: 1 1 auto;
    padding: var(--body-spacing);
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  }

  .dialog__footer {
    flex: 0 0 auto;
    text-align: right;
    padding: var(--footer-spacing);
  }

  .dialog__footer ::slotted(sl-button:not(:first-of-type)) {
    margin-left: var(--sl-spacing-x-small);
  }

  .dialog:not(.dialog--has-footer) .dialog__footer {
    display: none;
  }

  .dialog__overlay {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: var(--sl-overlay-background-color);
  }
`;function ht(t,e,o){return new Promise(i=>{if(o?.duration===1/0)throw new Error("Promise-based animations must be finite.");const r=t.animate(e,Pt(rt({},o),{duration:Qo()?0:o.duration}));r.addEventListener("cancel",i,{once:!0}),r.addEventListener("finish",i,{once:!0})})}function Qo(){return window.matchMedia("(prefers-reduced-motion: reduce)").matches}function Et(t){return Promise.all(t.getAnimations().map(e=>new Promise(o=>{const i=requestAnimationFrame(o);e.addEventListener("cancel",()=>i,{once:!0}),e.addEventListener("finish",()=>i,{once:!0}),e.cancel()})))}var Ge=new Map,Go=new WeakMap;function Jo(t){return t??{keyframes:[],options:{duration:0}}}function _t(t,e){Ge.set(t,Jo(e))}function ct(t,e){const o=Go.get(t);if(o?.[e])return o[e];const i=Ge.get(e);return i||{keyframes:[],options:{duration:0}}}var Zo=class{constructor(t,...e){this.slotNames=[],(this.host=t).addController(this),this.slotNames=e,this.handleSlotChange=this.handleSlotChange.bind(this)}hasDefaultSlot(){return[...this.host.childNodes].some(t=>{if(t.nodeType===t.TEXT_NODE&&t.textContent.trim()!=="")return!0;if(t.nodeType===t.ELEMENT_NODE){const e=t;if(e.tagName.toLowerCase()==="sl-visually-hidden")return!1;if(!e.hasAttribute("slot"))return!0}return!1})}hasNamedSlot(t){return this.host.querySelector(`:scope > [slot="${t}"]`)!==null}test(t){return t==="[default]"?this.hasDefaultSlot():this.hasNamedSlot(t)}hostConnected(){this.host.shadowRoot.addEventListener("slotchange",this.handleSlotChange)}hostDisconnected(){this.host.shadowRoot.removeEventListener("slotchange",this.handleSlotChange)}handleSlotChange(t){const e=t.target;(this.slotNames.includes("[default]")&&!e.name||e.name&&this.slotNames.includes(e.name))&&this.host.requestUpdate()}},Je=se(class extends ne{constructor(t){var e;if(super(t),t.type!==re.ATTRIBUTE||t.name!=="class"||((e=t.strings)===null||e===void 0?void 0:e.length)>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(t){return" "+Object.keys(t).filter(e=>t[e]).join(" ")+" "}update(t,[e]){var o,i;if(this.st===void 0){this.st=new Set,t.strings!==void 0&&(this.et=new Set(t.strings.join(" ").split(/\s/).filter(l=>l!=="")));for(const l in e)e[l]&&!(!((o=this.et)===null||o===void 0)&&o.has(l))&&this.st.add(l);return this.render(e)}const r=t.element.classList;this.st.forEach(l=>{l in e||(r.remove(l),this.st.delete(l))});for(const l in e){const h=!!e[l];h===this.st.has(l)||((i=this.et)===null||i===void 0?void 0:i.has(l))||(h?(r.add(l),this.st.add(l)):(r.remove(l),this.st.delete(l)))}return B}});/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var P=t=>t??L;/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function N(t,e,o){const i=new CustomEvent(e,rt({bubbles:!0,cancelable:!1,composed:!0,detail:{}},o));return t.dispatchEvent(i),i}function Le(t,e){return new Promise(o=>{function i(r){r.target===t&&(t.removeEventListener(e,i),o())}t.addEventListener(e,i)})}var U=class extends F{constructor(){super(...arguments),this.hasSlotController=new Zo(this,"footer"),this.localize=new Vo(this),this.open=!1,this.label="",this.noHeader=!1}connectedCallback(){super.connectedCallback(),this.modal=new Ro(this)}firstUpdated(){this.dialog.hidden=!this.open,this.open&&(this.modal.activate(),Se(this))}disconnectedCallback(){super.disconnectedCallback(),Me(this)}async show(){if(!this.open)return this.open=!0,Le(this,"sl-after-show")}async hide(){if(!!this.open)return this.open=!1,Le(this,"sl-after-hide")}requestClose(t){if(N(this,"sl-request-close",{cancelable:!0,detail:{source:t}}).defaultPrevented){const o=ct(this,"dialog.denyClose");ht(this.panel,o.keyframes,o.options);return}this.hide()}handleKeyDown(t){t.key==="Escape"&&(t.stopPropagation(),this.requestClose("keyboard"))}async handleOpenChange(){if(this.open){N(this,"sl-show"),this.originalTrigger=document.activeElement,this.modal.activate(),Se(this);const t=this.querySelector("[autofocus]");t&&t.removeAttribute("autofocus"),await Promise.all([Et(this.dialog),Et(this.overlay)]),this.dialog.hidden=!1,requestAnimationFrame(()=>{N(this,"sl-initial-focus",{cancelable:!0}).defaultPrevented||(t?t.focus({preventScroll:!0}):this.panel.focus({preventScroll:!0})),t&&t.setAttribute("autofocus","")});const e=ct(this,"dialog.show"),o=ct(this,"dialog.overlay.show");await Promise.all([ht(this.panel,e.keyframes,e.options),ht(this.overlay,o.keyframes,o.options)]),N(this,"sl-after-show")}else{N(this,"sl-hide"),this.modal.deactivate(),await Promise.all([Et(this.dialog),Et(this.overlay)]);const t=ct(this,"dialog.hide"),e=ct(this,"dialog.overlay.hide");await Promise.all([ht(this.panel,t.keyframes,t.options),ht(this.overlay,e.keyframes,e.options)]),this.dialog.hidden=!0,Me(this);const o=this.originalTrigger;typeof o?.focus=="function"&&setTimeout(()=>o.focus()),N(this,"sl-after-hide")}}render(){return Q`
      <div
        part="base"
        class=${Je({dialog:!0,"dialog--open":this.open,"dialog--has-footer":this.hasSlotController.test("footer")})}
        @keydown=${this.handleKeyDown}
      >
        <div part="overlay" class="dialog__overlay" @click=${()=>this.requestClose("overlay")} tabindex="-1"></div>

        <div
          part="panel"
          class="dialog__panel"
          role="dialog"
          aria-modal="true"
          aria-hidden=${this.open?"false":"true"}
          aria-label=${P(this.noHeader?this.label:void 0)}
          aria-labelledby=${P(this.noHeader?void 0:"title")}
          tabindex="0"
        >
          ${this.noHeader?"":Q`
                <header part="header" class="dialog__header">
                  <h2 part="title" class="dialog__title" id="title">
                    <slot name="label"> ${this.label.length>0?this.label:String.fromCharCode(65279)} </slot>
                  </h2>
                  <sl-icon-button
                    part="close-button"
                    exportparts="base:close-button__base"
                    class="dialog__close"
                    name="x"
                    label=${this.localize.term("close")}
                    library="system"
                    @click="${()=>this.requestClose("close-button")}"
                  ></sl-icon-button>
                </header>
              `}

          <div part="body" class="dialog__body">
            <slot></slot>
          </div>

          <footer part="footer" class="dialog__footer">
            <slot name="footer"></slot>
          </footer>
        </div>
      </div>
    `}};U.styles=Wo;C([wt(".dialog")],U.prototype,"dialog",2);C([wt(".dialog__panel")],U.prototype,"panel",2);C([wt(".dialog__overlay")],U.prototype,"overlay",2);C([S({type:Boolean,reflect:!0})],U.prototype,"open",2);C([S({reflect:!0})],U.prototype,"label",2);C([S({attribute:"no-header",type:Boolean,reflect:!0})],U.prototype,"noHeader",2);C([H("open",{waitUntilFirstUpdate:!0})],U.prototype,"handleOpenChange",1);U=C([zt("sl-dialog")],U);_t("dialog.show",{keyframes:[{opacity:0,transform:"scale(0.8)"},{opacity:1,transform:"scale(1)"}],options:{duration:250,easing:"ease"}});_t("dialog.hide",{keyframes:[{opacity:1,transform:"scale(1)"},{opacity:0,transform:"scale(0.8)"}],options:{duration:250,easing:"ease"}});_t("dialog.denyClose",{keyframes:[{transform:"scale(1)"},{transform:"scale(1.02)"},{transform:"scale(1)"}],options:{duration:250}});_t("dialog.overlay.show",{keyframes:[{opacity:0},{opacity:1}],options:{duration:250}});_t("dialog.overlay.hide",{keyframes:[{opacity:1},{opacity:0}],options:{duration:250}});var Yo=(()=>{const t=document.createElement("style");let e;try{document.head.appendChild(t),t.sheet.insertRule(":focus-visible { color: inherit }"),e=!0}catch{e=!1}finally{t.remove()}return e})(),Xo=De(Yo?":focus-visible":":focus"),ti=yt`
  ${Tt}

  :host {
    display: inline-block;
  }

  .icon-button {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    background: none;
    border: none;
    border-radius: var(--sl-border-radius-medium);
    font-size: inherit;
    color: var(--sl-color-neutral-600);
    padding: var(--sl-spacing-x-small);
    cursor: pointer;
    transition: var(--sl-transition-medium) color;
    -webkit-appearance: none;
  }

  .icon-button:hover:not(.icon-button--disabled),
  .icon-button:focus:not(.icon-button--disabled) {
    color: var(--sl-color-primary-600);
  }

  .icon-button:active:not(.icon-button--disabled) {
    color: var(--sl-color-primary-700);
  }

  .icon-button:focus {
    outline: none;
  }

  .icon-button--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .icon-button${Xo} {
    box-shadow: var(--sl-focus-ring);
  }
`,k=class extends F{constructor(){super(...arguments),this.label="",this.disabled=!1}render(){const t=!!this.href,e=Q`
      <sl-icon
        name=${P(this.name)}
        library=${P(this.library)}
        src=${P(this.src)}
        aria-hidden="true"
      ></sl-icon>
    `;return t?Q`
          <a
            part="base"
            class="icon-button"
            href=${P(this.href)}
            target=${P(this.target)}
            download=${P(this.download)}
            rel=${P(this.target?"noreferrer noopener":void 0)}
            role="button"
            aria-disabled=${this.disabled?"true":"false"}
            aria-label="${this.label}"
            tabindex=${this.disabled?"-1":"0"}
          >
            ${e}
          </a>
        `:Q`
          <button
            part="base"
            class=${Je({"icon-button":!0,"icon-button--disabled":this.disabled})}
            ?disabled=${this.disabled}
            type="button"
            aria-label=${this.label}
          >
            ${e}
          </button>
        `}};k.styles=ti;C([wt(".icon-button")],k.prototype,"button",2);C([S()],k.prototype,"name",2);C([S()],k.prototype,"library",2);C([S()],k.prototype,"src",2);C([S()],k.prototype,"href",2);C([S()],k.prototype,"target",2);C([S()],k.prototype,"download",2);C([S()],k.prototype,"label",2);C([S({type:Boolean,reflect:!0})],k.prototype,"disabled",2);k=C([zt("sl-icon-button")],k);var Ze="";function Te(t){Ze=t}function ei(){return Ze.replace(/\/$/,"")}var Ye=[...document.getElementsByTagName("script")],Pe=Ye.find(t=>t.hasAttribute("data-shoelace"));if(Pe)Te(Pe.getAttribute("data-shoelace"));else{const t=Ye.find(o=>/shoelace(\.min)?\.js($|\?)/.test(o.src));let e="";t&&(e=t.getAttribute("src")),Te(e.split("/").slice(0,-1).join("/"))}var oi={name:"default",resolver:t=>`${ei()}/assets/icons/${t}.svg`},ii=oi,ze={"check-lg":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16">
      <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"></path>
    </svg>
  `,"chevron-down":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
    </svg>
  `,"chevron-left":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-left" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
    </svg>
  `,"chevron-right":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
    </svg>
  `,eye:`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
      <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
      <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
    </svg>
  `,"eye-slash":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-slash" viewBox="0 0 16 16">
      <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z"/>
      <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z"/>
      <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z"/>
    </svg>
  `,eyedropper:`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eyedropper" viewBox="0 0 16 16">
      <path d="M13.354.646a1.207 1.207 0 0 0-1.708 0L8.5 3.793l-.646-.647a.5.5 0 1 0-.708.708L8.293 5l-7.147 7.146A.5.5 0 0 0 1 12.5v1.793l-.854.853a.5.5 0 1 0 .708.707L1.707 15H3.5a.5.5 0 0 0 .354-.146L11 7.707l1.146 1.147a.5.5 0 0 0 .708-.708l-.647-.646 3.147-3.146a1.207 1.207 0 0 0 0-1.708l-2-2zM2 12.707l7-7L10.293 7l-7 7H2v-1.293z"></path>
    </svg>
  `,"grip-vertical":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-grip-vertical" viewBox="0 0 16 16">
      <path d="M7 2a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 5a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
    </svg>
  `,"person-fill":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
      <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
    </svg>
  `,"play-fill":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-play-fill" viewBox="0 0 16 16">
      <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"></path>
    </svg>
  `,"pause-fill":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pause-fill" viewBox="0 0 16 16">
      <path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z"></path>
    </svg>
  `,"star-fill":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
      <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
    </svg>
  `,x:`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
      <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
    </svg>
  `,"x-circle-fill":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"></path>
    </svg>
  `},ri={name:"system",resolver:t=>t in ze?`data:image/svg+xml,${encodeURIComponent(ze[t])}`:""},si=ri,ni=[ii,si],Zt=[];function ai(t){Zt.push(t)}function li(t){Zt=Zt.filter(e=>e!==t)}function ke(t){return ni.find(e=>e.name===t)}var qt=new Map;function di(t,e="cors"){if(qt.has(t))return qt.get(t);const o=fetch(t,{mode:e}).then(async i=>({ok:i.ok,status:i.status,html:await i.text()}));return qt.set(t,o),o}var Vt=new Map;async function hi(t){if(Vt.has(t))return Vt.get(t);const e=await di(t),o={ok:e.ok,status:e.status,svg:null};if(e.ok){const i=document.createElement("div");i.innerHTML=e.html;const r=i.firstElementChild;o.svg=r?.tagName.toLowerCase()==="svg"?r.outerHTML:""}return Vt.set(t,o),o}var ci=yt`
  ${Tt}

  :host {
    display: inline-block;
    width: 1em;
    height: 1em;
    contain: strict;
    box-sizing: content-box !important;
  }

  .icon,
  svg {
    display: block;
    height: 100%;
    width: 100%;
  }
`,Yt=class extends ne{constructor(t){if(super(t),this.it=L,t.type!==re.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===L||t==null)return this.vt=void 0,this.it=t;if(t===B)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this.vt;this.it=t;const e=[t];return e.raw=e,this.vt={_$litType$:this.constructor.resultType,strings:e,values:[]}}};Yt.directiveName="unsafeHTML",Yt.resultType=1;var Xt=class extends Yt{};Xt.directiveName="unsafeSVG",Xt.resultType=2;var ui=se(Xt),pi=new DOMParser,D=class extends F{constructor(){super(...arguments),this.svg="",this.label="",this.library="default"}connectedCallback(){super.connectedCallback(),ai(this)}firstUpdated(){this.setIcon()}disconnectedCallback(){super.disconnectedCallback(),li(this)}getUrl(){const t=ke(this.library);return this.name&&t?t.resolver(this.name):this.src}redraw(){this.setIcon()}async setIcon(){var t;const e=ke(this.library),o=this.getUrl();if(o)try{const i=await hi(o);if(o!==this.getUrl())return;if(i.ok){const l=pi.parseFromString(i.svg,"text/html").body.querySelector("svg");l!==null?((t=e?.mutator)==null||t.call(e,l),this.svg=l.outerHTML,N(this,"sl-load")):(this.svg="",N(this,"sl-error"))}else this.svg="",N(this,"sl-error")}catch{N(this,"sl-error")}else this.svg.length>0&&(this.svg="")}handleChange(){this.setIcon()}render(){const t=typeof this.label=="string"&&this.label.length>0;return Q` <div
      part="base"
      class="icon"
      role=${P(t?"img":void 0)}
      aria-label=${P(t?this.label:void 0)}
      aria-hidden=${P(t?void 0:"true")}
    >
      ${ui(this.svg)}
    </div>`}};D.styles=ci;C([Oo()],D.prototype,"svg",2);C([S()],D.prototype,"name",2);C([S()],D.prototype,"src",2);C([S()],D.prototype,"label",2);C([S()],D.prototype,"library",2);C([H("name"),H("src"),H("library")],D.prototype,"setIcon",1);D=C([zt("sl-icon")],D);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var vi=Object.defineProperty,fi=Object.getOwnPropertyDescriptor,V=(t,e,o,i)=>{for(var r=i>1?void 0:i?fi(e,o):e,l=t.length-1,h;l>=0;l--)(h=t[l])&&(r=(i?h(e,o,r):h(r))||r);return i&&r&&vi(e,o,r),r};const Xe=document.createElement("template");Xe.innerHTML=`
  <style>
    :host {
      --walisto-modal-bg: #222;
      --walisto-modal-backdrop-bg: rgba(250, 250, 250, 0.2);
      --walisto-modal-button-bg: #555;
      --walisto-modal-button-bg-hover: #777;
      --walisto-modal-button-bg-active: #999;
      --walisto-modal-font-color: #ddd;
      --walisto-modal-button-font-color: var(--walisto-modal-font-color);
      --walisto-modal-font-family: monospace;
      --walisto-modal-outline-fv: 2px solid #07d;
      display: block;
    }

    sl-dialog::part(overlay) {
      background: var(--walisto-modal-backdrop-bg);
    }

    sl-dialog::part(panel) {
      width: auto;
      display: block;
      background: var(--walisto-modal-bg);
      border-radius: 10px;
      color: var(--walisto-modal-font-color);
      font-family: var(--walisto-modal-font-family);
      max-width: 50rem;
    }

    sl-dialog header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem;
    }

    sl-qr-code::part(base) {
      max-width: min(80vw, 80vh);
      max-height: min(80vw, 80vh);
      margin: 1rem;
    }

    sl-dialog header h1 {
      margin: 0;
    }

    #close-button {
      --walisto-button-bg: var(--walisto-modal-button-bg);
      --walisto-button-bg-hover: var(--walisto-modal-button-bg-hover);
      --walisto-button-bg-active: var(--walisto-modal-button-bg-active);
      --walisto-button-font-color: var(--walisto-modal-button-font-color);
      --walisto-outline-fv: var(--walisto-modal-outline-fv);
    }

    #close-button svg {
      height: 1.3rem;
      margin-left: -0.1rem;
    }
  </style>
  <sl-dialog part="dialog" no-header label="Address">
    <header part="header">
      <h1 part="title" id="dialog-title">Address</h1>
      <walisto-button>
        <button part="button" id="close-button" type="button">
          <svg
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>
      </walisto-button>
    </header>
    <sl-qr-code size="254" value="" label="QR Code" />
  </sl-dialog>
`;let I=class extends HTMLElement{constructor(){super(),this.address="",this.name="",this.closeLabel="",this.isOpen=!1,this.attachShadow({mode:"open"}),this.close=this.close.bind(this),this.open=this.open.bind(this)}open(){this.isOpen=!0,this.dialog.show()}close(){this.isOpen=!1,this.dialog.hide(),requestAnimationFrame(()=>{var t;(t=this.initialFocusRef)==null||t.focus()})}connectedCallback(){const t=document.importNode(Xe.content,!0);this.shadowRoot.appendChild(t),this.update(),this.qrCode.value=this.address,this.button.addEventListener("click",this.close)}disconnectedCallback(){this.close(),this.button.removeEventListener("click",this.close)}update(){const t=this.closeLabel||"Close";this.name&&(this.heading.textContent=this.name,this.dialog.label=this.name),this.button.setAttribute("aria-label",t),this.button.setAttribute("title",t)}};V([q("#dialog-title")],I.prototype,"heading",2);V([q("#close-button")],I.prototype,"button",2);V([q("sl-qr-code")],I.prototype,"qrCode",2);V([q("sl-dialog")],I.prototype,"dialog",2);V([T()],I.prototype,"address",2);V([T()],I.prototype,"name",2);V([T({name:"close-label"})],I.prototype,"closeLabel",2);I=V([mt("walisto-modal")],I);var gi=Object.defineProperty,mi=Object.getOwnPropertyDescriptor,st=(t,e,o,i)=>{for(var r=i>1?void 0:i?mi(e,o):e,l=t.length-1,h;l>=0;l--)(h=t[l])&&(r=(i?h(e,o,r):h(r))||r);return i&&r&&gi(e,o,r),r};const to=document.createElement("template");to.innerHTML=`
  <style>
    .success {
      --walisto-button-font-color: #6d3;
    }

    #qr-button svg {
      height: 1.3rem;
    }
  </style>
  <walisto-button>
    <button part="button" id="qr-button" type="button">
      <svg
        aria-hidden="true"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"
        ></path>
      </svg>
    </button>
  </walisto-button>
`;let G=class extends HTMLElement{constructor(){super(),this.label="",this.name="",this.address="",this.closeLabel="",this.attachShadow({mode:"open"}),this.openModal=this.openModal.bind(this)}update(){const t=this.label||"Show QR code";this.button.setAttribute("title",t),this.button.setAttribute("aria-label",t)}connectedCallback(){var t;const e=document.importNode(to.content,!0);if((t=this.shadowRoot)==null||t.appendChild(e),this.update(),!this.address||!this.name||this.modal)return;const o=document.createElement("walisto-modal");o.setAttribute("address",this.address),o.setAttribute("name",this.name),this.closeLabel&&(o.closeLabel=this.closeLabel),document.body.appendChild(o),this.modal=o,this.button.addEventListener("click",this.openModal)}disconnectedCallback(){this.button.removeEventListener("click",this.openModal)}openModal(){!this.modal||(this.modal.initialFocusRef=this.button,this.modal.open())}};st([q("button")],G.prototype,"button",2);st([T()],G.prototype,"label",2);st([T()],G.prototype,"name",2);st([T()],G.prototype,"address",2);st([T({name:"close-label"})],G.prototype,"closeLabel",2);G=st([mt("walisto-qr-button")],G);var bi=Object.defineProperty,yi=Object.getOwnPropertyDescriptor,nt=(t,e,o,i)=>{for(var r=i>1?void 0:i?yi(e,o):e,l=t.length-1,h;l>=0;l--)(h=t[l])&&(r=(i?h(e,o,r):h(r))||r);return i&&r&&bi(e,o,r),r};let J=(ce=class extends HTMLElement{constructor(){super(...arguments),pt(this,Ht),pt(this,Nt),pt(this,Ut),this.name="",this.address="",this.qrLabel="",this.copyLabel="",this.modalCloseLabel="",this.inContainer=!1}get template(){const t=document.createElement("template");return t.innerHTML=`
      <style>
        :host {
          --walisto-item-bg: #222;
          --walisto-font-color: #ddd;
          --walisto-button-font-color: var(--walisto-font-color);
          --walisto-button-bg: #555;
          --walisto-button-bg-hover: #777;
          --walisto-button-bg-active: #999;
          --walisto-outline-fv: 2px solid #07d;
          color: var(--walisto-font-color);
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          align-items: center;
          background: var(--walisto-item-bg);
          border-radius: 10px;
          line-height: 1.5rem;
        }

        div {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          align-items: center;
        }

        #term {
          font-weight: 700;
          margin: 0;
          padding: 0.5rem 1rem;
        }

        #definition {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          overflow: hidden;
          margin: 0;
          margin-left: 1rem;
        }

        #address {
          overflow: hidden;
          text-overflow: ellipsis;
          padding: 0.5rem 1rem;
          font-size: 0.875em;
          opacity: 0.7;
        }

        #buttons {
          margin-left: auto;
          padding: 0.5rem 1rem;
        }

        #buttons > walisto-copy-button {
          margin-right: 0.5rem;
        }
      </style>
      ${Ot(this,Ht,le).call(this,this.name)}
      ${Ot(this,Nt,de).call(this,Ot(this,Ut,he).call(this))}
    `,t}connectedCallback(){var t;this.attachShadow({mode:"open"}),this.inContainer=!!this.closest("dl"),this.setAttribute("role",this.inContainer?"presentation":"group");const e=document.importNode(this.template.content,!0);(t=this.shadowRoot)==null||t.appendChild(e)}},Ht=new WeakSet,le=function(t){return this.inContainer?`<dt part="term" id="term">${t}</dt>`:`<div part="term" id="term">${t}</div>`},Nt=new WeakSet,de=function(t){return this.inContainer?`<dd part="definition" id="definition">
        ${t}
      </dd>`:`<div part="definition" id="definition">
        ${t}
      </div>`},Ut=new WeakSet,he=function(){return`
      <span part="address" id="address">${this.address}</span>
      <div id="buttons" part="buttons">
        <walisto-copy-button
          exportparts="button"
          label="${this.copyLabel}"
          address="${this.address}"
        ></walisto-copy-button>
        <walisto-qr-button
          exportparts="button"
          address="${this.address}"
          label="${this.qrLabel}"
          name="${this.name}"
          close-label="${this.modalCloseLabel}"
        >
        </walisto-qr-button>
      </div>
    `},ce);nt([T()],J.prototype,"name",2);nt([T()],J.prototype,"address",2);nt([T({name:"qr-label"})],J.prototype,"qrLabel",2);nt([T({name:"copy-label"})],J.prototype,"copyLabel",2);nt([T({name:"modal-close-label"})],J.prototype,"modalCloseLabel",2);J=nt([mt("walisto-item")],J);const te=[["https://cdn.svgporn.com/logos/javascript.svg","JavaScript"],["https://cdn.svgporn.com/logos/typescript-icon.svg","TypeScript"],["https://cdn.svgporn.com/logos/clojure.svg","Clojure"],["/assets/abilities/cljs-white.svg","ClojureScript"],["https://cdn.svgporn.com/logos/python.svg","Python"],["https://cdn.svgporn.com/logos/docker.svg","Docker"],["/assets/abilities/nestjs.svg","NestJS"],["/assets/abilities/react.svg","React"],["/assets/abilities/svelte.svg","Svelte"]],Oe=te.map(t=>t[1]).join(", "),eo=document.createElement("template");eo.innerHTML=`
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
`;class wi extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.lang="en",this.index=0,this.interval=void 0}static get observedAttributes(){return["lang","index"]}get container(){return this.shadowRoot.querySelector("div")}get image(){return this.shadowRoot.querySelector("img")}updateImg(){this.image.setAttribute("src",te[this.index][0])}connectedCallback(){const e=eo.content.cloneNode(!0);this.shadowRoot.appendChild(e);const o=this.lang==="en"?`I have experience with: ${Oe}`:`Tengo experiencia con: ${Oe}`;this.container.setAttribute("aria-label",o),this.updateImg(),this.interval=setInterval(()=>{this.image.classList.remove("visible"),this.index===te.length-1?this.index=0:this.index+=1,setTimeout(()=>{this.updateImg(),this.image.classList.add("visible")},200)},2e3)}disconnectedCallback(){clearInterval(this.interval)}attributeChangedCallback(e,o,i){if(o!==i)switch(e){case"lang":this.lang=i;break;case"index":this.index=Number(i);break}}}customElements.define("my-abilities",wi);
