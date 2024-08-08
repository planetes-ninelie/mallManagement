import { b as A, c as U, d as h } from './index-CXMboIk1.js'
import {
  d as E,
  r as C,
  b as O,
  J as T,
  e as i,
  N as w,
  o as u,
  f as G,
  g as l,
  w as t,
  q as _,
  z as f,
  j as c,
  t as H,
  x as b,
  h as d,
  m as I,
  D as x,
  P as M,
  _ as J,
} from './index-BUkeGmDr.js'
const R = { class: 'dialog-footer' },
  S = E({
    __name: 'index',
    setup(F) {
      let y = C([]),
        s = C(!1),
        a = O({ code: '', level: 0, name: '', pid: 0 })
      T(() => {
        v()
      })
      const v = async () => {
          let o = await A()
          o.code == 200 && (y.value = o.data)
        },
        D = (o) => {
          Object.assign(a, { id: 0, code: '', level: 0, name: '', pid: 0 }),
            (s.value = !0),
            (a.level = o.level + 1),
            (a.pid = o.id)
        },
        N = (o) => {
          ;(s.value = !0), Object.assign(a, o)
        },
        P = async () => {
          ;(await U(a)).code == 200 &&
            ((s.value = !1),
            M({ type: 'success', message: a.id ? '更新成功' : '添加成功' }),
            v())
        },
        q = async (o) => {
          ;(await h(o)).code == 200 &&
            (M({ type: 'success', message: '删除成功' }), v())
        }
      return (o, n) => {
        const m = i('el-table-column'),
          r = i('el-button'),
          z = i('el-popconfirm'),
          B = i('el-table'),
          g = i('el-input'),
          V = i('el-form-item'),
          $ = i('el-form'),
          j = i('el-dialog'),
          p = w('has')
        return (
          u(),
          G('div', null, [
            l(
              B,
              { data: d(y), class: 'table', 'row-key': 'id', border: '' },
              {
                default: t(() => [
                  l(m, { label: '名称', prop: 'name' }),
                  l(m, { label: '权限值', prop: 'code' }),
                  l(m, { label: '修改时间', prop: 'updateTime' }),
                  l(
                    m,
                    { label: '操作' },
                    {
                      default: t(({ row: e }) => [
                        e.level != 4
                          ? _(
                              (u(),
                              f(
                                r,
                                {
                                  key: 0,
                                  type: 'success',
                                  onClick: (k) => D(e),
                                  size: 'small',
                                },
                                {
                                  default: t(() => [
                                    c(
                                      H(e.level == 3 ? '添加功能' : '添加菜单'),
                                      1,
                                    ),
                                  ]),
                                  _: 2,
                                },
                                1032,
                                ['onClick'],
                              )),
                              [[p, 'btn.Permission.add']],
                            )
                          : b('', !0),
                        e.level != 1
                          ? _(
                              (u(),
                              f(
                                r,
                                {
                                  key: 1,
                                  type: 'primary',
                                  onClick: (k) => N(e),
                                  size: 'small',
                                },
                                { default: t(() => [c(' 编辑 ')]), _: 2 },
                                1032,
                                ['onClick'],
                              )),
                              [[p, 'btn.Permission.update']],
                            )
                          : b('', !0),
                        _(
                          (u(),
                          f(
                            z,
                            {
                              title: `确定删除${e.name}吗?`,
                              width: '250px',
                              onConfirm: (k) => q(e.id),
                            },
                            {
                              reference: t(() => [
                                e.level != 1
                                  ? _(
                                      (u(),
                                      f(
                                        r,
                                        {
                                          key: 0,
                                          type: 'warning',
                                          size: 'small',
                                        },
                                        {
                                          default: t(() => [c(' 删除 ')]),
                                          _: 1,
                                        },
                                      )),
                                      [[p, 'btn.Permission.remove']],
                                    )
                                  : b('', !0),
                              ]),
                              _: 2,
                            },
                            1032,
                            ['title', 'onConfirm'],
                          )),
                          [[p, 'btn.Permission.remove']],
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
            l(
              j,
              {
                modelValue: d(s),
                'onUpdate:modelValue':
                  n[3] || (n[3] = (e) => (x(s) ? (s.value = e) : (s = e))),
                title: d(a).id ? '更新菜单' : '添加菜单',
              },
              {
                footer: t(() => [
                  I('span', R, [
                    l(
                      r,
                      {
                        onClick:
                          n[2] ||
                          (n[2] = (e) => (x(s) ? (s.value = !1) : (s = !1))),
                      },
                      { default: t(() => [c('取消')]), _: 1 },
                    ),
                    l(
                      r,
                      { type: 'primary', onClick: P },
                      { default: t(() => [c('确定')]), _: 1 },
                    ),
                  ]),
                ]),
                default: t(() => [
                  l($, null, {
                    default: t(() => [
                      l(
                        V,
                        { label: '名称' },
                        {
                          default: t(() => [
                            l(
                              g,
                              {
                                placeholder: '请输入菜单名称',
                                modelValue: d(a).name,
                                'onUpdate:modelValue':
                                  n[0] || (n[0] = (e) => (d(a).name = e)),
                              },
                              null,
                              8,
                              ['modelValue'],
                            ),
                          ]),
                          _: 1,
                        },
                      ),
                      l(
                        V,
                        { label: '权限' },
                        {
                          default: t(() => [
                            l(
                              g,
                              {
                                placeholder: '请输入权限数值',
                                modelValue: d(a).code,
                                'onUpdate:modelValue':
                                  n[1] || (n[1] = (e) => (d(a).code = e)),
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
                  }),
                ]),
                _: 1,
              },
              8,
              ['modelValue', 'title'],
            ),
          ])
        )
      }
    },
  }),
  Q = J(S, [['__scopeId', 'data-v-83affc12']])
export { Q as default }
