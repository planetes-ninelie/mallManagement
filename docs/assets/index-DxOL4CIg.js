import{M as a}from"./index-DvPOz_za.js";const r=(e,t,l)=>a.get(`/admin/acl/role/${e}/${t}/?roleName=${l}`),s=e=>e.id?a.put("/admin/acl/role/update",e):a.post("/admin/acl/role/save",e),d=e=>a.delete("/admin/acl/role/remove/"+e),n=e=>a.delete("/admin/acl/role/batchRemove",{data:e});export{s as a,n as b,r as g,d as r};
