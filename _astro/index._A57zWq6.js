function v(){}function D(t,n){for(const e in n)t[e]=n[e];return t}function O(t){return t()}function C(){return Object.create(null)}function $(t){t.forEach(O)}function q(t){return typeof t=="function"}function ot(t,n){return t!=t?n==n:t!==n||t&&typeof t=="object"||typeof t=="function"}let g;function at(t,n){return t===n?!0:(g||(g=document.createElement("a")),g.href=n,t===g.href)}function F(t){return Object.keys(t).length===0}function st(t,n,e,i){if(t){const r=I(t,n,e,i);return t[0](r)}}function I(t,n,e,i){return t[1]&&i?D(e.ctx.slice(),t[1](i(n))):e.ctx}function _t(t,n,e,i){if(t[2]&&i){const r=t[2](i(e));if(n.dirty===void 0)return r;if(typeof r=="object"){const o=[],l=Math.max(n.dirty.length,r.length);for(let f=0;f<l;f+=1)o[f]=n.dirty[f]|r[f];return o}return n.dirty|r}return n.dirty}function dt(t,n,e,i,r,o){if(r){const l=I(n,e,i,o);t.p(l,r)}}function ht(t){if(t.ctx.length>32){const n=[],e=t.ctx.length/32;for(let i=0;i<e;i++)n[i]=-1;return n}return-1}function mt(t){const n={};for(const e in t)e[0]!=="$"&&(n[e]=t[e]);return n}function pt(t){return t??""}let w=!1;function H(){w=!0}function P(){w=!1}function G(t,n,e,i){for(;t<n;){const r=t+(n-t>>1);e(r)<=i?t=r+1:n=r}return t}function L(t){if(t.hydrate_init)return;t.hydrate_init=!0;let n=t.childNodes;if(t.nodeName==="HEAD"){const c=[];for(let u=0;u<n.length;u++){const s=n[u];s.claim_order!==void 0&&c.push(s)}n=c}const e=new Int32Array(n.length+1),i=new Int32Array(n.length);e[0]=-1;let r=0;for(let c=0;c<n.length;c++){const u=n[c].claim_order,s=(r>0&&n[e[r]].claim_order<=u?r+1:G(1,r,y=>n[e[y]].claim_order,u))-1;i[c]=e[s]+1;const a=s+1;e[a]=c,r=Math.max(a,r)}const o=[],l=[];let f=n.length-1;for(let c=e[r]+1;c!=0;c=i[c-1]){for(o.push(n[c-1]);f>=c;f--)l.push(n[f]);f--}for(;f>=0;f--)l.push(n[f]);o.reverse(),l.sort((c,u)=>c.claim_order-u.claim_order);for(let c=0,u=0;c<l.length;c++){for(;u<o.length&&l[c].claim_order>=o[u].claim_order;)u++;const s=u<o.length?o[u]:null;t.insertBefore(l[c],s)}}function R(t,n){if(w){for(L(t),(t.actual_end_child===void 0||t.actual_end_child!==null&&t.actual_end_child.parentNode!==t)&&(t.actual_end_child=t.firstChild);t.actual_end_child!==null&&t.actual_end_child.claim_order===void 0;)t.actual_end_child=t.actual_end_child.nextSibling;n!==t.actual_end_child?(n.claim_order!==void 0||n.parentNode!==t)&&t.insertBefore(n,t.actual_end_child):t.actual_end_child=n.nextSibling}else(n.parentNode!==t||n.nextSibling!==null)&&t.appendChild(n)}function yt(t,n,e){w&&!e?R(t,n):(n.parentNode!==t||n.nextSibling!=e)&&t.insertBefore(n,e||null)}function U(t){t.parentNode&&t.parentNode.removeChild(t)}function V(t){return document.createElement(t)}function W(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}function S(t){return document.createTextNode(t)}function gt(){return S(" ")}function xt(){return S("")}function J(t,n,e){e==null?t.removeAttribute(n):t.getAttribute(n)!==e&&t.setAttribute(n,e)}function $t(t,n,e){n in t?t[n]=typeof t[n]=="boolean"&&e===""?!0:e:J(t,n,e)}function K(t){return Array.from(t.childNodes)}function Q(t){t.claim_info===void 0&&(t.claim_info={last_index:0,total_claimed:0})}function M(t,n,e,i,r=!1){Q(t);const o=(()=>{for(let l=t.claim_info.last_index;l<t.length;l++){const f=t[l];if(n(f)){const c=e(f);return c===void 0?t.splice(l,1):t[l]=c,r||(t.claim_info.last_index=l),f}}for(let l=t.claim_info.last_index-1;l>=0;l--){const f=t[l];if(n(f)){const c=e(f);return c===void 0?t.splice(l,1):t[l]=c,r?c===void 0&&t.claim_info.last_index--:t.claim_info.last_index=l,f}}return i()})();return o.claim_order=t.claim_info.total_claimed,t.claim_info.total_claimed+=1,o}function T(t,n,e,i){return M(t,r=>r.nodeName===n,r=>{const o=[];for(let l=0;l<r.attributes.length;l++){const f=r.attributes[l];e[f.name]||o.push(f.name)}o.forEach(l=>r.removeAttribute(l))},()=>i(n))}function wt(t,n,e){return T(t,n,e,V)}function bt(t,n,e){return T(t,n,e,W)}function X(t,n){return M(t,e=>e.nodeType===3,e=>{const i=""+n;if(e.data.startsWith(i)){if(e.data.length!==i.length)return e.splitText(i.length)}else e.data=i},()=>S(n),!0)}function vt(t){return X(t," ")}function Et(t,n){n=""+n,t.data!==n&&(t.data=n)}let p;function m(t){p=t}function Y(){if(!p)throw new Error("Function called outside component initialization");return p}function Nt(t){Y().$$.on_mount.push(t)}const d=[],k=[];let h=[];const B=[],Z=Promise.resolve();let E=!1;function tt(){E||(E=!0,Z.then(z))}function N(t){h.push(t)}const b=new Set;let _=0;function z(){if(_!==0)return;const t=p;do{try{for(;_<d.length;){const n=d[_];_++,m(n),nt(n.$$)}}catch(n){throw d.length=0,_=0,n}for(m(null),d.length=0,_=0;k.length;)k.pop()();for(let n=0;n<h.length;n+=1){const e=h[n];b.has(e)||(b.add(e),e())}h.length=0}while(d.length);for(;B.length;)B.pop()();E=!1,b.clear(),m(t)}function nt(t){if(t.fragment!==null){t.update(),$(t.before_update);const n=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,n),t.after_update.forEach(N)}}function et(t){const n=[],e=[];h.forEach(i=>t.indexOf(i)===-1?n.push(i):e.push(i)),e.forEach(i=>i()),h=n}const x=new Set;let it;function rt(t,n){t&&t.i&&(x.delete(t),t.i(n))}function St(t,n,e,i){if(t&&t.o){if(x.has(t))return;x.add(t),it.c.push(()=>{x.delete(t),i&&(e&&t.d(1),i())}),t.o(n)}else i&&i()}function At(t){t&&t.c()}function jt(t,n){t&&t.l(n)}function lt(t,n,e){const{fragment:i,after_update:r}=t.$$;i&&i.m(n,e),N(()=>{const o=t.$$.on_mount.map(O).filter(q);t.$$.on_destroy?t.$$.on_destroy.push(...o):$(o),t.$$.on_mount=[]}),r.forEach(N)}function ct(t,n){const e=t.$$;e.fragment!==null&&(et(e.after_update),$(e.on_destroy),e.fragment&&e.fragment.d(n),e.on_destroy=e.fragment=null,e.ctx=[])}function ut(t,n){t.$$.dirty[0]===-1&&(d.push(t),tt(),t.$$.dirty.fill(0)),t.$$.dirty[n/31|0]|=1<<n%31}function Ct(t,n,e,i,r,o,l=null,f=[-1]){const c=p;m(t);const u=t.$$={fragment:null,ctx:[],props:o,update:v,not_equal:r,bound:C(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(n.context||(c?c.$$.context:[])),callbacks:C(),dirty:f,skip_bound:!1,root:n.target||c.$$.root};l&&l(u.root);let s=!1;if(u.ctx=e?e(t,n.props||{},(a,y,...A)=>{const j=A.length?A[0]:y;return u.ctx&&r(u.ctx[a],u.ctx[a]=j)&&(!u.skip_bound&&u.bound[a]&&u.bound[a](j),s&&ut(t,a)),y}):[],u.update(),s=!0,$(u.before_update),u.fragment=i?i(u.ctx):!1,n.target){if(n.hydrate){H();const a=K(n.target);u.fragment&&u.fragment.l(a),a.forEach(U)}else u.fragment&&u.fragment.c();n.intro&&rt(t.$$.fragment),lt(t,n.target,n.anchor),P(),z()}m(c)}class kt{$$=void 0;$$set=void 0;$destroy(){ct(this,1),this.$destroy=v}$on(n,e){if(!q(e))return v;const i=this.$$.callbacks[n]||(this.$$.callbacks[n]=[]);return i.push(e),()=>{const r=i.indexOf(e);r!==-1&&i.splice(r,1)}}$set(n){this.$$set&&!F(n)&&(this.$$.skip_bound=!0,this.$$set(n),this.$$.skip_bound=!1)}}const ft="4";typeof window<"u"&&(window.__svelte||(window.__svelte={v:new Set})).v.add(ft);export{At as A,jt as B,$t as C,lt as D,ct as E,xt as F,Nt as G,at as H,kt as S,W as a,K as b,bt as c,U as d,J as e,yt as f,R as g,v as h,Ct as i,D as j,mt as k,st as l,V as m,pt as n,gt as o,wt as p,vt as q,X as r,ot as s,S as t,dt as u,ht as v,_t as w,Et as x,rt as y,St as z};