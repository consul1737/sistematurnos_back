"use strict";(self["webpackChunkpvn_fe"]=self["webpackChunkpvn_fe"]||[]).push([[644],{95263:function(t,o,s){s.r(o),s.d(o,{default:function(){return l}});var n=function(){var t=this,o=t._self._c;return o("v-container",[o("v-row",t._l(t.consultorios,(function(s){return o("v-col",{key:s.nombre,attrs:{cols:"12",md:"4"}},[o("v-card",{class:{"red lighten-2":t.hasConflict(s)},attrs:{outlined:""}},[o("v-card-title",{staticClass:"text-h6"},[t._v(t._s(s.nombre))]),o("v-card-subtitle",[o("v-list",t._l(s.turnos,(function(s){return o("v-list-item",{key:s.id_turno},[o("v-list-item-content",[o("div",{staticClass:"text-subtitle-1"},[t._v("Turno: "+t._s(s.nombre_paciente))]),o("div",{staticClass:"text-body-2"},[t._v("Hora: "+t._s(s.hora))]),o("div",{staticClass:"text-body-2"},[t._v("Teléfono: "+t._s(s.telefono))])])],1)})),1)],1)],1)],1)})),1)],1)},e=[],r=(s(44114),s(17642),s(58004),s(33853),s(45876),s(32475),s(15024),s(31698),s(98992),s(81454),s(8872),s(94373)),c={data(){return{consultorios:[]}},methods:{async fetchTurnos(){try{const t=await r.A.get("/Calendarturnos",{params:{fecha:(new Date).toISOString().split("T")[0]}}),o=t.data,s=o.reduce(((t,o)=>(t[o.consultorio]||(t[o.consultorio]={nombre:o.consultorio,turnos:[]}),t[o.consultorio].turnos.push(o),t)),{});this.consultorios=Object.values(s)}catch(t){console.error("Error fetching turnos:",t)}},hasConflict(t){const o=t.turnos.map((t=>t.hora)),s=new Set(o);return s.size!==o.length}},mounted(){this.fetchTurnos()}},i=c,a=s(81656),u=(0,a.A)(i,n,e,!1,null,"153bdb5b",null),l=u.exports}}]);
//# sourceMappingURL=644.9c3288c4.js.map