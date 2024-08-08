import {
  M as $,
  d as ve,
  r as d,
  b as O,
  J as ge,
  B as _e,
  e as c,
  N as ye,
  o as v,
  f as K,
  g as a,
  w as o,
  h as s,
  D as C,
  j as m,
  q as R,
  z as k,
  m as T,
  t as Q,
  x as be,
  F as we,
  y as Ve,
  O as he,
  P as g,
  C as W,
  p as Ue,
  k as Ce,
  _ as ke,
} from './index-BUkeGmDr.js'
import { g as xe } from './index-CUqr2nka.js'
const X = (n, _, y) => $.get(`/admin/acl/user/${n}/${_}/?username=${y}`),
  Ne = (n) =>
    n.id
      ? $.put('/admin/acl/user/update', n)
      : $.post('/admin/acl/user/save', n),
  $e = (n) => $.post('/admin/acl/user/doAssignRole', n),
  De = (n) => $.delete('/admin/acl/user/remove/' + n),
  Se = (n) => $.delete('/admin/acl/user/batchRemove', { data: n }),
  ze = (n) => (Ue('data-v-c2cb9b38'), (n = n()), Ce(), n),
  Re = { style: { flex: 'auto' } },
  Ie = ze(() => T('h4', null, '分配角色', -1)),
  qe = { style: { flex: 'auto' } },
  Ee = ve({
    __name: 'index',
    setup(n) {
      let _ = d(1),
        y = d(5),
        F = d(0),
        P = d([]),
        x = d(''),
        b = d(!1),
        I = d(!1),
        u = O({ id: 0, name: '', username: '', password: '' }),
        h = d(),
        U = d(!1),
        w = d([]),
        N = O({ id: 0 }),
        V = d(),
        D = d(!1)
      const j = d(!0),
        q = d([])
      let B = d([])
      ge(() => {
        S()
      }),
        _e(
          () => q.value,
          () => {
            q.value.forEach((t) => {
              B.value.push(t.id)
            })
          },
        )
      const S = async () => {
          let t = await X(_.value, y.value, '')
          t.code == 200 &&
            ((F.value = t.data.total), (P.value = t.data.records))
        },
        E = () => {
          ;(_.value = 1), S()
        },
        Y = async () => {
          let t = await X(1, y.value, x.value)
          t.code == 200 &&
            ((P.value = t.data.records), (F.value = t.data.total))
        },
        Z = () => {
          ;(x.value = ''), E()
        },
        ee = async (t) => {
          var r
          ;(U.value = !0), (N = t)
          let e = await xe(1, 999, '')
          e.code == 200
            ? ((w.value = e.data.records),
              (V.value = (r = t.roleName) == null ? void 0 : r.split(',')),
              w.value.forEach((i) => {
                i.remark = V.value.includes(i.roleName)
              }))
            : g({ type: 'error', message: '获取分配角色信息失败！' })
        },
        le = () => {
          U.value = !1
        },
        ae = (t) => {
          var e
          ;(V.value = t
            ? (e = w.value) == null
              ? void 0
              : e.map((r) => r.roleName)
            : []),
            (j.value = !1)
        },
        te = (t) => {
          var r, i
          const e = t.length
          ;(D.value = e === ((r = w.value) == null ? void 0 : r.length)),
            (j.value = e > 0 && e < ((i = w.value) == null ? void 0 : i.length))
        },
        oe = async () => {
          let t = O({ userId: N.id, roleIdList: [] })
          w.value.forEach((r) => {
            V.value.includes(r.roleName) && t.roleIdList.push(r.id)
          }),
            (await $e(t)).code == 200
              ? (g({ type: 'success', message: `已为${N.name}分配角色` }),
                (U.value = !1),
                E())
              : (g({ type: 'error', message: `为${N.name}分配角色失败` }), E())
        },
        re = (t) => {
          ;(b.value = !0),
            (I.value = !0),
            Object.assign(u, { id: t.id, name: t.name, username: t.username }),
            W(() => {
              h.value.clearValidate('username'), h.value.clearValidate('name')
            })
        },
        se = async (t) => {
          ;(await De(t.id)).code == 200
            ? (g({
                type: 'success',
                message: `删除用户昵称${t.username}成功!`,
              }),
              S())
            : g({ type: 'error', message: `删除用户昵称${t.username}失败!` })
        },
        ne = () => {
          ;(b.value = !0),
            (I.value = !1),
            Object.assign(u, { name: '', username: '', password: '' }),
            W(() => {
              h.value.clearValidate('username'),
                h.value.clearValidate('name'),
                h.value.clearValidate('password')
            })
        },
        de = () => {
          b.value = !1
        },
        ue = async () => {
          await h.value.validate(),
            (await Ne(u)).code == 200
              ? (g({
                  type: 'success',
                  message: `${u.id ? '修改' : '添加'}用户昵称${u.username}成功!`,
                }),
                (b.value = !1),
                window.location.reload())
              : g({
                  type: 'error',
                  message: `${u.id ? '修改' : '添加'}用户昵称${u.username}失败!`,
                })
        },
        ie = {
          username: [
            {
              required: !0,
              trigger: 'blur',
              validator: (t, e, r) => {
                e.trim().length >= 5 ? r() : r(new Error('用户姓名至少为五位'))
              },
            },
          ],
          name: [
            {
              required: !0,
              trigger: 'blur',
              validator: (t, e, r) => {
                e.trim().length >= 5 ? r() : r(new Error('用户昵称至少为五位'))
              },
            },
          ],
          password: [
            {
              required: !0,
              trigger: 'blur',
              validator: (t, e, r) => {
                e.trim().length >= 5 ? r() : r(new Error('用户密码至少为六位'))
              },
            },
          ],
        },
        me = async () => {
          let t = await Se(B.value),
            e = q.value.map((r) => r.username).toString()
          t.code == 200
            ? (g({ type: 'success', message: `删除${e}成功！` }), S())
            : g({ type: 'error', message: `删除${e}失败！` })
        },
        pe = (t) => {
          q.value = t
        }
      return (t, e) => {
        const r = c('el-input'),
          i = c('el-form-item'),
          p = c('el-button'),
          L = c('el-form'),
          M = c('el-card'),
          H = c('el-popconfirm'),
          J = c('el-drawer'),
          G = c('el-checkbox'),
          ce = c('el-checkbox-group'),
          f = c('el-table-column'),
          fe = c('el-pagination'),
          z = ye('has')
        return (
          v(),
          K('div', null, [
            a(
              M,
              { style: { 'margin-bottom': '10px', height: '75px' } },
              {
                default: o(() => [
                  a(
                    L,
                    { inline: !0, class: 'form-top' },
                    {
                      default: o(() => [
                        a(
                          i,
                          { label: '用户昵称：' },
                          {
                            default: o(() => [
                              a(
                                r,
                                {
                                  type: 'text',
                                  placeholder: '请输入用户昵称',
                                  modelValue: s(x),
                                  'onUpdate:modelValue':
                                    e[0] ||
                                    (e[0] = (l) =>
                                      C(x) ? (x.value = l) : (x = l)),
                                  style: { width: '240px' },
                                },
                                null,
                                8,
                                ['modelValue'],
                              ),
                            ]),
                            _: 1,
                          },
                        ),
                        a(i, null, {
                          default: o(() => [
                            a(
                              p,
                              {
                                type: 'success',
                                icon: 'Search',
                                style: { 'margin-right': '15px' },
                                onClick: e[1] || (e[1] = (l) => Y()),
                              },
                              { default: o(() => [m(' 搜索 ')]), _: 1 },
                            ),
                            a(
                              p,
                              {
                                type: 'default',
                                icon: 'Refresh',
                                onClick: e[2] || (e[2] = (l) => Z()),
                              },
                              { default: o(() => [m(' 重置 ')]), _: 1 },
                            ),
                          ]),
                          _: 1,
                        }),
                      ]),
                      _: 1,
                    },
                  ),
                ]),
                _: 1,
              },
            ),
            a(M, null, {
              default: o(() => [
                R(
                  (v(),
                  k(
                    p,
                    {
                      type: 'primary',
                      icon: 'Plus',
                      onClick: e[3] || (e[3] = (l) => ne()),
                    },
                    { default: o(() => [m(' 添加 ')]), _: 1 },
                  )),
                  [[z, 'btn.User.add']],
                ),
                a(
                  H,
                  {
                    title: '确定删除所选的用户数据吗？',
                    onConfirm: e[4] || (e[4] = (l) => me()),
                    width: '250',
                  },
                  {
                    reference: o(() => [
                      R(
                        (v(),
                        k(
                          p,
                          {
                            type: 'warning',
                            icon: 'Delete',
                            disabled: !s(B).length,
                          },
                          { default: o(() => [m(' 批量删除 ')]), _: 1 },
                          8,
                          ['disabled'],
                        )),
                        [[z, 'btn.User.remove']],
                      ),
                    ]),
                    _: 1,
                  },
                ),
                a(
                  J,
                  {
                    modelValue: s(b),
                    'onUpdate:modelValue':
                      e[9] || (e[9] = (l) => (C(b) ? (b.value = l) : (b = l))),
                    direction: 'rtl',
                  },
                  {
                    header: o(() => [
                      T('h4', null, Q(s(I) ? '修改用户' : '添加用户'), 1),
                    ]),
                    default: o(() => [
                      a(
                        L,
                        { model: s(u), rules: ie, ref_key: 'formRef', ref: h },
                        {
                          default: o(() => [
                            a(
                              i,
                              { label: '用户姓名', prop: 'name' },
                              {
                                default: o(() => [
                                  a(
                                    r,
                                    {
                                      placeholder: '请填写用户名字',
                                      modelValue: s(u).name,
                                      'onUpdate:modelValue':
                                        e[5] || (e[5] = (l) => (s(u).name = l)),
                                    },
                                    null,
                                    8,
                                    ['modelValue'],
                                  ),
                                ]),
                                _: 1,
                              },
                            ),
                            a(
                              i,
                              { label: '用户昵称', prop: 'username' },
                              {
                                default: o(() => [
                                  a(
                                    r,
                                    {
                                      placeholder: '请填写用户昵称',
                                      modelValue: s(u).username,
                                      'onUpdate:modelValue':
                                        e[6] ||
                                        (e[6] = (l) => (s(u).username = l)),
                                    },
                                    null,
                                    8,
                                    ['modelValue'],
                                  ),
                                ]),
                                _: 1,
                              },
                            ),
                            s(I)
                              ? be('', !0)
                              : (v(),
                                k(
                                  i,
                                  {
                                    key: 0,
                                    label: '用户密码',
                                    prop: 'password',
                                  },
                                  {
                                    default: o(() => [
                                      a(
                                        r,
                                        {
                                          placeholder: '请填写用户密码',
                                          modelValue: s(u).password,
                                          'onUpdate:modelValue':
                                            e[7] ||
                                            (e[7] = (l) => (s(u).password = l)),
                                        },
                                        null,
                                        8,
                                        ['modelValue'],
                                      ),
                                    ]),
                                    _: 1,
                                  },
                                )),
                          ]),
                          _: 1,
                        },
                        8,
                        ['model'],
                      ),
                    ]),
                    footer: o(() => [
                      T('div', Re, [
                        a(
                          p,
                          { onClick: de },
                          { default: o(() => [m('取消')]), _: 1 },
                        ),
                        a(
                          p,
                          {
                            type: 'primary',
                            onClick: e[8] || (e[8] = (l) => ue()),
                          },
                          { default: o(() => [m('提交')]), _: 1 },
                        ),
                      ]),
                    ]),
                    _: 1,
                  },
                  8,
                  ['modelValue'],
                ),
                a(
                  J,
                  {
                    modelValue: s(U),
                    'onUpdate:modelValue':
                      e[14] ||
                      (e[14] = (l) => (C(U) ? (U.value = l) : (U = l))),
                    direction: 'rtl',
                  },
                  {
                    header: o(() => [Ie]),
                    default: o(() => [
                      a(
                        L,
                        { model: s(w) },
                        {
                          default: o(() => [
                            a(
                              i,
                              { label: '用户姓名' },
                              {
                                default: o(() => [
                                  a(
                                    r,
                                    {
                                      placeholder: '请填写用户名字',
                                      modelValue: s(N).name,
                                      'onUpdate:modelValue':
                                        e[10] ||
                                        (e[10] = (l) => (s(N).name = l)),
                                      disabled: '',
                                    },
                                    null,
                                    8,
                                    ['modelValue'],
                                  ),
                                ]),
                                _: 1,
                              },
                            ),
                            a(
                              i,
                              { label: '角色列表' },
                              {
                                default: o(() => [
                                  a(
                                    G,
                                    {
                                      modelValue: s(D),
                                      'onUpdate:modelValue':
                                        e[11] ||
                                        (e[11] = (l) =>
                                          C(D) ? (D.value = l) : (D = l)),
                                      size: 'large',
                                      indeterminate: j.value,
                                      onChange: ae,
                                    },
                                    { default: o(() => [m(' 全选 ')]), _: 1 },
                                    8,
                                    ['modelValue', 'indeterminate'],
                                  ),
                                  a(
                                    ce,
                                    {
                                      modelValue: s(V),
                                      'onUpdate:modelValue':
                                        e[12] ||
                                        (e[12] = (l) =>
                                          C(V) ? (V.value = l) : (V = l)),
                                      onChange: te,
                                    },
                                    {
                                      default: o(() => [
                                        (v(!0),
                                        K(
                                          we,
                                          null,
                                          Ve(
                                            s(w),
                                            (l) => (
                                              v(),
                                              k(
                                                G,
                                                {
                                                  key: l.id,
                                                  modelValue: l.remark,
                                                  'onUpdate:modelValue': (A) =>
                                                    (l.remark = A),
                                                  value: l.roleName,
                                                  size: 'large',
                                                },
                                                {
                                                  default: o(() => [
                                                    m(Q(l.roleName), 1),
                                                  ]),
                                                  _: 2,
                                                },
                                                1032,
                                                [
                                                  'modelValue',
                                                  'onUpdate:modelValue',
                                                  'value',
                                                ],
                                              )
                                            ),
                                          ),
                                          128,
                                        )),
                                      ]),
                                      _: 1,
                                    },
                                    8,
                                    ['modelValue'],
                                  ),
                                ]),
                                _: 1,
                              },
                            ),
                          ]),
                          _: 1,
                        },
                        8,
                        ['model'],
                      ),
                    ]),
                    footer: o(() => [
                      T('div', qe, [
                        a(
                          p,
                          { onClick: le },
                          { default: o(() => [m('取消')]), _: 1 },
                        ),
                        a(
                          p,
                          {
                            type: 'primary',
                            onClick: e[13] || (e[13] = (l) => oe()),
                          },
                          { default: o(() => [m('提交')]), _: 1 },
                        ),
                      ]),
                    ]),
                    _: 1,
                  },
                  8,
                  ['modelValue'],
                ),
                a(
                  s(he),
                  {
                    border: '',
                    data: s(P),
                    style: { width: '100%', margin: '10px 0' },
                    onSelectionChange: pe,
                  },
                  {
                    default: o(() => [
                      a(f, { type: 'selection', align: 'center', width: '55' }),
                      a(f, {
                        type: 'index',
                        align: 'center',
                        width: '75',
                        label: '#',
                      }),
                      a(f, {
                        property: 'id',
                        align: 'center',
                        label: 'id',
                        width: '100',
                      }),
                      a(f, {
                        property: 'username',
                        label: '用户昵称',
                        align: 'center',
                        'show-overflow-tooltip': '',
                      }),
                      a(f, {
                        property: 'name',
                        label: '用户姓名',
                        align: 'center',
                        'show-overflow-tooltip': '',
                      }),
                      a(f, {
                        property: 'roleName',
                        label: '用户角色',
                        align: 'center',
                        'show-overflow-tooltip': '',
                      }),
                      a(f, {
                        property: 'createTime',
                        label: '创建时间',
                        align: 'center',
                        'show-overflow-tooltip': '',
                      }),
                      a(f, {
                        property: 'updateTime',
                        label: '更新时间',
                        align: 'center',
                        'show-overflow-tooltip': '',
                      }),
                      a(
                        f,
                        { label: '操作', align: 'center', width: '300' },
                        {
                          default: o(({ row: l }) => [
                            R(
                              (v(),
                              k(
                                p,
                                {
                                  type: 'success',
                                  size: 'small',
                                  icon: 'User',
                                  onClick: (A) => ee(l),
                                },
                                { default: o(() => [m(' 分配角色 ')]), _: 2 },
                                1032,
                                ['onClick'],
                              )),
                              [[z, 'btn.User.assgin']],
                            ),
                            R(
                              (v(),
                              k(
                                p,
                                {
                                  type: 'primary',
                                  size: 'small',
                                  icon: 'Edit',
                                  onClick: (A) => re(l),
                                },
                                { default: o(() => [m(' 编辑 ')]), _: 2 },
                                1032,
                                ['onClick'],
                              )),
                              [[z, 'btn.User.update']],
                            ),
                            a(
                              H,
                              {
                                title: `确定删除${l.userName}吗？`,
                                onConfirm: (A) => se(l),
                                width: '250',
                              },
                              {
                                reference: o(() => [
                                  R(
                                    (v(),
                                    k(
                                      p,
                                      {
                                        type: 'warning',
                                        size: 'small',
                                        icon: 'Delete',
                                      },
                                      { default: o(() => [m(' 删除 ')]), _: 1 },
                                    )),
                                    [[z, 'btn.User.remove']],
                                  ),
                                ]),
                                _: 2,
                              },
                              1032,
                              ['title', 'onConfirm'],
                            ),
                          ]),
                          _: 1,
                        },
                      ),
                    ]),
                    _: 1,
                  },
                  8,
                  ['data'],
                ),
                a(
                  fe,
                  {
                    onSizeChange: E,
                    onCurrentChange: e[15] || (e[15] = (l) => S()),
                    'pager-count': 9,
                    'current-page': s(_),
                    'onUpdate:currentPage':
                      e[16] ||
                      (e[16] = (l) => (C(_) ? (_.value = l) : (_ = l))),
                    'page-size': s(y),
                    'onUpdate:pageSize':
                      e[17] ||
                      (e[17] = (l) => (C(y) ? (y.value = l) : (y = l))),
                    'page-sizes': [5, 10, 15, 20],
                    background: !0,
                    layout: 'prev, pager, next, jumper, ->, sizes, total',
                    total: s(F),
                  },
                  null,
                  8,
                  ['current-page', 'page-size', 'total'],
                ),
              ]),
              _: 1,
            }),
          ])
        )
      }
    },
  }),
  Be = ke(Ee, [['__scopeId', 'data-v-c2cb9b38']])
export { Be as default }
