var app=function(){"use strict";function e(){}const t=e=>e;function i(e){return e()}function n(){return Object.create(null)}function a(e){e.forEach(i)}function l(e){return"function"==typeof e}function r(e,t){return e!=e?t==t:e!==t||e&&"object"==typeof e||"function"==typeof e}let s;const c="undefined"!=typeof window;let o=c?()=>window.performance.now():()=>Date.now(),d=c?e=>requestAnimationFrame(e):e;const u=new Set;function h(e){u.forEach((t=>{t.c(e)||(u.delete(t),t.f())})),0!==u.size&&d(h)}function m(e,t){e.appendChild(t)}function v(e){if(!e)return document;const t=e.getRootNode?e.getRootNode():e.ownerDocument;return t&&t.host?t:e.ownerDocument}function f(e){const t=w("style");return function(e,t){m(e.head||e,t),t.sheet}(v(e),t),t.sheet}function p(e,t,i){e.insertBefore(t,i||null)}function g(e){e.parentNode&&e.parentNode.removeChild(e)}function w(e){return document.createElement(e)}function b(e){return document.createElementNS("http://www.w3.org/2000/svg",e)}function $(e){return document.createTextNode(e)}function x(){return $(" ")}function y(){return $("")}function H(e,t,i,n){return e.addEventListener(t,i,n),()=>e.removeEventListener(t,i,n)}function z(e,t,i){null==i?e.removeAttribute(t):e.getAttribute(t)!==i&&e.setAttribute(t,i)}function L(e,t){t=""+t,e.wholeText!==t&&(e.data=t)}const B=new Map;let C,A=0;function M(e,t,i,n,a,l,r,s=0){const c=16.666/n;let o="{\n";for(let e=0;e<=1;e+=c){const n=t+(i-t)*l(e);o+=100*e+`%{${r(n,1-n)}}\n`}const d=o+`100% {${r(i,1-i)}}\n}`,u=`__svelte_${function(e){let t=5381,i=e.length;for(;i--;)t=(t<<5)-t^e.charCodeAt(i);return t>>>0}(d)}_${s}`,h=v(e),{stylesheet:m,rules:p}=B.get(h)||function(e,t){const i={stylesheet:f(t),rules:{}};return B.set(e,i),i}(h,e);p[u]||(p[u]=!0,m.insertRule(`@keyframes ${u} ${d}`,m.cssRules.length));const g=e.style.animation||"";return e.style.animation=`${g?`${g}, `:""}${u} ${n}ms linear ${a}ms 1 both`,A+=1,u}function k(e,t){const i=(e.style.animation||"").split(", "),n=i.filter(t?e=>e.indexOf(t)<0:e=>-1===e.indexOf("__svelte")),a=i.length-n.length;a&&(e.style.animation=n.join(", "),A-=a,A||d((()=>{A||(B.forEach((e=>{const{ownerNode:t}=e.stylesheet;t&&g(t)})),B.clear())})))}function V(e){C=e}const _=[],q=[],T=[],E=[],S=Promise.resolve();let N=!1;function D(e){T.push(e)}const Z=new Set;let O,P=0;function j(){const e=C;do{for(;P<_.length;){const e=_[P];P++,V(e),I(e.$$)}for(V(null),_.length=0,P=0;q.length;)q.pop()();for(let e=0;e<T.length;e+=1){const t=T[e];Z.has(t)||(Z.add(t),t())}T.length=0}while(_.length);for(;E.length;)E.pop()();N=!1,Z.clear(),V(e)}function I(e){if(null!==e.fragment){e.update(),a(e.before_update);const t=e.dirty;e.dirty=[-1],e.fragment&&e.fragment.p(e.ctx,t),e.after_update.forEach(D)}}function R(e,t,i){e.dispatchEvent(function(e,t,{bubbles:i=!1,cancelable:n=!1}={}){const a=document.createEvent("CustomEvent");return a.initCustomEvent(e,i,n,t),a}(`${t?"intro":"outro"}${i}`))}const F=new Set;let J;function W(){J={r:0,c:[],p:J}}function X(){J.r||a(J.c),J=J.p}function Y(e,t){e&&e.i&&(F.delete(e),e.i(t))}function G(e,t,i,n){if(e&&e.o){if(F.has(e))return;F.add(e),J.c.push((()=>{F.delete(e),n&&(i&&e.d(1),n())})),e.o(t)}else n&&n()}const K={duration:0};function Q(i,n,r,s){const c={direction:"both"};let m=n(i,r,c),v=s?0:1,f=null,p=null,g=null;function w(){g&&k(i,g)}function b(e,t){const i=e.b-v;return t*=Math.abs(i),{a:v,b:e.b,d:i,duration:t,start:e.start,end:e.start+t,group:e.group}}function $(n){const{delay:l=0,duration:r=300,easing:s=t,tick:c=e,css:$}=m||K,x={start:o()+l,b:n};n||(x.group=J,J.r+=1),f||p?p=x:($&&(w(),g=M(i,v,n,r,l,s,$)),n&&c(0,1),f=b(x,r),D((()=>R(i,n,"start"))),function(e){let t;0===u.size&&d(h),new Promise((i=>{u.add(t={c:e,f:i})}))}((e=>{if(p&&e>p.start&&(f=b(p,r),p=null,R(i,f.b,"start"),$&&(w(),g=M(i,v,f.b,f.duration,0,s,m.css))),f)if(e>=f.end)c(v=f.b,1-v),R(i,f.b,"end"),p||(f.b?w():--f.group.r||a(f.group.c)),f=null;else if(e>=f.start){const t=e-f.start;v=f.a+f.d*s(t/f.duration),c(v,1-v)}return!(!f&&!p)})))}return{run(e){l(m)?(O||(O=Promise.resolve(),O.then((()=>{O=null}))),O).then((()=>{m=m(c),$(e)})):$(e)},end(){w(),f=p=null}}}const U="undefined"!=typeof window?window:"undefined"!=typeof globalThis?globalThis:global;function ee(e){e&&e.c()}function te(e,t,n,r){const{fragment:s,after_update:c}=e.$$;s&&s.m(t,n),r||D((()=>{const t=e.$$.on_mount.map(i).filter(l);e.$$.on_destroy?e.$$.on_destroy.push(...t):a(t),e.$$.on_mount=[]})),c.forEach(D)}function ie(e,t){const i=e.$$;null!==i.fragment&&(a(i.on_destroy),i.fragment&&i.fragment.d(t),i.on_destroy=i.fragment=null,i.ctx=[])}function ne(e,t){-1===e.$$.dirty[0]&&(_.push(e),N||(N=!0,S.then(j)),e.$$.dirty.fill(0)),e.$$.dirty[t/31|0]|=1<<t%31}function ae(t,i,l,r,s,c,o,d=[-1]){const u=C;V(t);const h=t.$$={fragment:null,ctx:[],props:c,update:e,not_equal:s,bound:n(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(i.context||(u?u.$$.context:[])),callbacks:n(),dirty:d,skip_bound:!1,root:i.target||u.$$.root};o&&o(h.root);let m=!1;if(h.ctx=l?l(t,i.props||{},((e,i,...n)=>{const a=n.length?n[0]:i;return h.ctx&&s(h.ctx[e],h.ctx[e]=a)&&(!h.skip_bound&&h.bound[e]&&h.bound[e](a),m&&ne(t,e)),i})):[],h.update(),m=!0,a(h.before_update),h.fragment=!!r&&r(h.ctx),i.target){if(i.hydrate){const e=function(e){return Array.from(e.childNodes)}(i.target);h.fragment&&h.fragment.l(e),e.forEach(g)}else h.fragment&&h.fragment.c();i.intro&&Y(t.$$.fragment),te(t,i.target,i.anchor,i.customElement),j()}V(u)}class le{$destroy(){ie(this,1),this.$destroy=e}$on(t,i){if(!l(i))return e;const n=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return n.push(i),()=>{const e=n.indexOf(i);-1!==e&&n.splice(e,1)}}$set(e){var t;this.$$set&&(t=e,0!==Object.keys(t).length)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}}function re(e){let t,i;return{c(){t=b("desc"),i=$(e[7])},m(e,n){p(e,t,n),m(t,i)},p(e,t){128&t&&L(i,e[7])},d(e){e&&g(t)}}}function se(e){let t,i;return{c(){t=b("title"),i=$(e[6])},m(e,n){p(e,t,n),m(t,i)},p(e,t){64&t&&L(i,e[6])},d(e){e&&g(t)}}}function ce(t){let i,n,a,l=t[7]&&re(t),r=t[6]&&se(t);return{c(){i=b("svg"),l&&l.c(),n=y(),r&&r.c(),a=b("path"),z(a,"d","M7.8,2H16.2C19.4,2 22,4.6 22,7.8V16.2A5.8,5.8 0 0,1 16.2,22H7.8C4.6,22 2,19.4 2,16.2V7.8A5.8,5.8 0 0,1 7.8,2M7.6,4A3.6,3.6 0 0,0 4,7.6V16.4C4,18.39 5.61,20 7.6,20H16.4A3.6,3.6 0 0,0 20,16.4V7.6C20,5.61 18.39,4 16.4,4H7.6M17.25,5.5A1.25,1.25 0 0,1 18.5,6.75A1.25,1.25 0 0,1 17.25,8A1.25,1.25 0 0,1 16,6.75A1.25,1.25 0 0,1 17.25,5.5M12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9Z"),z(a,"fill",t[2]),z(i,"viewBox",t[3]),z(i,"width",t[0]),z(i,"height",t[1]),z(i,"class",t[8]),z(i,"aria-label",t[4]),z(i,"aria-hidden",t[5])},m(e,t){p(e,i,t),l&&l.m(i,null),m(i,n),r&&r.m(i,null),m(i,a)},p(e,[t]){e[7]?l?l.p(e,t):(l=re(e),l.c(),l.m(i,n)):l&&(l.d(1),l=null),e[6]?r?r.p(e,t):(r=se(e),r.c(),r.m(i,a)):r&&(r.d(1),r=null),4&t&&z(a,"fill",e[2]),8&t&&z(i,"viewBox",e[3]),1&t&&z(i,"width",e[0]),2&t&&z(i,"height",e[1]),256&t&&z(i,"class",e[8]),16&t&&z(i,"aria-label",e[4]),32&t&&z(i,"aria-hidden",e[5])},i:e,o:e,d(e){e&&g(i),l&&l.d(),r&&r.d()}}}function oe(e,t,i){let{size:n="1em"}=t,{width:a=n}=t,{height:l=n}=t,{color:r="currentColor"}=t,{viewBox:s="0 0 24 24"}=t,{ariaLabel:c}=t,{ariaHidden:o}=t,{title:d}=t,{desc:u}=t,{class:h}=t;return e.$$set=e=>{"size"in e&&i(9,n=e.size),"width"in e&&i(0,a=e.width),"height"in e&&i(1,l=e.height),"color"in e&&i(2,r=e.color),"viewBox"in e&&i(3,s=e.viewBox),"ariaLabel"in e&&i(4,c=e.ariaLabel),"ariaHidden"in e&&i(5,o=e.ariaHidden),"title"in e&&i(6,d=e.title),"desc"in e&&i(7,u=e.desc),"class"in e&&i(8,h=e.class)},[a,l,r,s,c,o,d,u,h,n]}class de extends le{constructor(e){super(),ae(this,e,oe,ce,r,{size:9,width:0,height:1,color:2,viewBox:3,ariaLabel:4,ariaHidden:5,title:6,desc:7,class:8})}}function ue(e){let t,i;return{c(){t=b("desc"),i=$(e[7])},m(e,n){p(e,t,n),m(t,i)},p(e,t){128&t&&L(i,e[7])},d(e){e&&g(t)}}}function he(e){let t,i;return{c(){t=b("title"),i=$(e[6])},m(e,n){p(e,t,n),m(t,i)},p(e,t){64&t&&L(i,e[6])},d(e){e&&g(t)}}}function me(t){let i,n,a,l=t[7]&&ue(t),r=t[6]&&he(t);return{c(){i=b("svg"),l&&l.c(),n=y(),r&&r.c(),a=b("path"),z(a,"d","M12 2.04C6.5 2.04 2 6.53 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.85C10.44 7.34 11.93 5.96 14.22 5.96C15.31 5.96 16.45 6.15 16.45 6.15V8.62H15.19C13.95 8.62 13.56 9.39 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96A10 10 0 0 0 22 12.06C22 6.53 17.5 2.04 12 2.04Z"),z(a,"fill",t[2]),z(i,"viewBox",t[3]),z(i,"width",t[0]),z(i,"height",t[1]),z(i,"class",t[8]),z(i,"aria-label",t[4]),z(i,"aria-hidden",t[5])},m(e,t){p(e,i,t),l&&l.m(i,null),m(i,n),r&&r.m(i,null),m(i,a)},p(e,[t]){e[7]?l?l.p(e,t):(l=ue(e),l.c(),l.m(i,n)):l&&(l.d(1),l=null),e[6]?r?r.p(e,t):(r=he(e),r.c(),r.m(i,a)):r&&(r.d(1),r=null),4&t&&z(a,"fill",e[2]),8&t&&z(i,"viewBox",e[3]),1&t&&z(i,"width",e[0]),2&t&&z(i,"height",e[1]),256&t&&z(i,"class",e[8]),16&t&&z(i,"aria-label",e[4]),32&t&&z(i,"aria-hidden",e[5])},i:e,o:e,d(e){e&&g(i),l&&l.d(),r&&r.d()}}}function ve(e,t,i){let{size:n="1em"}=t,{width:a=n}=t,{height:l=n}=t,{color:r="currentColor"}=t,{viewBox:s="0 0 24 24"}=t,{ariaLabel:c}=t,{ariaHidden:o}=t,{title:d}=t,{desc:u}=t,{class:h}=t;return e.$$set=e=>{"size"in e&&i(9,n=e.size),"width"in e&&i(0,a=e.width),"height"in e&&i(1,l=e.height),"color"in e&&i(2,r=e.color),"viewBox"in e&&i(3,s=e.viewBox),"ariaLabel"in e&&i(4,c=e.ariaLabel),"ariaHidden"in e&&i(5,o=e.ariaHidden),"title"in e&&i(6,d=e.title),"desc"in e&&i(7,u=e.desc),"class"in e&&i(8,h=e.class)},[a,l,r,s,c,o,d,u,h,n]}class fe extends le{constructor(e){super(),ae(this,e,ve,me,r,{size:9,width:0,height:1,color:2,viewBox:3,ariaLabel:4,ariaHidden:5,title:6,desc:7,class:8})}}function pe(e){let t,i;return{c(){t=b("desc"),i=$(e[7])},m(e,n){p(e,t,n),m(t,i)},p(e,t){128&t&&L(i,e[7])},d(e){e&&g(t)}}}function ge(e){let t,i;return{c(){t=b("title"),i=$(e[6])},m(e,n){p(e,t,n),m(t,i)},p(e,t){64&t&&L(i,e[6])},d(e){e&&g(t)}}}function we(t){let i,n,a,l=t[7]&&pe(t),r=t[6]&&ge(t);return{c(){i=b("svg"),l&&l.c(),n=y(),r&&r.c(),a=b("path"),z(a,"d","M6.62,10.79C8.06,13.62 10.38,15.94 13.21,17.38L15.41,15.18C15.69,14.9 16.08,14.82 16.43,14.93C17.55,15.3 18.75,15.5 20,15.5A1,1 0 0,1 21,16.5V20A1,1 0 0,1 20,21A17,17 0 0,1 3,4A1,1 0 0,1 4,3H7.5A1,1 0 0,1 8.5,4C8.5,5.25 8.7,6.45 9.07,7.57C9.18,7.92 9.1,8.31 8.82,8.59L6.62,10.79Z"),z(a,"fill",t[2]),z(i,"viewBox",t[3]),z(i,"width",t[0]),z(i,"height",t[1]),z(i,"class",t[8]),z(i,"aria-label",t[4]),z(i,"aria-hidden",t[5])},m(e,t){p(e,i,t),l&&l.m(i,null),m(i,n),r&&r.m(i,null),m(i,a)},p(e,[t]){e[7]?l?l.p(e,t):(l=pe(e),l.c(),l.m(i,n)):l&&(l.d(1),l=null),e[6]?r?r.p(e,t):(r=ge(e),r.c(),r.m(i,a)):r&&(r.d(1),r=null),4&t&&z(a,"fill",e[2]),8&t&&z(i,"viewBox",e[3]),1&t&&z(i,"width",e[0]),2&t&&z(i,"height",e[1]),256&t&&z(i,"class",e[8]),16&t&&z(i,"aria-label",e[4]),32&t&&z(i,"aria-hidden",e[5])},i:e,o:e,d(e){e&&g(i),l&&l.d(),r&&r.d()}}}function be(e,t,i){let{size:n="1em"}=t,{width:a=n}=t,{height:l=n}=t,{color:r="currentColor"}=t,{viewBox:s="0 0 24 24"}=t,{ariaLabel:c}=t,{ariaHidden:o}=t,{title:d}=t,{desc:u}=t,{class:h}=t;return e.$$set=e=>{"size"in e&&i(9,n=e.size),"width"in e&&i(0,a=e.width),"height"in e&&i(1,l=e.height),"color"in e&&i(2,r=e.color),"viewBox"in e&&i(3,s=e.viewBox),"ariaLabel"in e&&i(4,c=e.ariaLabel),"ariaHidden"in e&&i(5,o=e.ariaHidden),"title"in e&&i(6,d=e.title),"desc"in e&&i(7,u=e.desc),"class"in e&&i(8,h=e.class)},[a,l,r,s,c,o,d,u,h,n]}class $e extends le{constructor(e){super(),ae(this,e,be,we,r,{size:9,width:0,height:1,color:2,viewBox:3,ariaLabel:4,ariaHidden:5,title:6,desc:7,class:8})}}function xe(e){let t,i;return{c(){t=b("desc"),i=$(e[7])},m(e,n){p(e,t,n),m(t,i)},p(e,t){128&t&&L(i,e[7])},d(e){e&&g(t)}}}function ye(e){let t,i;return{c(){t=b("title"),i=$(e[6])},m(e,n){p(e,t,n),m(t,i)},p(e,t){64&t&&L(i,e[6])},d(e){e&&g(t)}}}function He(t){let i,n,a,l=t[7]&&xe(t),r=t[6]&&ye(t);return{c(){i=b("svg"),l&&l.c(),n=y(),r&&r.c(),a=b("path"),z(a,"d","M20,8L12,13L4,8V6L12,11L20,6M20,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6C22,4.89 21.1,4 20,4Z"),z(a,"fill",t[2]),z(i,"viewBox",t[3]),z(i,"width",t[0]),z(i,"height",t[1]),z(i,"class",t[8]),z(i,"aria-label",t[4]),z(i,"aria-hidden",t[5])},m(e,t){p(e,i,t),l&&l.m(i,null),m(i,n),r&&r.m(i,null),m(i,a)},p(e,[t]){e[7]?l?l.p(e,t):(l=xe(e),l.c(),l.m(i,n)):l&&(l.d(1),l=null),e[6]?r?r.p(e,t):(r=ye(e),r.c(),r.m(i,a)):r&&(r.d(1),r=null),4&t&&z(a,"fill",e[2]),8&t&&z(i,"viewBox",e[3]),1&t&&z(i,"width",e[0]),2&t&&z(i,"height",e[1]),256&t&&z(i,"class",e[8]),16&t&&z(i,"aria-label",e[4]),32&t&&z(i,"aria-hidden",e[5])},i:e,o:e,d(e){e&&g(i),l&&l.d(),r&&r.d()}}}function ze(e,t,i){let{size:n="1em"}=t,{width:a=n}=t,{height:l=n}=t,{color:r="currentColor"}=t,{viewBox:s="0 0 24 24"}=t,{ariaLabel:c}=t,{ariaHidden:o}=t,{title:d}=t,{desc:u}=t,{class:h}=t;return e.$$set=e=>{"size"in e&&i(9,n=e.size),"width"in e&&i(0,a=e.width),"height"in e&&i(1,l=e.height),"color"in e&&i(2,r=e.color),"viewBox"in e&&i(3,s=e.viewBox),"ariaLabel"in e&&i(4,c=e.ariaLabel),"ariaHidden"in e&&i(5,o=e.ariaHidden),"title"in e&&i(6,d=e.title),"desc"in e&&i(7,u=e.desc),"class"in e&&i(8,h=e.class)},[a,l,r,s,c,o,d,u,h,n]}class Le extends le{constructor(e){super(),ae(this,e,ze,He,r,{size:9,width:0,height:1,color:2,viewBox:3,ariaLabel:4,ariaHidden:5,title:6,desc:7,class:8})}}function Be(e){let t,i;return{c(){t=b("desc"),i=$(e[7])},m(e,n){p(e,t,n),m(t,i)},p(e,t){128&t&&L(i,e[7])},d(e){e&&g(t)}}}function Ce(e){let t,i;return{c(){t=b("title"),i=$(e[6])},m(e,n){p(e,t,n),m(t,i)},p(e,t){64&t&&L(i,e[6])},d(e){e&&g(t)}}}function Ae(t){let i,n,a,l=t[7]&&Be(t),r=t[6]&&Ce(t);return{c(){i=b("svg"),l&&l.c(),n=y(),r&&r.c(),a=b("path"),z(a,"d","M12,11.5A2.5,2.5 0 0,1 9.5,9A2.5,2.5 0 0,1 12,6.5A2.5,2.5 0 0,1 14.5,9A2.5,2.5 0 0,1 12,11.5M12,2A7,7 0 0,0 5,9C5,14.25 12,22 12,22C12,22 19,14.25 19,9A7,7 0 0,0 12,2Z"),z(a,"fill",t[2]),z(i,"viewBox",t[3]),z(i,"width",t[0]),z(i,"height",t[1]),z(i,"class",t[8]),z(i,"aria-label",t[4]),z(i,"aria-hidden",t[5])},m(e,t){p(e,i,t),l&&l.m(i,null),m(i,n),r&&r.m(i,null),m(i,a)},p(e,[t]){e[7]?l?l.p(e,t):(l=Be(e),l.c(),l.m(i,n)):l&&(l.d(1),l=null),e[6]?r?r.p(e,t):(r=Ce(e),r.c(),r.m(i,a)):r&&(r.d(1),r=null),4&t&&z(a,"fill",e[2]),8&t&&z(i,"viewBox",e[3]),1&t&&z(i,"width",e[0]),2&t&&z(i,"height",e[1]),256&t&&z(i,"class",e[8]),16&t&&z(i,"aria-label",e[4]),32&t&&z(i,"aria-hidden",e[5])},i:e,o:e,d(e){e&&g(i),l&&l.d(),r&&r.d()}}}function Me(e,t,i){let{size:n="1em"}=t,{width:a=n}=t,{height:l=n}=t,{color:r="currentColor"}=t,{viewBox:s="0 0 24 24"}=t,{ariaLabel:c}=t,{ariaHidden:o}=t,{title:d}=t,{desc:u}=t,{class:h}=t;return e.$$set=e=>{"size"in e&&i(9,n=e.size),"width"in e&&i(0,a=e.width),"height"in e&&i(1,l=e.height),"color"in e&&i(2,r=e.color),"viewBox"in e&&i(3,s=e.viewBox),"ariaLabel"in e&&i(4,c=e.ariaLabel),"ariaHidden"in e&&i(5,o=e.ariaHidden),"title"in e&&i(6,d=e.title),"desc"in e&&i(7,u=e.desc),"class"in e&&i(8,h=e.class)},[a,l,r,s,c,o,d,u,h,n]}class ke extends le{constructor(e){super(),ae(this,e,Me,Ae,r,{size:9,width:0,height:1,color:2,viewBox:3,ariaLabel:4,ariaHidden:5,title:6,desc:7,class:8})}}function Ve(e){let t,i;return{c(){t=b("desc"),i=$(e[7])},m(e,n){p(e,t,n),m(t,i)},p(e,t){128&t&&L(i,e[7])},d(e){e&&g(t)}}}function _e(e){let t,i;return{c(){t=b("title"),i=$(e[6])},m(e,n){p(e,t,n),m(t,i)},p(e,t){64&t&&L(i,e[6])},d(e){e&&g(t)}}}function qe(t){let i,n,a,l=t[7]&&Ve(t),r=t[6]&&_e(t);return{c(){i=b("svg"),l&&l.c(),n=y(),r&&r.c(),a=b("path"),z(a,"d","M12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22C17.5 22 22 17.5 22 12S17.5 2 12 2M12.5 13H7V11.5H11V7H12.5V13Z"),z(a,"fill",t[2]),z(i,"viewBox",t[3]),z(i,"width",t[0]),z(i,"height",t[1]),z(i,"class",t[8]),z(i,"aria-label",t[4]),z(i,"aria-hidden",t[5])},m(e,t){p(e,i,t),l&&l.m(i,null),m(i,n),r&&r.m(i,null),m(i,a)},p(e,[t]){e[7]?l?l.p(e,t):(l=Ve(e),l.c(),l.m(i,n)):l&&(l.d(1),l=null),e[6]?r?r.p(e,t):(r=_e(e),r.c(),r.m(i,a)):r&&(r.d(1),r=null),4&t&&z(a,"fill",e[2]),8&t&&z(i,"viewBox",e[3]),1&t&&z(i,"width",e[0]),2&t&&z(i,"height",e[1]),256&t&&z(i,"class",e[8]),16&t&&z(i,"aria-label",e[4]),32&t&&z(i,"aria-hidden",e[5])},i:e,o:e,d(e){e&&g(i),l&&l.d(),r&&r.d()}}}function Te(e,t,i){let{size:n="1em"}=t,{width:a=n}=t,{height:l=n}=t,{color:r="currentColor"}=t,{viewBox:s="0 0 24 24"}=t,{ariaLabel:c}=t,{ariaHidden:o}=t,{title:d}=t,{desc:u}=t,{class:h}=t;return e.$$set=e=>{"size"in e&&i(9,n=e.size),"width"in e&&i(0,a=e.width),"height"in e&&i(1,l=e.height),"color"in e&&i(2,r=e.color),"viewBox"in e&&i(3,s=e.viewBox),"ariaLabel"in e&&i(4,c=e.ariaLabel),"ariaHidden"in e&&i(5,o=e.ariaHidden),"title"in e&&i(6,d=e.title),"desc"in e&&i(7,u=e.desc),"class"in e&&i(8,h=e.class)},[a,l,r,s,c,o,d,u,h,n]}class Ee extends le{constructor(e){super(),ae(this,e,Te,qe,r,{size:9,width:0,height:1,color:2,viewBox:3,ariaLabel:4,ariaHidden:5,title:6,desc:7,class:8})}}function Se(t){let i,n,a,l,r,s,c,o,d,u,h,v,f,b,y,H,L,B,C,A,M,k,V,_,q,T,E,S,N,D,Z,O,P,j,I,R,F,J,W,X,K,Q,U,ne,ae,le,re,se,ce;return f=new $e({props:{size:"24px",color:"#4f4f4f"}}),A=new Le({props:{size:"24px",color:"#4f4f4f"}}),E=new ke({props:{size:"24px",color:"#4f4f4f"}}),j=new Ee({props:{size:"24px",color:"#4f4f4f"}}),ae=new de({props:{size:"30px",color:"#b76262"}}),se=new fe({props:{size:"24px",color:"#b76262"}}),{c(){i=w("div"),n=w("div"),a=x(),l=w("div"),r=x(),s=w("div"),c=w("section"),o=w("div"),d=w("h1"),d.textContent="Contact",u=x(),h=w("div"),v=w("h4"),ee(f.$$.fragment),b=$(" Mobil:"),y=x(),H=w("div"),H.innerHTML='<a class="contact-link svelte-rcyrv9" href="tel:+40-767-23-63-64">0767 236 364 (Notar);</a> \n                        <a class="contact-link svelte-rcyrv9" href="tel:+40-773-80-66-47">0773 806 647 (Secretariat);</a>',L=x(),B=w("div"),C=w("h4"),ee(A.$$.fragment),M=$(" Email:"),k=x(),V=w("div"),V.innerHTML='<a class="contact-link svelte-rcyrv9" href="mailto: notariliecristian@gmail.com">notariliecristian@gmail.com</a>',_=x(),q=w("div"),T=w("h4"),ee(E.$$.fragment),S=$(" Adresa:"),N=x(),D=w("div"),D.innerHTML='<a class="contact-link svelte-rcyrv9" href="https://www.google.com/maps/place/Bloc+2,+Strada+13+Decembrie+24,+Bra%C8%99ov+500199/@45.6540641,25.6032523,17z/data=!3m1!4b1!4m5!3m4!1s0x40b35b8682167e4b:0x36cf29abc12fb9ab!8m2!3d45.6540604!4d25.605441">Strada 13 Decembrie, Nr 24, Ap 2,Mun Brasov (Langa\n                            statia de autobuz Onix)</a>',Z=x(),O=w("div"),P=w("h4"),ee(j.$$.fragment),I=$(" Va asteptam"),R=x(),F=w("div"),F.innerHTML='<span class="calendar-text svelte-rcyrv9">Luni - Miercuri: 9:00 - 17:00</span> \n                        <span class="calendar-text svelte-rcyrv9">Joi : 9:00 - 18:00</span> \n                        <span class="calendar-text svelte-rcyrv9">Vineri : 8:00 - 14:00</span> \n                        <span class="calendar-text svelte-rcyrv9">Sambata : Doar cu programare</span> \n                        <span class="calendar-text svelte-rcyrv9">Duminica : Inchis</span>',J=x(),W=w("h4"),W.textContent="Pentru orice detalii nu ezitati sa ne contactati!",X=x(),K=w("div"),Q=w("span"),Q.textContent="Ne gasiti si pe:",U=x(),ne=w("a"),ee(ae.$$.fragment),le=x(),re=w("a"),ee(se.$$.fragment),z(n,"class","background-container svelte-rcyrv9"),z(l,"class","page-gradient svelte-rcyrv9"),z(d,"class","svelte-rcyrv9"),z(v,"class","contact-section-titlte svelte-rcyrv9"),z(H,"class","contact-section-detail svelte-rcyrv9"),z(h,"class","contact-section svelte-rcyrv9"),z(C,"class","contact-section-titlte svelte-rcyrv9"),z(V,"class","contact-section-detail svelte-rcyrv9"),z(B,"class","contact-section svelte-rcyrv9"),z(T,"class","contact-section-titlte svelte-rcyrv9"),z(D,"class","contact-section-detail svelte-rcyrv9"),z(q,"class","contact-section svelte-rcyrv9"),z(P,"class","contact-section-titlte svelte-rcyrv9"),z(F,"class","contact-section-detail svelte-rcyrv9"),z(O,"class","contact-section svelte-rcyrv9"),z(W,"class","svelte-rcyrv9"),z(ne,"href","https://www.instagram.com/notariatbrasov/"),z(ne,"class","social-link svelte-rcyrv9"),z(re,"href","https://www.instagram.com/notariatbrasov/"),z(re,"class","social-link svelte-rcyrv9"),z(K,"class","social-row svelte-rcyrv9"),z(o,"class","first-section-half section-half svelte-rcyrv9"),z(c,"class","svelte-rcyrv9"),z(s,"class","page-content svelte-rcyrv9"),z(i,"class","page-container svelte-rcyrv9")},m(e,t){p(e,i,t),m(i,n),m(i,a),m(i,l),m(i,r),m(i,s),m(s,c),m(c,o),m(o,d),m(o,u),m(o,h),m(h,v),te(f,v,null),m(v,b),m(h,y),m(h,H),m(o,L),m(o,B),m(B,C),te(A,C,null),m(C,M),m(B,k),m(B,V),m(o,_),m(o,q),m(q,T),te(E,T,null),m(T,S),m(q,N),m(q,D),m(o,Z),m(o,O),m(O,P),te(j,P,null),m(P,I),m(O,R),m(O,F),m(o,J),m(o,W),m(o,X),m(o,K),m(K,Q),m(K,U),m(K,ne),te(ae,ne,null),m(K,le),m(K,re),te(se,re,null),ce=!0},p:e,i(e){ce||(Y(f.$$.fragment,e),Y(A.$$.fragment,e),Y(E.$$.fragment,e),Y(j.$$.fragment,e),Y(ae.$$.fragment,e),Y(se.$$.fragment,e),ce=!0)},o(e){G(f.$$.fragment,e),G(A.$$.fragment,e),G(E.$$.fragment,e),G(j.$$.fragment,e),G(ae.$$.fragment,e),G(se.$$.fragment,e),ce=!1},d(e){e&&g(i),ie(f),ie(A),ie(E),ie(j),ie(ae),ie(se)}}}class Ne extends le{constructor(e){super(),ae(this,e,null,Se,r,{})}}function De(e){let t,i;return{c(){t=b("desc"),i=$(e[7])},m(e,n){p(e,t,n),m(t,i)},p(e,t){128&t&&L(i,e[7])},d(e){e&&g(t)}}}function Ze(e){let t,i;return{c(){t=b("title"),i=$(e[6])},m(e,n){p(e,t,n),m(t,i)},p(e,t){64&t&&L(i,e[6])},d(e){e&&g(t)}}}function Oe(t){let i,n,a,l=t[7]&&De(t),r=t[6]&&Ze(t);return{c(){i=b("svg"),l&&l.c(),n=y(),r&&r.c(),a=b("path"),z(a,"d","M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z"),z(a,"fill",t[2]),z(i,"viewBox",t[3]),z(i,"width",t[0]),z(i,"height",t[1]),z(i,"class",t[8]),z(i,"aria-label",t[4]),z(i,"aria-hidden",t[5])},m(e,t){p(e,i,t),l&&l.m(i,null),m(i,n),r&&r.m(i,null),m(i,a)},p(e,[t]){e[7]?l?l.p(e,t):(l=De(e),l.c(),l.m(i,n)):l&&(l.d(1),l=null),e[6]?r?r.p(e,t):(r=Ze(e),r.c(),r.m(i,a)):r&&(r.d(1),r=null),4&t&&z(a,"fill",e[2]),8&t&&z(i,"viewBox",e[3]),1&t&&z(i,"width",e[0]),2&t&&z(i,"height",e[1]),256&t&&z(i,"class",e[8]),16&t&&z(i,"aria-label",e[4]),32&t&&z(i,"aria-hidden",e[5])},i:e,o:e,d(e){e&&g(i),l&&l.d(),r&&r.d()}}}function Pe(e,t,i){let{size:n="1em"}=t,{width:a=n}=t,{height:l=n}=t,{color:r="currentColor"}=t,{viewBox:s="0 0 24 24"}=t,{ariaLabel:c}=t,{ariaHidden:o}=t,{title:d}=t,{desc:u}=t,{class:h}=t;return e.$$set=e=>{"size"in e&&i(9,n=e.size),"width"in e&&i(0,a=e.width),"height"in e&&i(1,l=e.height),"color"in e&&i(2,r=e.color),"viewBox"in e&&i(3,s=e.viewBox),"ariaLabel"in e&&i(4,c=e.ariaLabel),"ariaHidden"in e&&i(5,o=e.ariaHidden),"title"in e&&i(6,d=e.title),"desc"in e&&i(7,u=e.desc),"class"in e&&i(8,h=e.class)},[a,l,r,s,c,o,d,u,h,n]}class je extends le{constructor(e){super(),ae(this,e,Pe,Oe,r,{size:9,width:0,height:1,color:2,viewBox:3,ariaLabel:4,ariaHidden:5,title:6,desc:7,class:8})}}function Ie(e){let t,i;return{c(){t=b("desc"),i=$(e[7])},m(e,n){p(e,t,n),m(t,i)},p(e,t){128&t&&L(i,e[7])},d(e){e&&g(t)}}}function Re(e){let t,i;return{c(){t=b("title"),i=$(e[6])},m(e,n){p(e,t,n),m(t,i)},p(e,t){64&t&&L(i,e[6])},d(e){e&&g(t)}}}function Fe(t){let i,n,a,l=t[7]&&Ie(t),r=t[6]&&Re(t);return{c(){i=b("svg"),l&&l.c(),n=y(),r&&r.c(),a=b("path"),z(a,"d","M13,9H11V7H13M13,17H11V11H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z"),z(a,"fill",t[2]),z(i,"viewBox",t[3]),z(i,"width",t[0]),z(i,"height",t[1]),z(i,"class",t[8]),z(i,"aria-label",t[4]),z(i,"aria-hidden",t[5])},m(e,t){p(e,i,t),l&&l.m(i,null),m(i,n),r&&r.m(i,null),m(i,a)},p(e,[t]){e[7]?l?l.p(e,t):(l=Ie(e),l.c(),l.m(i,n)):l&&(l.d(1),l=null),e[6]?r?r.p(e,t):(r=Re(e),r.c(),r.m(i,a)):r&&(r.d(1),r=null),4&t&&z(a,"fill",e[2]),8&t&&z(i,"viewBox",e[3]),1&t&&z(i,"width",e[0]),2&t&&z(i,"height",e[1]),256&t&&z(i,"class",e[8]),16&t&&z(i,"aria-label",e[4]),32&t&&z(i,"aria-hidden",e[5])},i:e,o:e,d(e){e&&g(i),l&&l.d(),r&&r.d()}}}function Je(e,t,i){let{size:n="1em"}=t,{width:a=n}=t,{height:l=n}=t,{color:r="currentColor"}=t,{viewBox:s="0 0 24 24"}=t,{ariaLabel:c}=t,{ariaHidden:o}=t,{title:d}=t,{desc:u}=t,{class:h}=t;return e.$$set=e=>{"size"in e&&i(9,n=e.size),"width"in e&&i(0,a=e.width),"height"in e&&i(1,l=e.height),"color"in e&&i(2,r=e.color),"viewBox"in e&&i(3,s=e.viewBox),"ariaLabel"in e&&i(4,c=e.ariaLabel),"ariaHidden"in e&&i(5,o=e.ariaHidden),"title"in e&&i(6,d=e.title),"desc"in e&&i(7,u=e.desc),"class"in e&&i(8,h=e.class)},[a,l,r,s,c,o,d,u,h,n]}class We extends le{constructor(e){super(),ae(this,e,Je,Fe,r,{size:9,width:0,height:1,color:2,viewBox:3,ariaLabel:4,ariaHidden:5,title:6,desc:7,class:8})}}function Xe(e,t,i){const n=e.slice();return n[1]=t[i],n}function Ye(t){let i,n,a,l,r,s,c,o,d,u,h=t[1].title+"",v=t[1].body+"";return a=new je({props:{size:"30px",color:"#b76262"}}),{c(){i=w("div"),n=w("div"),ee(a.$$.fragment),l=x(),r=w("h4"),s=$(h),c=x(),o=w("div"),d=$(v),z(r,"class","svelte-1lw066i"),z(n,"class","card-title-row svelte-1lw066i"),z(o,"class","card-body svelte-1lw066i"),z(i,"class","card svelte-1lw066i")},m(e,t){p(e,i,t),m(i,n),te(a,n,null),m(n,l),m(n,r),m(r,s),m(i,c),m(i,o),m(o,d),u=!0},p:e,i(e){u||(Y(a.$$.fragment,e),u=!0)},o(e){G(a.$$.fragment,e),u=!1},d(e){e&&g(i),ie(a)}}}function Ge(e){let t,i,n,a,l,r,s,c,o,d,u=e[0],h=[];for(let t=0;t<u.length;t+=1)h[t]=Ye(Xe(e,u,t));const v=e=>G(h[e],1,1,(()=>{h[e]=null}));return s=new We({props:{size:"24px",color:"#b76262"}}),{c(){t=w("div"),i=w("div"),i.innerHTML='<h1 class="svelte-1lw066i">Servicii</h1>',n=x(),a=w("div");for(let e=0;e<h.length;e+=1)h[e].c();l=x(),r=w("div"),ee(s.$$.fragment),c=x(),o=w("span"),o.textContent="Pentru perfectarea actelor și procedurilor notariale vă așteptăm\r\n                la sediul biroului notarial sau ne puteți contacta direct pe\r\n                adresa de e-mail, WhatsApp sau telefonic și veniți direct la\r\n                semnare. Apreciem timpul dumneavoastră, iar rezolvarea rapidă și\r\n                sigură a problemelor juridice este prioritatea noastră.",z(i,"class","title-container svelte-1lw066i"),z(r,"class","large-card svelte-1lw066i"),z(a,"class","card-container svelte-1lw066i"),z(t,"class","page-container svelte-1lw066i")},m(e,u){p(e,t,u),m(t,i),m(t,n),m(t,a);for(let e=0;e<h.length;e+=1)h[e].m(a,null);m(a,l),m(a,r),te(s,r,null),m(r,c),m(r,o),d=!0},p(e,[t]){if(1&t){let i;for(u=e[0],i=0;i<u.length;i+=1){const n=Xe(e,u,i);h[i]?(h[i].p(n,t),Y(h[i],1)):(h[i]=Ye(n),h[i].c(),Y(h[i],1),h[i].m(a,l))}for(W(),i=u.length;i<h.length;i+=1)v(i);X()}},i(e){if(!d){for(let e=0;e<u.length;e+=1)Y(h[e]);Y(s.$$.fragment,e),d=!0}},o(e){h=h.filter(Boolean);for(let e=0;e<h.length;e+=1)G(h[e]);G(s.$$.fragment,e),d=!1},d(e){e&&g(t),function(e,t){for(let i=0;i<e.length;i+=1)e[i]&&e[i].d(t)}(h,e),ie(s)}}}function Ke(e){return[[{title:"Contracte",body:"Contract de Vânzare, Promisiune de vânzare-cumpărare (Antecontract), Contract de Schimb,\nContract de Donație, Act de Partaj, Contract de Întreținere, Contract de Ipotecă Imobiliară,\nContract de Împrumut, Contract de Închiriere, etc."},{title:"Succesiuni",body:"Dezbatere succesiunii este o procedură necesară care poate fi soluționată în mod eficient\nurmând pașii indicați și explicați în detaliu de către notarul public, care se va ocupa de\nformalitățile necesare soluționării procedurii succesorale și eliberării Certificatului de\nmoștenitor."},{title:"Declaratii si procuri",body:"Aceasta categorie are in componenta de la declaratii simple precum cele necesare la infiintarea societatilor pana la acorduri complexe exprimate de catre parti in forma autentica precum si procuri"},{title:"Divorturi",body:"Notarul public este abilitat, in baza art. 375 din Noul Cod Civil, sa constate divortul prin acordul sotilor si sa elibereze certificatul de divort."},{title:"Conventii matrimoniale",body:"Deși regimul matrimonial al comunității legale de bunuri reprezintă regula în materia\nraporturilor patrimoniale ale soților, legislația civilă permite ca soții sau viitorii soți să poată\nopta pentru regimul comunității convenționale de bunuri sau al separației de bunuri, prin\nîncheierea unei convenții matrimoniale."},{title:"Testamente",body:"Testamentul autentificat de către notarul public în forma și condițiile stabilite prin Legea\nnr.36/1995 a notarilor publici și a Codului Civil va beneficia de siguranța, validitatea și\navantajele înscrisurilor autentice notariale."},{title:"Alte proceduri",body:"Dintre procedurile notariale comune, amintim: legalizarea copiilor de pe înscrisuri, legalizarea\ntraducerilor și semnăturilor, eliberarea de duplicate, legalizarea specimenului de semnătură,\ndarea de dată certă a înscrisurilor, etc."}]]}class Qe extends le{constructor(e){super(),ae(this,e,Ke,Ge,r,{})}}function Ue(e){let t,i;return{c(){t=b("desc"),i=$(e[7])},m(e,n){p(e,t,n),m(t,i)},p(e,t){128&t&&L(i,e[7])},d(e){e&&g(t)}}}function et(e){let t,i;return{c(){t=b("title"),i=$(e[6])},m(e,n){p(e,t,n),m(t,i)},p(e,t){64&t&&L(i,e[6])},d(e){e&&g(t)}}}function tt(t){let i,n,a,l=t[7]&&Ue(t),r=t[6]&&et(t);return{c(){i=b("svg"),l&&l.c(),n=y(),r&&r.c(),a=b("path"),z(a,"d","M10,17L15,12L10,7V17Z"),z(a,"fill",t[2]),z(i,"viewBox",t[3]),z(i,"width",t[0]),z(i,"height",t[1]),z(i,"class",t[8]),z(i,"aria-label",t[4]),z(i,"aria-hidden",t[5])},m(e,t){p(e,i,t),l&&l.m(i,null),m(i,n),r&&r.m(i,null),m(i,a)},p(e,[t]){e[7]?l?l.p(e,t):(l=Ue(e),l.c(),l.m(i,n)):l&&(l.d(1),l=null),e[6]?r?r.p(e,t):(r=et(e),r.c(),r.m(i,a)):r&&(r.d(1),r=null),4&t&&z(a,"fill",e[2]),8&t&&z(i,"viewBox",e[3]),1&t&&z(i,"width",e[0]),2&t&&z(i,"height",e[1]),256&t&&z(i,"class",e[8]),16&t&&z(i,"aria-label",e[4]),32&t&&z(i,"aria-hidden",e[5])},i:e,o:e,d(e){e&&g(i),l&&l.d(),r&&r.d()}}}function it(e,t,i){let{size:n="1em"}=t,{width:a=n}=t,{height:l=n}=t,{color:r="currentColor"}=t,{viewBox:s="0 0 24 24"}=t,{ariaLabel:c}=t,{ariaHidden:o}=t,{title:d}=t,{desc:u}=t,{class:h}=t;return e.$$set=e=>{"size"in e&&i(9,n=e.size),"width"in e&&i(0,a=e.width),"height"in e&&i(1,l=e.height),"color"in e&&i(2,r=e.color),"viewBox"in e&&i(3,s=e.viewBox),"ariaLabel"in e&&i(4,c=e.ariaLabel),"ariaHidden"in e&&i(5,o=e.ariaHidden),"title"in e&&i(6,d=e.title),"desc"in e&&i(7,u=e.desc),"class"in e&&i(8,h=e.class)},[a,l,r,s,c,o,d,u,h,n]}class nt extends le{constructor(e){super(),ae(this,e,it,tt,r,{size:9,width:0,height:1,color:2,viewBox:3,ariaLabel:4,ariaHidden:5,title:6,desc:7,class:8})}}function at(e){const t=e-1;return t*t*t+1}function lt(e,{delay:t=0,duration:i=400,easing:n=at,x:a=0,y:l=0,opacity:r=0}={}){const s=getComputedStyle(e),c=+s.opacity,o="none"===s.transform?"":s.transform,d=c*(1-r);return{delay:t,duration:i,easing:n,css:(e,t)=>`\n\t\t\ttransform: ${o} translate(${(1-e)*a}px, ${(1-e)*l}px);\n\t\t\topacity: ${c-d*t}`}}const{window:rt}=U;function st(t){let i,n,l,r,s,c,o,d,u,h,v,f,b,$,y,L,B,C,A,M,k,V,_,q,T;return D(t[3]),A=new nt({props:{size:"40px"}}),{c(){i=w("div"),n=w("div"),l=x(),r=w("div"),s=x(),c=w("div"),o=w("div"),o.innerHTML='<img src="./logo.webp" alt="logo" class="big-logo svelte-41wlvu"/> \n            <div class="title-text svelte-41wlvu"><h2 class="svelte-41wlvu">Birou</h2> \n                <h2 class="svelte-41wlvu">Individual</h2> \n                <h2 class="svelte-41wlvu">Notarial</h2> \n                <hr class="svelte-41wlvu"/> \n                <h2 style="color:black; font-weight: 400;" class="svelte-41wlvu">Ilie Cristian</h2></div>',u=x(),h=w("section"),v=w("h1"),v.textContent="O baza solida pentru nevoile dumneavoastră legale in Brasov",f=x(),b=w("h4"),b.textContent="Înțelegem nevoia de siguranță și eficiență în serviciun\r\n                notarial, iar asta ne face să oferim soluții legale sigure,\r\n                rapide și clare atât pentru dumneavoastră cât și pentru afacerea\r\n                pe care o administrati.",$=x(),y=w("div"),L=w("span"),L.textContent="Contact",B=x(),C=w("span"),ee(A.$$.fragment),M=x(),k=w("footer"),V=w("span"),V.textContent="arrow_circle_down",z(n,"class","background-container svelte-41wlvu"),z(r,"class","page-gradient svelte-41wlvu"),z(o,"class","title-row svelte-41wlvu"),z(v,"class","smaller-width-header svelte-41wlvu"),z(b,"class","svelte-41wlvu"),z(C,"class","right-arrow svelte-41wlvu"),z(y,"class","contact-button svelte-41wlvu"),z(h,"class","content svelte-41wlvu"),z(V,"class","material-symbols-outlined svelte-41wlvu"),z(k,"class","svelte-41wlvu"),z(c,"class","page-content svelte-41wlvu"),z(i,"class","page-container svelte-41wlvu")},m(e,a){p(e,i,a),m(i,n),m(i,l),m(i,r),m(i,s),m(i,c),m(c,o),m(c,u),m(c,h),m(h,v),m(h,f),m(h,b),m(h,$),m(h,y),m(y,L),m(y,B),m(y,C),te(A,C,null),m(c,M),m(c,k),m(k,V),_=!0,q||(T=[H(rt,"resize",t[3]),H(y,"click",t[4]),H(V,"click",t[5])],q=!0)},p:e,i(e){_||(D((()=>{d||(d=Q(o,lt,{y:100,duration:1e3},!0)),d.run(1)})),Y(A.$$.fragment,e),_=!0)},o(e){d||(d=Q(o,lt,{y:100,duration:1e3},!1)),d.run(0),G(A.$$.fragment,e),_=!1},d(e){e&&g(i),e&&d&&d.end(),ie(A),q=!1,a(T)}}}function ct(e,t,i){let n=0;const a=()=>{window.scrollTo({top:n-40,behavior:"smooth"})},l=()=>{window.scrollTo({top:1e5,behavior:"smooth"})};return[n,a,l,function(){i(0,n=rt.innerHeight)},()=>l(),()=>a()]}class ot extends le{constructor(e){super(),ae(this,e,ct,st,r,{})}}function dt(e){let t,i;return{c(){t=b("desc"),i=$(e[7])},m(e,n){p(e,t,n),m(t,i)},p(e,t){128&t&&L(i,e[7])},d(e){e&&g(t)}}}function ut(e){let t,i;return{c(){t=b("title"),i=$(e[6])},m(e,n){p(e,t,n),m(t,i)},p(e,t){64&t&&L(i,e[6])},d(e){e&&g(t)}}}function ht(t){let i,n,a,l=t[7]&&dt(t),r=t[6]&&ut(t);return{c(){i=b("svg"),l&&l.c(),n=y(),r&&r.c(),a=b("path"),z(a,"d","M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z"),z(a,"fill",t[2]),z(i,"viewBox",t[3]),z(i,"width",t[0]),z(i,"height",t[1]),z(i,"class",t[8]),z(i,"aria-label",t[4]),z(i,"aria-hidden",t[5])},m(e,t){p(e,i,t),l&&l.m(i,null),m(i,n),r&&r.m(i,null),m(i,a)},p(e,[t]){e[7]?l?l.p(e,t):(l=dt(e),l.c(),l.m(i,n)):l&&(l.d(1),l=null),e[6]?r?r.p(e,t):(r=ut(e),r.c(),r.m(i,a)):r&&(r.d(1),r=null),4&t&&z(a,"fill",e[2]),8&t&&z(i,"viewBox",e[3]),1&t&&z(i,"width",e[0]),2&t&&z(i,"height",e[1]),256&t&&z(i,"class",e[8]),16&t&&z(i,"aria-label",e[4]),32&t&&z(i,"aria-hidden",e[5])},i:e,o:e,d(e){e&&g(i),l&&l.d(),r&&r.d()}}}function mt(e,t,i){let{size:n="1em"}=t,{width:a=n}=t,{height:l=n}=t,{color:r="currentColor"}=t,{viewBox:s="0 0 24 24"}=t,{ariaLabel:c}=t,{ariaHidden:o}=t,{title:d}=t,{desc:u}=t,{class:h}=t;return e.$$set=e=>{"size"in e&&i(9,n=e.size),"width"in e&&i(0,a=e.width),"height"in e&&i(1,l=e.height),"color"in e&&i(2,r=e.color),"viewBox"in e&&i(3,s=e.viewBox),"ariaLabel"in e&&i(4,c=e.ariaLabel),"ariaHidden"in e&&i(5,o=e.ariaHidden),"title"in e&&i(6,d=e.title),"desc"in e&&i(7,u=e.desc),"class"in e&&i(8,h=e.class)},[a,l,r,s,c,o,d,u,h,n]}class vt extends le{constructor(e){super(),ae(this,e,mt,ht,r,{size:9,width:0,height:1,color:2,viewBox:3,ariaLabel:4,ariaHidden:5,title:6,desc:7,class:8})}}function ft(e){let t,i,n;return{c(){t=w("div"),t.innerHTML='<h5 class="svelte-1qmmilr">Birou individual notarial</h5> \n\t\t\t\t\t<hr class="svelte-1qmmilr"/> \n\t\t\t\t\t<h5 style="color:white;font-weight:200" class="svelte-1qmmilr">Ilie Cristian</h5>',z(t,"class","logo-name svelte-1qmmilr")},m(e,i){p(e,t,i),n=!0},i(e){n||(D((()=>{i||(i=Q(t,lt,{y:30,duration:1e3},!0)),i.run(1)})),n=!0)},o(e){i||(i=Q(t,lt,{y:30,duration:1e3},!1)),i.run(0),n=!1},d(e){e&&g(t),e&&i&&i.end()}}}function pt(e){let t;return{c(){t=w("div"),t.innerHTML='<div class="mobile-nav-link svelte-1qmmilr"><a href="#home" class="nav-link svelte-1qmmilr">Prezentare</a></div> \n\t\t<div class="mobile-nav-link svelte-1qmmilr"><a href="#services" class="nav-link svelte-1qmmilr">Servicii</a></div> \n\t\t<div class="mobile-nav-link svelte-1qmmilr"><a href="#contact" class="nav-link svelte-1qmmilr">Contact</a></div>',z(t,"class","mobile-nav-container svelte-1qmmilr")},m(e,i){p(e,t,i)},d(e){e&&g(t)}}}function gt(e){let t,i,n,l,r,c,o,d,u,h,v,f,b,$,y,L,B,C,A,M,k,V,_,q,T,E,S,N=!1,Z=()=>{N=!1};D(e[3]);let O=e[1]>=200&&ft();b=new vt({props:{color:wt,size:"1.4rem",width:"1.4rem",height:"1.4rem"}});let P=e[0]&&pt();return C=new ot({}),k=new Qe({}),q=new Ne({}),{c(){var e,t;i=x(),n=w("div"),l=w("div"),r=w("div"),c=w("img"),d=x(),O&&O.c(),u=x(),h=w("div"),h.innerHTML='<a href="#home" class="nav-link svelte-1qmmilr">Prezentare</a> \n\n\t\t\t<a href="#services" class="nav-link svelte-1qmmilr">Servicii</a> \n\n\t\t\t<a href="#contact" class="nav-link svelte-1qmmilr">Contact</a>',v=x(),f=w("div"),ee(b.$$.fragment),$=x(),P&&P.c(),y=x(),L=w("main"),B=w("section"),ee(C.$$.fragment),A=x(),M=w("section"),ee(k.$$.fragment),V=x(),_=w("section"),ee(q.$$.fragment),e=c.src,t=o="logo.webp",s||(s=document.createElement("a")),s.href=t,e!==s.href&&z(c,"src","logo.webp"),z(c,"alt","unnpr-logo"),z(c,"height","50px"),z(c,"width","50px"),z(r,"class","logo-container svelte-1qmmilr"),z(h,"class","button-container svelte-1qmmilr"),z(f,"class","button-container-mobile svelte-1qmmilr"),z(l,"class","button-row svelte-1qmmilr"),z(n,"class","nav-container svelte-1qmmilr"),z(B,"id","home"),z(M,"id","services"),z(_,"id","contact"),z(L,"class","svelte-1qmmilr")},m(a,s){p(a,i,s),p(a,n,s),m(n,l),m(l,r),m(r,c),m(r,d),O&&O.m(r,null),m(l,u),m(l,h),m(l,v),m(l,f),te(b,f,null),p(a,$,s),P&&P.m(a,s),p(a,y,s),p(a,L,s),m(L,B),te(C,B,null),m(L,A),m(L,M),te(k,M,null),m(L,V),m(L,_),te(q,_,null),T=!0,E||(S=[H(window,"scroll",(()=>{N=!0,clearTimeout(t),t=setTimeout(Z,100),e[3]()})),H(f,"click",e[4])],E=!0)},p(e,[i]){2&i&&!N&&(N=!0,clearTimeout(t),scrollTo(window.pageXOffset,e[1]),t=setTimeout(Z,100)),e[1]>=200?O?2&i&&Y(O,1):(O=ft(),O.c(),Y(O,1),O.m(r,null)):O&&(W(),G(O,1,1,(()=>{O=null})),X()),e[0]?P||(P=pt(),P.c(),P.m(y.parentNode,y)):P&&(P.d(1),P=null)},i(e){T||(Y(O),Y(b.$$.fragment,e),Y(C.$$.fragment,e),Y(k.$$.fragment,e),Y(q.$$.fragment,e),T=!0)},o(e){G(O),G(b.$$.fragment,e),G(C.$$.fragment,e),G(k.$$.fragment,e),G(q.$$.fragment,e),T=!1},d(e){e&&g(i),e&&g(n),O&&O.d(),ie(b),e&&g($),P&&P.d(e),e&&g(y),e&&g(L),ie(C),ie(k),ie(q),E=!1,a(S)}}}let wt="white";function bt(e,t,i){let{size:n="1em"}=t,a=!1,l=0;return e.$$set=e=>{"size"in e&&i(2,n=e.size)},[a,l,n,function(){i(1,l=window.pageYOffset)},()=>i(0,a=!a)]}return new class extends le{constructor(e){super(),ae(this,e,bt,gt,r,{size:2})}}({target:document.body,intro:!0,props:{name:"world"}})}();
//# sourceMappingURL=bundle.js.map