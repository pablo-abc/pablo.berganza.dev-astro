function B(){}function cn(n,t){for(const e in t)n[e]=t[e];return n}function M(n){return n()}function v(){return Object.create(null)}function p(n){n.forEach(M)}function z(n){return typeof n=="function"}function rn(n,t){return n!=n?t==t:n!==t||n&&typeof n=="object"||typeof n=="function"}let g;function ln(n,t){return g||(g=document.createElement("a")),g.href=t,n===g.href}function D(n){return Object.keys(n).length===0}function on(n){const t={};for(const e in n)e[0]!=="$"&&(t[e]=n[e]);return t}let w=!1;function F(){w=!0}function H(){w=!1}function I(n,t,e,o){for(;n<t;){const r=n+(t-n>>1);e(r)<=o?n=r+1:t=r}return n}function L(n){if(n.hydrate_init)return;n.hydrate_init=!0;let t=n.childNodes;if(n.nodeName==="HEAD"){const i=[];for(let l=0;l<t.length;l++){const s=t[l];s.claim_order!==void 0&&i.push(s)}t=i}const e=new Int32Array(t.length+1),o=new Int32Array(t.length);e[0]=-1;let r=0;for(let i=0;i<t.length;i++){const l=t[i].claim_order,s=(r>0&&t[e[r]].claim_order<=l?r+1:I(1,r,y=>t[e[y]].claim_order,l))-1;o[i]=e[s]+1;const f=s+1;e[f]=i,r=Math.max(f,r)}const a=[],c=[];let u=t.length-1;for(let i=e[r]+1;i!=0;i=o[i-1]){for(a.push(t[i-1]);u>=i;u--)c.push(t[u]);u--}for(;u>=0;u--)c.push(t[u]);a.reverse(),c.sort((i,l)=>i.claim_order-l.claim_order);for(let i=0,l=0;i<c.length;i++){for(;l<a.length&&c[i].claim_order>=a[l].claim_order;)l++;const s=l<a.length?a[l]:null;n.insertBefore(c[i],s)}}function P(n,t){if(w){for(L(n),(n.actual_end_child===void 0||n.actual_end_child!==null&&n.actual_end_child.parentElement!==n)&&(n.actual_end_child=n.firstChild);n.actual_end_child!==null&&n.actual_end_child.claim_order===void 0;)n.actual_end_child=n.actual_end_child.nextSibling;t!==n.actual_end_child?(t.claim_order!==void 0||t.parentNode!==n)&&n.insertBefore(t,n.actual_end_child):n.actual_end_child=t.nextSibling}else(t.parentNode!==n||t.nextSibling!==null)&&n.appendChild(t)}function un(n,t,e){w&&!e?P(n,t):(t.parentNode!==n||t.nextSibling!=e)&&n.insertBefore(t,e||null)}function W(n){n.parentNode.removeChild(n)}function G(n){return document.createElement(n)}function A(n){return document.createTextNode(n)}function an(){return A(" ")}function fn(){return A("")}function sn(n,t,e){e==null?n.removeAttribute(t):n.getAttribute(t)!==e&&n.setAttribute(t,e)}function J(n){return Array.from(n.childNodes)}function K(n){n.claim_info===void 0&&(n.claim_info={last_index:0,total_claimed:0})}function O(n,t,e,o,r=!1){K(n);const a=(()=>{for(let c=n.claim_info.last_index;c<n.length;c++){const u=n[c];if(t(u)){const i=e(u);return i===void 0?n.splice(c,1):n[c]=i,r||(n.claim_info.last_index=c),u}}for(let c=n.claim_info.last_index-1;c>=0;c--){const u=n[c];if(t(u)){const i=e(u);return i===void 0?n.splice(c,1):n[c]=i,r?i===void 0&&n.claim_info.last_index--:n.claim_info.last_index=c,u}}return o()})();return a.claim_order=n.claim_info.total_claimed,n.claim_info.total_claimed+=1,a}function Q(n,t,e,o){return O(n,r=>r.nodeName===t,r=>{const a=[];for(let c=0;c<r.attributes.length;c++){const u=r.attributes[c];e[u.name]||a.push(u.name)}a.forEach(c=>r.removeAttribute(c))},()=>o(t))}function dn(n,t,e){return Q(n,t,e,G)}function R(n,t){return O(n,e=>e.nodeType===3,e=>{const o=""+t;if(e.data.startsWith(o)){if(e.data.length!==o.length)return e.splitText(o.length)}else e.data=o},()=>A(t),!0)}function _n(n){return R(n," ")}let m;function h(n){m=n}function V(){if(!m)throw new Error("Function called outside component initialization");return m}function hn(n){V().$$.on_mount.push(n)}const _=[],C=[],$=[],q=[],X=Promise.resolve();let E=!1;function Y(){E||(E=!0,X.then(T))}function j(n){$.push(n)}const k=new Set;let x=0;function T(){const n=m;do{for(;x<_.length;){const t=_[x];x++,h(t),Z(t.$$)}for(h(null),_.length=0,x=0;C.length;)C.pop()();for(let t=0;t<$.length;t+=1){const e=$[t];k.has(e)||(k.add(e),e())}$.length=0}while(_.length);for(;q.length;)q.pop()();E=!1,k.clear(),h(n)}function Z(n){if(n.fragment!==null){n.update(),p(n.before_update);const t=n.dirty;n.dirty=[-1],n.fragment&&n.fragment.p(n.ctx,t),n.after_update.forEach(j)}}const b=new Set;let d;function mn(){d={r:0,c:[],p:d}}function pn(){d.r||p(d.c),d=d.p}function U(n,t){n&&n.i&&(b.delete(n),n.i(t))}function yn(n,t,e,o){if(n&&n.o){if(b.has(n))return;b.add(n),d.c.push(()=>{b.delete(n),o&&(e&&n.d(1),o())}),n.o(t)}}function gn(n,t){const e={},o={},r={$$scope:1};let a=n.length;for(;a--;){const c=n[a],u=t[a];if(u){for(const i in c)i in u||(o[i]=1);for(const i in u)r[i]||(e[i]=u[i],r[i]=1);n[a]=u}else for(const i in c)r[i]=1}for(const c in o)c in e||(e[c]=void 0);return e}function xn(n){return typeof n=="object"&&n!==null?n:{}}function $n(n){n&&n.c()}function bn(n,t){n&&n.l(t)}function nn(n,t,e,o){const{fragment:r,on_mount:a,on_destroy:c,after_update:u}=n.$$;r&&r.m(t,e),o||j(()=>{const i=a.map(M).filter(z);c?c.push(...i):p(i),n.$$.on_mount=[]}),u.forEach(j)}function tn(n,t){const e=n.$$;e.fragment!==null&&(p(e.on_destroy),e.fragment&&e.fragment.d(t),e.on_destroy=e.fragment=null,e.ctx=[])}function en(n,t){n.$$.dirty[0]===-1&&(_.push(n),Y(),n.$$.dirty.fill(0)),n.$$.dirty[t/31|0]|=1<<t%31}function wn(n,t,e,o,r,a,c,u=[-1]){const i=m;h(n);const l=n.$$={fragment:null,ctx:null,props:a,update:B,not_equal:r,bound:v(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(t.context||(i?i.$$.context:[])),callbacks:v(),dirty:u,skip_bound:!1,root:t.target||i.$$.root};c&&c(l.root);let s=!1;if(l.ctx=e?e(n,t.props||{},(f,y,...N)=>{const S=N.length?N[0]:y;return l.ctx&&r(l.ctx[f],l.ctx[f]=S)&&(!l.skip_bound&&l.bound[f]&&l.bound[f](S),s&&en(n,f)),y}):[],l.update(),s=!0,p(l.before_update),l.fragment=o?o(l.ctx):!1,t.target){if(t.hydrate){F();const f=J(t.target);l.fragment&&l.fragment.l(f),f.forEach(W)}else l.fragment&&l.fragment.c();t.intro&&U(n.$$.fragment),nn(n,t.target,t.anchor,t.customElement),H(),T()}h(i)}class kn{$destroy(){tn(this,1),this.$destroy=B}$on(t,e){const o=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return o.push(e),()=>{const r=o.indexOf(e);r!==-1&&o.splice(r,1)}}$set(t){this.$$set&&!D(t)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}export{A,R as B,kn as S,bn as a,un as b,$n as c,xn as d,fn as e,pn as f,gn as g,U as h,wn as i,W as j,tn as k,cn as l,nn as m,on as n,mn as o,G as p,dn as q,J as r,rn as s,yn as t,B as u,ln as v,sn as w,an as x,_n as y,hn as z};
