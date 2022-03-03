const C=`
    .code-container {
      position: relative;
      margin: 8px auto;
      width: 95%;
    }

    .code-container__copy-button {
      opacity: 0.5;
      padding-left: 0.5rem;
      padding-right: 0.3rem;
      padding-top: 0.6rem;
      padding-bottom: 0.1rem;
      border-radius: 10px;
      color: var(--foreground);
      font-size: 1rem;
      position: absolute;
      top: 0.2rem;
      right: 0.2rem;
    }

    .code-container__copy-button--copied {
      color: var(--color-complement-3);
    }

    .code-container__copy-button--failed {
      color: var(--color-secondary-1-2);
    }

    .code-container__copy-button svg {
      height: 1.5rem;
    }

    .code-container__copy-button:focus-visible {
      opacity: 1;
    }

    .code-container__copy-button:hover, .code-container__copy-button:focus-visible {
      opacity: 1;
      background: hsl(231,15%,28%);
      cursor: pointer;
    }
    .code-container__copy-button:active {
      background: hsl(231,15%,38%);
    }
`,w={en:{tooltip:{idle:"Copy to clipboard",success:"Copied!",failed:"Failed to copy"}},es:{tooltip:{idle:"Copiar al portapapeles",success:"\xA1Copiado!",failed:"Error al copiar"}}};function x(){const h=document.documentElement.lang,i=w[h],m=document.querySelectorAll("pre"),l=document.createElement("style");l.type="text/css",l.textContent=C,document.head.appendChild(l);const p=`
<svg aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path>
</svg>`,y=`
<svg aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path>
</svg>`,g=`
<svg aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
</svg>`;let v=0;for(const c of m){let s=function(){const _=e.getBoundingClientRect(),u=t.getBoundingClientRect();e.style.left=`${u.left-_.width-8}px`,e.style.top=`${u.top+u.height/2}px`,e.style.transform="translateY(-50%)"},d=function(){e.style.visibility="visible",n&&clearInterval(n),s(),n=setInterval(s,10)},a=function(){e.style.visibility="hidden",!!n&&(clearInterval(n),n=null)};var E=s,L=d,k=a;const b=c.textContent,f=c.parentNode,r=document.createElement("div");r.className="code-container",f.insertBefore(r,c),r.appendChild(c),c.tabIndex=0;const t=document.createElement("button");r.appendChild(t);const o=document.createElement("span");t.appendChild(o);const e=document.createElement("div");t.appendChild(e),e.id=`tooltip-copy-${v}`,e.className="button-tooltip",e.setAttribute("aria-hidden",!0),e.style.visibility="hidden",e.style.position="fixed",e.textContent=i.tooltip.idle,o.innerHTML=p,t.className="code-container__copy-button",t.setAttribute("aria-labelledby",e.id),t.addEventListener("click",async()=>{try{await navigator.clipboard.writeText(b).then(()=>{o.innerHTML=y,e.textContent=i.tooltip.success,t.classList.add("code-container__copy-button--copied"),setTimeout(()=>{o.innerHTML=p,t.classList.remove("code-container__copy-button--copied"),e.textContent=i.tooltip.idle},500)})}catch{o.innerHTML=g,e.textContent=i.tooltip.failed,t.classList.add("code-container__copy-button--failed"),setTimeout(()=>{o.innerHTML=p,t.classList.remove("code-container__copy-button--failed"),e.textContent=i.tooltip.idle},500)}}),s();let n=null;t.addEventListener("mouseenter",d),t.addEventListener("focusin",()=>{!t.classList.contains("focus-visible")||d()}),t.addEventListener("mouseleave",a),t.addEventListener("focusout",a),t.addEventListener("touchstart",()=>{t.style.opacity="1",d()}),t.addEventListener("touchend",()=>{setTimeout(()=>{t.style.opacity="",a()},700)}),document.addEventListener("visibilitychange",a),v+=1}}x();
