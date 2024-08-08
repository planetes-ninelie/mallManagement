import { g as G, r as ce, a as pe, b as me } from './index-CUqr2nka.js'
import { r as fe, a as ve } from './index-CXMboIk1.js'
import {
  d as ge,
  r as n,
  b as E,
  J as _e,
  B as ye,
  e as i,
  N as he,
  o as w,
  f as we,
  g as t,
  w as a,
  h as r,
  j as d,
  q as R,
  z as x,
  D as q,
  m as B,
  O as be,
  C as j,
  P as p,
  p as Ne,
  k as ke,
  _ as Ce,
} from './index-BUkeGmDr.js'
const Re = (V) => (Ne('data-v-43e017b1'), (V = V()), ke(), V),
  xe = { class: 'dialog-footer' },
  Ve = Re(() => B('h4', null, '分配权限', -1)),
  De = { style: { flex: 'auto' } },
  $e = ge({
    __name: 'index',
    setup(V) {
      let v = n(1),
        g = n(5),
        P = n(0),
        I = n([]),
        b = E({ roleName: '', id: 0 }),
        m = n(!1),
        K = n(!1),
        u = E({ roleName: '', id: 0 }),
        D = n(),
        _ = n(!1),
        $ = E([]),
        S = E({ id: 0 }),
        N = n()
      const z = n([])
      let O = n([])
      const J = { value: 'id', label: 'name', children: 'children' }
      let U = n([]),
        k = n([])
      _e(() => {
        y()
      }),
        ye(
          () => z.value,
          () => {
            z.value.forEach((l) => {
              O.value.push(l.id)
            })
          },
        )
      const y = async () => {
          let l = await G(v.value, g.value, '')
          l.code == 200 &&
            ((P.value = l.data.total), (I.value = l.data.records))
        },
        T = () => {
          ;(v.value = 1), y()
        },
        Q = async () => {
          let l = await G(1, g.value, b.roleName)
          l.code == 200 &&
            ((I.value = l.data.records), (P.value = l.data.total))
        },
        W = () => {
          ;(b.roleName = ''), T()
        },
        X = async (l) => {
          S = l
          let e = await fe(l.id)
          if (e.code == 200) {
            let c = function (h) {
              h.forEach((s) => {
                s.select &&
                  (k.value.push(s.id),
                  s.children.length == 0 && (U.value.push(s.id), k.value.pop()),
                  c(s.children))
              })
            }
            Object.assign($, e.data),
              ($ = e.data),
              await j(() => {
                _.value = !0
              }),
              (k.value.length = 0),
              (U.value.length = 0),
              c($),
              N.value.setCheckedKeys(U.value),
              N.value.setExpandedKeys(k.value)
          } else p({ type: 'error', message: '获取分配权限信息失败！' })
        },
        F = () => {
          _.value = !1
        },
        Y = async () => {
          let l = N.value.getCheckedKeys(),
            e = N.value.getHalfCheckedKeys(),
            c = l.concat(e)
          ;(await ve(S.id, c)).code == 200
            ? (p({ type: 'success', message: `已为${S.roleName}分配权限` }),
              F(),
              y())
            : p({ type: 'error', message: `为${S.roleName}分配角色失败` })
        },
        Z = async (l) => {
          ;(await ce(l.id)).code == 200
            ? (p({
                type: 'success',
                message: `删除角色名称${l.roleName}成功!`,
              }),
              y())
            : p({ type: 'error', message: `删除角色名称${l.roleName}失败!` })
        },
        ee = () => {
          ;(m.value = !0),
            (K.value = !1),
            Object.assign(u, { roleName: '' }),
            j(() => {
              D.value.clearValidate('roleName')
            })
        },
        le = (l) => {
          ;(m.value = !0),
            (K.value = !0),
            Object.assign(u, { id: l.id, roleName: l.roleName }),
            j(() => {
              D.value.clearValidate('roleName')
            })
        },
        te = () => {
          m.value = !1
        },
        ae = async () => {
          await D.value.validate(),
            (await pe(u)).code == 200
              ? (p({
                  type: 'success',
                  message: `${u.id ? '修改' : '添加'}用户昵称${u.roleName}成功!`,
                }),
                (m.value = !1),
                window.location.reload())
              : p({
                  type: 'error',
                  message: `${u.id ? '修改' : '添加'}用户昵称${u.roleName}失败!`,
                })
        },
        oe = {
          roleName: [
            {
              required: !0,
              trigger: 'blur',
              validator: (l, e) => {
                l.trim().length >= 2 ? e() : e(new Error('角色名称至少为两位'))
              },
            },
          ],
        },
        re = async () => {
          let l = await me(O.value),
            e = z.value.map((c) => c.roleName).toString()
          l.code == 200
            ? (p({ type: 'success', message: `删除${e}成功！` }), y())
            : p({ type: 'error', message: `删除${e}失败！` })
        },
        se = (l) => {
          z.value = l
        }
      return (l, e) => {
        const c = i('el-input'),
          h = i('el-form-item'),
          s = i('el-button'),
          A = i('el-form'),
          M = i('el-card'),
          H = i('el-popconfirm'),
          ne = i('el-dialog'),
          ie = i('el-tree-v2'),
          de = i('el-drawer'),
          f = i('el-table-column'),
          ue = i('el-pagination'),
          C = he('has')
        return (
          w(),
          we('div', null, [
            t(
              M,
              { style: { 'margin-bottom': '10px', height: '75px' } },
              {
                default: a(() => [
                  t(
                    A,
                    { class: 'form-top', data: r(b) },
                    {
                      default: a(() => [
                        t(
                          h,
                          { label: '角色名称：' },
                          {
                            default: a(() => [
                              t(
                                c,
                                {
                                  type: 'text',
                                  placeholder: '请输入角色名称',
                                  modelValue: r(b).roleName,
                                  'onUpdate:modelValue':
                                    e[0] || (e[0] = (o) => (r(b).roleName = o)),
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
                        t(h, null, {
                          default: a(() => [
                            t(
                              s,
                              {
                                type: 'success',
                                icon: 'Search',
                                style: { 'margin-right': '15px' },
                                onClick: e[1] || (e[1] = (o) => Q()),
                              },
                              { default: a(() => [d(' 搜索 ')]), _: 1 },
                            ),
                            t(
                              s,
                              {
                                type: 'default',
                                icon: 'Refresh',
                                onClick: e[2] || (e[2] = (o) => W()),
                              },
                              { default: a(() => [d(' 重置 ')]), _: 1 },
                            ),
                          ]),
                          _: 1,
                        }),
                      ]),
                      _: 1,
                    },
                    8,
                    ['data'],
                  ),
                ]),
                _: 1,
              },
            ),
            t(M, null, {
              default: a(() => [
                R(
                  (w(),
                  x(
                    s,
                    {
                      type: 'primary',
                      icon: 'Plus',
                      onClick: e[3] || (e[3] = (o) => ee()),
                    },
                    { default: a(() => [d(' 添加 ')]), _: 1 },
                  )),
                  [[C, 'btn.Role.add']],
                ),
                t(
                  H,
                  {
                    title: '确定删除所选的角色数据吗？',
                    onConfirm: e[4] || (e[4] = (o) => re()),
                    width: '250',
                  },
                  {
                    reference: a(() => [
                      R(
                        (w(),
                        x(
                          s,
                          {
                            type: 'warning',
                            icon: 'Delete',
                            disabled: !r(O).length,
                          },
                          { default: a(() => [d(' 批量删除 ')]), _: 1 },
                          8,
                          ['disabled'],
                        )),
                        [[C, 'btn.Role.remove']],
                      ),
                    ]),
                    _: 1,
                  },
                ),
                t(
                  ne,
                  {
                    modelValue: r(m),
                    'onUpdate:modelValue':
                      e[7] || (e[7] = (o) => (q(m) ? (m.value = o) : (m = o))),
                    title: r(K) ? '修改角色职位' : '添加角色职位',
                    width: '500',
                  },
                  {
                    footer: a(() => [
                      B('div', xe, [
                        t(
                          s,
                          { onClick: te },
                          { default: a(() => [d('取消')]), _: 1 },
                        ),
                        t(
                          s,
                          {
                            type: 'primary',
                            onClick: e[6] || (e[6] = (o) => ae()),
                          },
                          { default: a(() => [d(' 提交 ')]), _: 1 },
                        ),
                      ]),
                    ]),
                    default: a(() => [
                      t(
                        A,
                        { model: r(u), rules: oe, ref_key: 'formRef', ref: D },
                        {
                          default: a(() => [
                            t(
                              h,
                              { label: '角色名称', prop: 'roleName' },
                              {
                                default: a(() => [
                                  t(
                                    c,
                                    {
                                      placeholder: '请填写角色名称',
                                      modelValue: r(u).roleName,
                                      'onUpdate:modelValue':
                                        e[5] ||
                                        (e[5] = (o) => (r(u).roleName = o)),
                                    },
                                    null,
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
                    _: 1,
                  },
                  8,
                  ['modelValue', 'title'],
                ),
                t(
                  de,
                  {
                    modelValue: r(_),
                    'onUpdate:modelValue':
                      e[8] || (e[8] = (o) => (q(_) ? (_.value = o) : (_ = o))),
                    direction: 'rtl',
                  },
                  {
                    header: a(() => [Ve]),
                    default: a(() => [
                      t(
                        ie,
                        {
                          data: r($),
                          height: 500,
                          props: J,
                          'show-checkbox': '',
                          'default-checked-keys': r(U),
                          'default-expanded-keys': r(k),
                          'node-key': 'id',
                          ref_key: 'tree',
                          ref: N,
                        },
                        null,
                        8,
                        [
                          'data',
                          'default-checked-keys',
                          'default-expanded-keys',
                        ],
                      ),
                    ]),
                    footer: a(() => [
                      B('div', De, [
                        t(
                          s,
                          { onClick: F },
                          { default: a(() => [d('取消')]), _: 1 },
                        ),
                        t(
                          s,
                          { type: 'primary', onClick: Y },
                          { default: a(() => [d('提交')]), _: 1 },
                        ),
                      ]),
                    ]),
                    _: 1,
                  },
                  8,
                  ['modelValue'],
                ),
                t(
                  r(be),
                  {
                    border: '',
                    data: r(I),
                    style: { width: '100%', margin: '10px 0' },
                    onSelectionChange: se,
                  },
                  {
                    default: a(() => [
                      t(f, { type: 'selection', align: 'center', width: '55' }),
                      t(f, {
                        type: 'index',
                        align: 'center',
                        width: '75',
                        label: '#',
                      }),
                      t(f, {
                        property: 'id',
                        align: 'center',
                        label: 'id',
                        width: '100',
                      }),
                      t(f, {
                        property: 'roleName',
                        label: '角色名称',
                        align: 'center',
                        'show-overflow-tooltip': '',
                      }),
                      t(f, {
                        property: 'createTime',
                        label: '创建时间',
                        align: 'center',
                        'show-overflow-tooltip': '',
                      }),
                      t(f, {
                        property: 'updateTime',
                        label: '更新时间',
                        align: 'center',
                        'show-overflow-tooltip': '',
                      }),
                      t(
                        f,
                        { label: '操作', align: 'center', width: '300' },
                        {
                          default: a(({ row: o }) => [
                            R(
                              (w(),
                              x(
                                s,
                                {
                                  type: 'success',
                                  size: 'small',
                                  icon: 'User',
                                  onClick: (L) => X(o),
                                },
                                { default: a(() => [d(' 分配权限 ')]), _: 2 },
                                1032,
                                ['onClick'],
                              )),
                              [[C, 'btn.Role.assgin']],
                            ),
                            R(
                              (w(),
                              x(
                                s,
                                {
                                  type: 'primary',
                                  size: 'small',
                                  icon: 'Edit',
                                  onClick: (L) => le(o),
                                },
                                { default: a(() => [d(' 编辑 ')]), _: 2 },
                                1032,
                                ['onClick'],
                              )),
                              [[C, 'btn.Role.update']],
                            ),
                            t(
                              H,
                              {
                                title: `确定删除${o.roleName}吗？`,
                                onConfirm: (L) => Z(o),
                                width: '250',
                              },
                              {
                                reference: a(() => [
                                  R(
                                    (w(),
                                    x(
                                      s,
                                      {
                                        type: 'warning',
                                        size: 'small',
                                        icon: 'Delete',
                                      },
                                      { default: a(() => [d(' 删除 ')]), _: 1 },
                                    )),
                                    [[C, 'btn.Role.remove']],
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
                t(
                  ue,
                  {
                    onSizeChange: T,
                    onCurrentChange: e[9] || (e[9] = (o) => y()),
                    'pager-count': 9,
                    'current-page': r(v),
                    'onUpdate:currentPage':
                      e[10] ||
                      (e[10] = (o) => (q(v) ? (v.value = o) : (v = o))),
                    'page-size': r(g),
                    'onUpdate:pageSize':
                      e[11] ||
                      (e[11] = (o) => (q(g) ? (g.value = o) : (g = o))),
                    'page-sizes': [5, 10, 15, 20],
                    background: !0,
                    layout: 'prev, pager, next, jumper, ->, sizes, total',
                    total: r(P),
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
  qe = Ce($e, [['__scopeId', 'data-v-43e017b1']])
export { qe as default }
