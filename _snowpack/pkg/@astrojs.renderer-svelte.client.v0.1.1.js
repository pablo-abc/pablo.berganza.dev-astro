import{S as t,a as s,s as a,r as e,u as n,v as r,w as o,g as c,x as $,y as f,t as l,h as m,m as p,d as u,z as i,A as d,B as _,p as g,e as h,c as v,b as x,q as w}from"../../svelte.internal.v3.41.0-8317a06f.js";function y(t){let s,a=t[1]&&function(t){let s;return{c(){s=h("astro-fragment")},l(t){s=v(t,"ASTRO-FRAGMENT",{}),x(s).forEach(u)},m(a,e){c(a,s,e),s.innerHTML=t[1]},p:w,d(t){t&&u(s)}}}(t);return{c(){a&&a.c(),s=n()},l(t){a&&a.l(t),s=n()},m(t,e){a&&a.m(t,e),c(t,s,e)},p(t,s){t[1]&&a.p(t,s)},d(t){a&&a.d(t),t&&u(s)}}}function A(t){let s,a,_;const h=[t[2]];var v=t[0];function x(t){let s={$$slots:{default:[y]},$$scope:{ctx:t}};for(let t=0;t<h.length;t+=1)s=d(s,h[t]);return{props:s}}return v&&(s=new v(x(t))),{c(){s&&e(s.$$.fragment),a=n()},l(t){s&&r(s.$$.fragment,t),a=n()},m(t,e){s&&o(s,t,e),c(t,a,e),_=!0},p(t,[n]){const r=4&n?$(h,[f(t[2])]):{};if(16&n&&(r.$$scope={dirty:n,ctx:t}),v!==(v=t[0])){if(s){g();const t=s;l(t.$$.fragment,1,0,(()=>{i(t,1)})),m()}v?(s=new v(x(t)),e(s.$$.fragment),p(s.$$.fragment,1),o(s,a.parentNode,a)):s=null}else v&&s.$set(r)},i(t){_||(s&&p(s.$$.fragment,t),_=!0)},o(t){s&&l(s.$$.fragment,t),_=!1},d(t){t&&u(a),s&&i(s,t)}}}function T(t,s,a){const{__astro_component:e,__astro_children:n,...r}=s;return t.$$set=t=>{a(3,s=d(d({},s),_(t)))},s=_(s),[e,n,r]}class E extends t{constructor(t){super(),s(this,t,T,A,a,{})}}var M=t=>(s,a,e)=>{try{new E({target:t,props:{__astro_component:s,__astro_children:e,...a},hydrate:!0})}catch(t){}};export{M as default};