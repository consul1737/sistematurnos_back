"use strict";(self["webpackChunkpvn_fe"]=self["webpackChunkpvn_fe"]||[]).push([[558],{63558:function(e,o,n){n.r(o),n.d(o,{default:function(){return c}});var r=function(){var e=this,o=e._self._c;return o("v-container",[o("v-row",{attrs:{justify:"center"}},[o("v-col",{attrs:{md:"6",sm:"6"}},[o("v-card",[o("v-card-title",[e._v(" "+e._s(e.user.nombre||"Usuario no disponible")+" ")]),o("v-card-text",[o("h2",[e._v(e._s(e.user.email||"Correo no disponible"))]),o("h4",[e._v(e._s(e.user.telefono||"Teléfono no disponible"))])])],1)],1)],1)],1)},s=[],t={data:()=>({user:{nombre:"",email:"",telefono:""}}),created(){const e=sessionStorage.getItem("session");if(e)try{const o=JSON.parse(e);this.user={nombre:o.nombre||"Usuario no disponible",email:o.email||"Correo no disponible",telefono:o.telefono||"Teléfono no disponible"}}catch(o){console.error("Error al parsear sessionStorage: ",o)}else console.warn("No se encontró información en sessionStorage.")}},i=t,l=n(81656),a=(0,l.A)(i,r,s,!1,null,null,null),c=a.exports}}]);
//# sourceMappingURL=558.c96f7043.js.map