import{S as A,i as B,s as I,p as b,q as p,r as v,j as a,v as h,w as _,b as u,x as y,e as k,y as C,u as E,z as L,A as x,B as S}from"./chunks/chunk.cea3f265.js";function j(n){let e;return{c(){e=x("Comentario")},l(l){e=S(l,"Comentario")},m(l,s){u(l,e,s)},d(l){l&&a(e)}}}function w(n){let e;return{c(){e=x("Comment")},l(l){e=S(l,"Comment")},m(l,s){u(l,e,s)},d(l){l&&a(e)}}}function q(n){let e,l;return{c(){e=b("script"),this.h()},l(s){e=p(s,"SCRIPT",{src:!0});var r=v(e);r.forEach(a),this.h()},h(){h(e.src,l=n[0])||_(e,"src",l)},m(s,r){u(s,e,r)},p(s,r){r&1&&!h(e.src,l=s[0])&&_(e,"src",l)},d(s){s&&a(e)}}}function z(n){let e,l,s,r,f;function m(t,c){return t[1]==="en"?w:j}let d=m(n),o=d(n),i=n[2]&&q(n);return{c(){e=b("label"),o.c(),l=y(),s=b("div"),r=y(),i&&i.c(),f=k(),this.h()},l(t){e=p(t,"LABEL",{for:!0,class:!0});var c=v(e);o.l(c),c.forEach(a),l=C(t),s=p(t,"DIV",{id:!0,class:!0}),v(s).forEach(a),r=C(t),i&&i.l(t),f=k(),this.h()},h(){_(e,"for","commento-textarea-root"),_(e,"class","visuallyhidden svelte-1btpdxe"),_(s,"id","commento"),_(s,"class","svelte-1btpdxe")},m(t,c){u(t,e,c),o.m(e,null),u(t,l,c),u(t,s,c),u(t,r,c),i&&i.m(t,c),u(t,f,c)},p(t,[c]){d!==(d=m(t))&&(o.d(1),o=d(t),o&&(o.c(),o.m(e,null))),t[2]?i?i.p(t,c):(i=q(t),i.c(),i.m(f.parentNode,f)):i&&(i.d(1),i=null)},i:E,o:E,d(t){t&&a(e),o.d(),t&&a(l),t&&a(s),t&&a(r),i&&i.d(t),t&&a(f)}}}function D(n,e,l){let{src:s}=e,r=!1,{lang:f="en"}=e;return L(()=>{l(2,r=!0)}),n.$$set=m=>{"src"in m&&l(0,s=m.src),"lang"in m&&l(1,f=m.lang)},[s,f,r]}class N extends A{constructor(e){super(),B(this,e,D,z,I,{src:0,lang:1})}}export{N as default};
