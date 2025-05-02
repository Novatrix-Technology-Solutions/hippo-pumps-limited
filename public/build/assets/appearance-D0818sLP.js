import{c as a,G as l,j as e,L as d}from"./app-CUw2shSB.js";import{c as s}from"./button-4tbM5t_w.js";import{S as h,H as x}from"./layout-B0CDMLLj.js";import{A as y}from"./app-layout-hlBs6G2N.js";import"./index-Bi9F_Kad.js";import"./index-CkAHG2tV.js";import"./sheet-BdaaL3aE.js";import"./index-C1iEQzXY.js";import"./index-BXO8TnTl.js";import"./index-xtY3ybVP.js";import"./index-oQu6TzoU.js";import"./index-Fv-1jlLf.js";import"./floating-ui.react-dom-DgslW023.js";import"./index-KxMCsC6_.js";import"./index-D_eJjq50.js";import"./app-logo-icon-CBpWYn23.js";/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const u=[["rect",{width:"20",height:"14",x:"2",y:"3",rx:"2",key:"48i651"}],["line",{x1:"8",x2:"16",y1:"21",y2:"21",key:"1svkeh"}],["line",{x1:"12",x2:"12",y1:"17",y2:"21",key:"vw1qmm"}]],g=a("Monitor",u);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const k=[["path",{d:"M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z",key:"a7tn18"}]],j=a("Moon",k);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const b=[["circle",{cx:"12",cy:"12",r:"4",key:"4exip2"}],["path",{d:"M12 2v2",key:"tus03m"}],["path",{d:"M12 20v2",key:"1lh1kg"}],["path",{d:"m4.93 4.93 1.41 1.41",key:"149t6j"}],["path",{d:"m17.66 17.66 1.41 1.41",key:"ptbguv"}],["path",{d:"M2 12h2",key:"1t8f8n"}],["path",{d:"M20 12h2",key:"1q8mjw"}],["path",{d:"m6.34 17.66-1.41 1.41",key:"1m8zz5"}],["path",{d:"m19.07 4.93-1.41 1.41",key:"1shlcs"}]],f=a("Sun",b);function v({className:n="",...o}){const{appearance:r,updateAppearance:i}=l(),p=[{value:"light",icon:f,label:"Light"},{value:"dark",icon:j,label:"Dark"},{value:"system",icon:g,label:"System"}];return e.jsx("div",{className:s("inline-flex gap-1 rounded-lg bg-neutral-100 p-1",n),...o,children:p.map(({value:t,icon:c,label:m})=>e.jsxs("button",{onClick:()=>i(t),className:s("flex items-center rounded-md px-3.5 py-1.5 transition-colors",r===t?"bg-white shadow-xs":"text-neutral-500 hover:bg-neutral-200/60 hover:text-black"),children:[e.jsx(c,{className:"-ml-1 h-4 w-4"}),e.jsx("span",{className:"ml-1.5 text-sm",children:m})]},t))})}const A=[{title:"Appearance settings",href:"/settings/appearance"}];function R(){return e.jsxs(y,{breadcrumbs:A,children:[e.jsx(d,{title:"Appearance settings"}),e.jsx(h,{children:e.jsxs("div",{className:"space-y-6",children:[e.jsx(x,{title:"Appearance settings",description:"Update your account's appearance settings"}),e.jsx(v,{})]})})]})}export{R as default};
