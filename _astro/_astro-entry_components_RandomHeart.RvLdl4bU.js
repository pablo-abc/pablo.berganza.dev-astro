import{S as F,i as v,s as w,e as c,a as p,t as i,b as u,c as C,d as l,o as g,f as D,g as H,h as B,j as N,k as s,l as S,m as d,n as W}from"./index.dyl9NMoU.js";import{f as m}from"./index.Q8HUYPWv.js";/* empty css                                */function h(a){let t,e,o;return{c(){t=D("div"),this.h()},l(r){t=H(r,"DIV",{class:!0,style:!0}),B(t).forEach(l),this.h()},h(){N(t,"class","heart svelte-zv8cce"),s(t,"--background-color",a[0]),s(t,"--x",a[1].x+"px"),s(t,"--y",a[1].y+"px")},m(r,n){p(r,t,n),o=!0},p(r,n){a=r,(!o||n&1)&&s(t,"--background-color",a[0]),(!o||n&2)&&s(t,"--x",a[1].x+"px"),(!o||n&2)&&s(t,"--y",a[1].y+"px")},i(r){o||(r&&S(()=>{o&&(e||(e=d(t,m,{delay:a[2]},!0)),e.run(1))}),o=!0)},o(r){r&&(e||(e=d(t,m,{delay:a[2]},!1)),e.run(0)),o=!1},d(r){r&&l(t),r&&e&&e.end()}}}function j(a){let t,e=a[0]&&h(a);return{c(){e&&e.c(),t=c()},l(o){e&&e.l(o),t=c()},m(o,r){e&&e.m(o,r),p(o,t,r)},p(o,[r]){o[0]?e?(e.p(o,r),r&1&&i(e,1)):(e=h(o),e.c(),i(e,1),e.m(t.parentNode,t)):e&&(W(),u(e,1,1,()=>{e=null}),C())},i(o){i(e)},o(o){u(e)},d(o){o&&l(t),e&&e.d(o)}}}function q(a,t,e){const o=["#FF8DC7","#FFACC7","#FFDDD2","#FFB9B9"];let r=null,n={x:0,y:0},f=0;return g(()=>{const _=Math.floor(Math.random()*o.length),b=window.innerHeight,y=window.innerWidth,M=Math.floor(Math.random()*y),k=Math.floor(Math.random()*b);e(2,f=Math.floor(Math.random()*2e3)),e(1,n={x:M,y:k}),e(0,r=o[_])}),[r,n,f]}class E extends F{constructor(t){super(),v(this,t,q,j,w,{})}}export{E as default};
