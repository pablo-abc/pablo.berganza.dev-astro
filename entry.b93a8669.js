import{S as b,i as k,s as y,c as d,e as l,a as S,m as h,b as m,g as T,d as j,t as $,f as q,h as g,j as f,k as w,l as u,n as v,o as A,p as C,q as E,r as M,u as N}from"./chunks/chunk.cea3f265.js";function R(a){let e;return{c(){e=C("astro-fragment")},l(t){e=E(t,"ASTRO-FRAGMENT",{});var n=M(e);n.forEach(f)},m(t,n){m(t,e,n),e.innerHTML=a[1]},p:N,d(t){t&&f(e)}}}function F(a){let e,t=a[1]!=null&&R(a);return{c(){t&&t.c(),e=l()},l(n){t&&t.l(n),e=l()},m(n,r){t&&t.m(n,r),m(n,e,r)},p(n,r){n[1]!=null&&t.p(n,r)},d(n){t&&t.d(n),n&&f(e)}}}function G(a){let e,t,n;const r=[a[2]];var i=a[0];function _(s){let o={$$slots:{default:[F]},$$scope:{ctx:s}};for(let c=0;c<r.length;c+=1)o=u(o,r[c]);return{props:o}}return i&&(e=new i(_(a))),{c(){e&&d(e.$$.fragment),t=l()},l(s){e&&S(e.$$.fragment,s),t=l()},m(s,o){e&&h(e,s,o),m(s,t,o),n=!0},p(s,[o]){const c=o&4?T(r,[j(s[2])]):{};if(o&16&&(c.$$scope={dirty:o,ctx:s}),i!==(i=s[0])){if(e){A();const p=e;$(p.$$.fragment,1,0,()=>{w(p,1)}),q()}i?(e=new i(_(s)),d(e.$$.fragment),g(e.$$.fragment,1),h(e,t.parentNode,t)):e=null}else i&&e.$set(c)},i(s){n||(e&&g(e.$$.fragment,s),n=!0)},o(s){e&&$(e.$$.fragment,s),n=!1},d(s){s&&f(t),e&&w(e,s)}}}function H(a,e,t){const{__astro_component:n,__astro_children:r,...i}=e;return a.$$set=_=>{t(3,e=u(u({},e),v(_)))},e=v(e),[n,r,i]}class L extends b{constructor(e){super(),k(this,e,H,G,y,{})}}var W=a=>(e,t,n)=>{delete t.class;try{new L({target:a,props:{__astro_component:e,__astro_children:n,...t},hydrate:!0})}catch{}};export{W as default};
