/* empty css                                                      */function v(){}function R(e){return e()}function I(){return Object.create(null)}function C(e){e.forEach(R)}function G(e){return typeof e=="function"}function J(e,t){return e!=e?t==t:e!==t||e&&typeof e=="object"||typeof e=="function"}let g;function L(e,t){return g||(g=document.createElement("a")),g.href=t,e===g.href}function K(e){return Object.keys(e).length===0}let N=!1;function Q(){N=!0}function X(){N=!1}function Y(e,t,n,r){for(;e<t;){const c=e+(t-e>>1);n(c)<=r?e=c+1:t=c}return e}function Z(e){if(e.hydrate_init)return;e.hydrate_init=!0;let t=e.childNodes;if(e.nodeName==="HEAD"){const l=[];for(let i=0;i<t.length;i++){const u=t[i];u.claim_order!==void 0&&l.push(u)}t=l}const n=new Int32Array(t.length+1),r=new Int32Array(t.length);n[0]=-1;let c=0;for(let l=0;l<t.length;l++){const i=t[l].claim_order,u=(c>0&&t[n[c]].claim_order<=i?c+1:Y(1,c,x=>t[n[x]].claim_order,i))-1;r[l]=n[u]+1;const s=u+1;n[s]=l,c=Math.max(s,c)}const a=[],f=[];let o=t.length-1;for(let l=n[c]+1;l!=0;l=r[l-1]){for(a.push(t[l-1]);o>=l;o--)f.push(t[o]);o--}for(;o>=0;o--)f.push(t[o]);a.reverse(),f.sort((l,i)=>l.claim_order-i.claim_order);for(let l=0,i=0;l<f.length;l++){for(;i<a.length&&f[l].claim_order>=a[i].claim_order;)i++;const u=i<a.length?a[i]:null;e.insertBefore(f[l],u)}}function U(e,t){if(N){for(Z(e),(e.actual_end_child===void 0||e.actual_end_child!==null&&e.actual_end_child.parentElement!==e)&&(e.actual_end_child=e.firstChild);e.actual_end_child!==null&&e.actual_end_child.claim_order===void 0;)e.actual_end_child=e.actual_end_child.nextSibling;t!==e.actual_end_child?(t.claim_order!==void 0||t.parentNode!==e)&&e.insertBefore(t,e.actual_end_child):e.actual_end_child=t.nextSibling}else(t.parentNode!==e||t.nextSibling!==null)&&e.appendChild(t)}function d(e,t,n){N&&!n?U(e,t):(t.parentNode!==e||t.nextSibling!=n)&&e.insertBefore(t,n||null)}function _(e){e.parentNode.removeChild(e)}function E(e){return document.createElement(e)}function y(e){return document.createTextNode(e)}function O(){return y(" ")}function D(){return y("")}function m(e,t,n){n==null?e.removeAttribute(t):e.getAttribute(t)!==n&&e.setAttribute(t,n)}function w(e){return Array.from(e.childNodes)}function ee(e){e.claim_info===void 0&&(e.claim_info={last_index:0,total_claimed:0})}function V(e,t,n,r,c=!1){ee(e);const a=(()=>{for(let f=e.claim_info.last_index;f<e.length;f++){const o=e[f];if(t(o)){const l=n(o);return l===void 0?e.splice(f,1):e[f]=l,c||(e.claim_info.last_index=f),o}}for(let f=e.claim_info.last_index-1;f>=0;f--){const o=e[f];if(t(o)){const l=n(o);return l===void 0?e.splice(f,1):e[f]=l,c?l===void 0&&e.claim_info.last_index--:e.claim_info.last_index=f,o}}return r()})();return a.claim_order=e.claim_info.total_claimed,e.claim_info.total_claimed+=1,a}function te(e,t,n,r){return V(e,c=>c.nodeName===t,c=>{const a=[];for(let f=0;f<c.attributes.length;f++){const o=c.attributes[f];n[o.name]||a.push(o.name)}a.forEach(f=>c.removeAttribute(f))},()=>r(t))}function S(e,t,n){return te(e,t,n,E)}function M(e,t){return V(e,n=>n.nodeType===3,n=>{const r=""+t;if(n.data.startsWith(r)){if(n.data.length!==r.length)return n.splitText(r.length)}else n.data=r},()=>y(t),!0)}function P(e){return M(e," ")}let b;function p(e){b=e}function ne(){if(!b)throw new Error("Function called outside component initialization");return b}function ie(e){ne().$$.on_mount.push(e)}const h=[],z=[],$=[],F=[],le=Promise.resolve();let j=!1;function re(){j||(j=!0,le.then(W))}function B(e){$.push(e)}const A=new Set;let k=0;function W(){const e=b;do{for(;k<h.length;){const t=h[k];k++,p(t),ce(t.$$)}for(p(null),h.length=0,k=0;z.length;)z.pop()();for(let t=0;t<$.length;t+=1){const n=$[t];A.has(n)||(A.add(n),n())}$.length=0}while(h.length);for(;F.length;)F.pop()();j=!1,A.clear(),p(e)}function ce(e){if(e.fragment!==null){e.update(),C(e.before_update);const t=e.dirty;e.dirty=[-1],e.fragment&&e.fragment.p(e.ctx,t),e.after_update.forEach(B)}}const fe=new Set;function ue(e,t){e&&e.i&&(fe.delete(e),e.i(t))}function oe(e,t,n,r){const{fragment:c,on_mount:a,on_destroy:f,after_update:o}=e.$$;c&&c.m(t,n),r||B(()=>{const l=a.map(R).filter(G);f?f.push(...l):C(l),e.$$.on_mount=[]}),o.forEach(B)}function ae(e,t){const n=e.$$;n.fragment!==null&&(C(n.on_destroy),n.fragment&&n.fragment.d(t),n.on_destroy=n.fragment=null,n.ctx=[])}function se(e,t){e.$$.dirty[0]===-1&&(h.push(e),re(),e.$$.dirty.fill(0)),e.$$.dirty[t/31|0]|=1<<t%31}function _e(e,t,n,r,c,a,f,o=[-1]){const l=b;p(e);const i=e.$$={fragment:null,ctx:null,props:a,update:v,not_equal:c,bound:I(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(t.context||(l?l.$$.context:[])),callbacks:I(),dirty:o,skip_bound:!1,root:t.target||l.$$.root};f&&f(i.root);let u=!1;if(i.ctx=n?n(e,t.props||{},(s,x,...T)=>{const q=T.length?T[0]:x;return i.ctx&&c(i.ctx[s],i.ctx[s]=q)&&(!i.skip_bound&&i.bound[s]&&i.bound[s](q),u&&se(e,s)),x}):[],i.update(),u=!0,C(i.before_update),i.fragment=r?r(i.ctx):!1,t.target){if(t.hydrate){Q();const s=w(t.target);i.fragment&&i.fragment.l(s),s.forEach(_)}else i.fragment&&i.fragment.c();t.intro&&ue(e.$$.fragment),oe(e,t.target,t.anchor,t.customElement),X(),W()}p(l)}class de{$destroy(){ae(this,1),this.$destroy=v}$on(t,n){const r=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return r.push(n),()=>{const c=r.indexOf(n);c!==-1&&r.splice(c,1)}}$set(t){this.$$set&&!K(t)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}function me(e){let t;return{c(){t=y("Comentario")},l(n){t=M(n,"Comentario")},m(n,r){d(n,t,r)},d(n){n&&_(t)}}}function he(e){let t;return{c(){t=y("Comment")},l(n){t=M(n,"Comment")},m(n,r){d(n,t,r)},d(n){n&&_(t)}}}function H(e){let t,n;return{c(){t=E("script"),this.h()},l(r){t=S(r,"SCRIPT",{src:!0});var c=w(t);c.forEach(_),this.h()},h(){L(t.src,n=e[0])||m(t,"src",n)},m(r,c){d(r,t,c)},p(r,c){c&1&&!L(t.src,n=r[0])&&m(t,"src",n)},d(r){r&&_(t)}}}function pe(e){let t,n,r,c,a;function f(u,s){return u[1]==="en"?he:me}let o=f(e),l=o(e),i=e[2]&&H(e);return{c(){t=E("label"),l.c(),n=O(),r=E("div"),c=O(),i&&i.c(),a=D(),this.h()},l(u){t=S(u,"LABEL",{for:!0,class:!0});var s=w(t);l.l(s),s.forEach(_),n=P(u),r=S(u,"DIV",{id:!0,class:!0}),w(r).forEach(_),c=P(u),i&&i.l(u),a=D(),this.h()},h(){m(t,"for","commento-textarea-root"),m(t,"class","visuallyhidden svelte-ob38am"),m(r,"id","commento"),m(r,"class","svelte-ob38am")},m(u,s){d(u,t,s),l.m(t,null),d(u,n,s),d(u,r,s),d(u,c,s),i&&i.m(u,s),d(u,a,s)},p(u,[s]){o!==(o=f(u))&&(l.d(1),l=o(u),l&&(l.c(),l.m(t,null))),u[2]?i?i.p(u,s):(i=H(u),i.c(),i.m(a.parentNode,a)):i&&(i.d(1),i=null)},i:v,o:v,d(u){u&&_(t),l.d(),u&&_(n),u&&_(r),u&&_(c),i&&i.d(u),u&&_(a)}}}function be(e,t,n){let{src:r}=t,c=!1,{lang:a="en"}=t;return ie(()=>{n(2,c=!0)}),e.$$set=f=>{"src"in f&&n(0,r=f.src),"lang"in f&&n(1,a=f.lang)},[r,a,c]}class xe extends de{constructor(t){super(),_e(this,t,be,pe,J,{src:0,lang:1})}}export{xe as default};
