import{S as o,i as t,s as e,e as n,c as a,a as r,d as s,b as c,f as m,g as i,h as l,j as d,k as v,n as p,o as u,t as b,l as h}from"../../../svelte.internal.v3.41.0-ef9899f8.js";if("undefined"!=typeof document){const o=".visuallyhidden.svelte-ob38am{border:0;clip:rect(0 0 0 0);height:1px;margin:-1px;overflow:hidden;padding:0;position:absolute;width:1px}div.svelte-ob38am{border-top:2px solid var(--color-primary-1);padding-top:20px}div.svelte-ob38am .commento-submit-button{background:var(--color-secondary-2-3) !important;transition:color 0.1s}div.svelte-ob38am .commento-submit-button:hover{background:var(--color-secondary-2-1) !important}div.svelte-ob38am .commento-email-button{color:var(--color-secondary-2-3) !important;height:50px !important}div.svelte-ob38am .commento-login-link{color:var(--color-secondary-2-3) !important}div.svelte-ob38am .commento-login-box{background:#FFF7FB !important}div.svelte-ob38am *{font-family:'Overpass', 'Helvetica Neue', Verdana, Helvetica, Arial, sans-serif !important;color:var(--base-font-color) !important}div.svelte-ob38am .commento-button,div.svelte-ob38am .commento-avatar{color:#FFF2F8 !important}div.svelte-ob38am .commento-sort-policy-buttons-container .commento-sort-policy-buttons .commento-sort-policy-button-selected{color:var(--color-secondary-2-3) !important}div.svelte-ob38am .commento-option-button{background:#A18795 !important}div.svelte-ob38am .commento-upvoted,div.svelte-ob38am .commento-downvoted{background:var(--color-secondary-2-3) !important}div.svelte-ob38am .commento-option-remove{background:#e03131 !important}",t=document.createElement("style"),e=document.createTextNode(o);t.type="text/css",t.appendChild(e),document.head.appendChild(t)}function f(o){let t;return{c(){t=b("Comentario")},l(o){t=h(o,"Comentario")},m(o,e){i(o,t,e)},d(o){o&&s(t)}}}function g(o){let t;return{c(){t=b("Comment")},l(o){t=h(o,"Comment")},m(o,e){i(o,t,e)},d(o){o&&s(t)}}}function y(o){let t,e;return{c(){t=n("script"),this.h()},l(o){t=a(o,"SCRIPT",{src:!0}),r(t).forEach(s),this.h()},h(){c(t.src,e=o[0])||m(t,"src",e)},m(o,e){i(o,t,e)},p(o,n){1&n&&!c(t.src,e=o[0])&&m(t,"src",e)},d(o){o&&s(t)}}}function x(o){let t,e,c,u,b;function h(o,t){return"en"===o[1]?g:f}let x=h(o),k=x(o),F=o[2]&&y(o);return{c(){t=n("label"),k.c(),e=l(),c=n("div"),u=l(),F&&F.c(),b=d(),this.h()},l(o){t=a(o,"LABEL",{for:!0,class:!0});var n=r(t);k.l(n),n.forEach(s),e=v(o),c=a(o,"DIV",{id:!0,class:!0}),r(c).forEach(s),u=v(o),F&&F.l(o),b=d(),this.h()},h(){m(t,"for","commento-textarea-root"),m(t,"class","visuallyhidden svelte-ob38am"),m(c,"id","commento"),m(c,"class","svelte-ob38am")},m(o,n){i(o,t,n),k.m(t,null),i(o,e,n),i(o,c,n),i(o,u,n),F&&F.m(o,n),i(o,b,n)},p(o,[e]){x!==(x=h(o))&&(k.d(1),k=x(o),k&&(k.c(),k.m(t,null))),o[2]?F?F.p(o,e):(F=y(o),F.c(),F.m(b.parentNode,b)):F&&(F.d(1),F=null)},i:p,o:p,d(o){o&&s(t),k.d(),o&&s(e),o&&s(c),o&&s(u),F&&F.d(o),o&&s(b)}}}function k(o,t,e){let{src:n}=t,a=!1,{lang:r="en"}=t;return u((()=>{e(2,a=!0)})),o.$$set=o=>{"src"in o&&e(0,n=o.src),"lang"in o&&e(1,r=o.lang)},[n,r,a]}class F extends o{constructor(o){super(),t(this,o,k,x,e,{src:0,lang:1})}}export{F as default};
