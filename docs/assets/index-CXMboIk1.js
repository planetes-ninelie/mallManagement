import { M as s } from './index-BUkeGmDr.js'
const o = () => s.get('/admin/acl/permission'),
  r = (e) => s.get('/admin/acl/permission/toAssign/' + e),
  t = (e, n) =>
    s.post('/admin/acl/permission/doAssignAcl', {
      roleId: e,
      permissionIdList: n,
    }),
  a = (e) => s.delete('/admin/acl/permission/remove/' + e),
  m = (e) =>
    e.id
      ? s.put('/admin/acl/permission/update', e)
      : s.post('/admin/acl/permission/save', e)
export { t as a, o as b, m as c, a as d, r }
