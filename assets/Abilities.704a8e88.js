import{S as y,i as S,s as g,e as p,c as v,a as I,d as c,b as n,f as d,t as h,g as w,h as _,j as q,k as f,l as m,o as C,m as D,n as b,p as A,q as J}from"./vendor.ed539acb.js";/* empty css                                                */function j(i){let s,r,a,t;return{c(){s=p("img"),this.h()},l(e){s=v(e,"IMG",{"aria-hidden":!0,src:!0,alt:!0,class:!0}),this.h()},h(){n(s,"aria-hidden","true"),_(s.src,r=i[1][i[0]][0])||n(s,"src",r),n(s,"alt",""),n(s,"class","svelte-1eslmow")},m(e,l){d(e,s,l),t=!0},p(e,l){(!t||l&1&&!_(s.src,r=e[1][e[0]][0]))&&n(s,"src",r)},i(e){t||(q(()=>{a||(a=f(s,b,{},!0)),a.run(1)}),t=!0)},o(e){a||(a=f(s,b,{},!1)),a.run(0),t=!1},d(e){e&&c(s),e&&a&&a.end()}}}function M(i){let s,r=i[0],a,t=j(i);return{c(){s=p("div"),t.c(),this.h()},l(e){s=v(e,"DIV",{"aria-label":!0,class:!0});var l=I(s);t.l(l),l.forEach(c),this.h()},h(){n(s,"aria-label",i[2]),n(s,"class","svelte-1eslmow")},m(e,l){d(e,s,l),t.m(s,null),a=!0},p(e,[l]){l&1&&g(r,r=e[0])?(A(),h(t,1,1,J),w(),t=j(e),t.c(),m(t),t.m(s,null)):t.p(e,l)},i(e){a||(m(t),a=!0)},o(e){h(t),a=!1},d(e){e&&c(s),t.d(e)}}}function T(i,s,r){let{lang:a="en"}=s;const t=[["https://cdn.svgporn.com/logos/javascript.svg","JavaScript"],["https://cdn.svgporn.com/logos/typescript-icon.svg","TypeScript"],["https://cdn.svgporn.com/logos/clojure.svg","Clojure"],["/assets/abilities/cljs-white.svg","ClojureScript"],["https://cdn.svgporn.com/logos/python.svg","Python"],["https://cdn.svgporn.com/logos/docker.svg","Docker"],["/assets/abilities/nestjs.svg","NestJS"],["/assets/abilities/react.svg","React"],["/assets/abilities/svelte.svg","Svelte"]];let e=0,l;C(()=>{l=setInterval(()=>{e===t.length-1?r(0,e=0):r(0,e+=1)},2e3)}),D(()=>clearInterval(l));const u=t.map(o=>o[1]).join(", ");let k=a==="en"?`I have experience with: ${u}`:`Tengo experiencia con: ${u}`;return i.$$set=o=>{"lang"in o&&r(3,a=o.lang)},[e,t,k,a]}class N extends y{constructor(s){super();S(this,s,T,M,g,{lang:3})}}export{N as default};