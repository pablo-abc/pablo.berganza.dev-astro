import{S as I,i as L,s as w,e as b,c as v,a as p,d as a,h,b as _,f as m,r as k,u as y,v as C,q,o as x,w as E,x as S}from"./vendor.ed539acb.js";/* empty css                                               */function A(n){let e;return{c(){e=E("Comentario")},l(l){e=S(l,"Comentario")},m(l,s){m(l,e,s)},d(l){l&&a(e)}}}function B(n){let e;return{c(){e=E("Comment")},l(l){e=S(l,"Comment")},m(l,s){m(l,e,s)},d(l){l&&a(e)}}}function j(n){let e,l;return{c(){e=b("script"),this.h()},l(s){e=v(s,"SCRIPT",{src:!0});var r=p(e);r.forEach(a),this.h()},h(){h(e.src,l=n[0])||_(e,"src",l)},m(s,r){m(s,e,r)},p(s,r){r&1&&!h(e.src,l=s[0])&&_(e,"src",l)},d(s){s&&a(e)}}}function D(n){let e,l,s,r,f;function u(t,c){return t[1]==="en"?B:A}let d=u(n),o=d(n),i=n[2]&&j(n);return{c(){e=b("label"),o.c(),l=k(),s=b("div"),r=k(),i&&i.c(),f=y(),this.h()},l(t){e=v(t,"LABEL",{for:!0,class:!0});var c=p(e);o.l(c),c.forEach(a),l=C(t),s=v(t,"DIV",{id:!0,class:!0}),p(s).forEach(a),r=C(t),i&&i.l(t),f=y(),this.h()},h(){_(e,"for","commento-textarea-root"),_(e,"class","visuallyhidden svelte-1vnibeq"),_(s,"id","commento"),_(s,"class","svelte-1vnibeq")},m(t,c){m(t,e,c),o.m(e,null),m(t,l,c),m(t,s,c),m(t,r,c),i&&i.m(t,c),m(t,f,c)},p(t,[c]){d!==(d=u(t))&&(o.d(1),o=d(t),o&&(o.c(),o.m(e,null))),t[2]?i?i.p(t,c):(i=j(t),i.c(),i.m(f.parentNode,f)):i&&(i.d(1),i=null)},i:q,o:q,d(t){t&&a(e),o.d(),t&&a(l),t&&a(s),t&&a(r),i&&i.d(t),t&&a(f)}}}function M(n,e,l){let{src:s}=e,r=!1,{lang:f="en"}=e;return x(()=>{l(2,r=!0)}),n.$$set=u=>{"src"in u&&l(0,s=u.src),"lang"in u&&l(1,f=u.lang)},[s,f,r]}class R extends I{constructor(e){super();L(this,e,M,D,w,{src:0,lang:1})}}export{R as default};
