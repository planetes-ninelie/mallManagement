import {
  d as K,
  Q as M,
  r as h,
  b as Q,
  B as G,
  R as H,
  K as W,
  e as o,
  N as X,
  o as m,
  f as x,
  g as e,
  h as s,
  w as a,
  q as p,
  m as I,
  z as k,
  j as _,
  F as Y,
  y as Z,
  t as B,
  v as S,
  C as U,
  S as ee,
  P as y,
  U as te,
} from './index-BUkeGmDr.js'
const ae = ['onClick'],
  ne = K({
    __name: 'index',
    setup(le) {
      let f = M(),
        N = h([]),
        d = h(0),
        l = Q({
          attrName: '',
          attrValueList: [],
          categoryId: '',
          categoryLevel: 3,
        }),
        V = h([])
      G(
        () => f.c3Id,
        () => {
          ;(N.value = []), f.c3Id && C()
        },
      )
      const C = async () => {
          const { c1Id: n, c2Id: i, c3Id: b } = f
          let r = await H(n, i, b)
          r.code == 200 && ((N.value = r.data), console.log(r.data))
        },
        D = () => {
          Object.assign(l, {
            attrName: '',
            attrValueList: [],
            categoryId: f.c3Id,
            categoryLevel: 3,
          }),
            (d.value = 1)
        },
        O = (n) => {
          ;(d.value = 1), Object.assign(l, JSON.parse(JSON.stringify(n)))
        },
        L = () => {
          d.value = 0
        },
        T = () => {
          l.attrValueList.push({ valueName: '', flag: !0 }),
            U(() => {
              V.value[l.attrValueList.length - 1].focus()
            })
        },
        $ = async () => {
          ;(await ee(l)).code == 200
            ? ((d.value = 0),
              y({ type: 'success', message: l.id ? '修改成功' : '添加成功' }),
              C())
            : y({ type: 'error', message: l.id ? '修改失败' : '添加失败' })
        },
        q = (n, i) => {
          if (n.valueName.trim() == '') {
            l.attrValueList.splice(i, 1),
              y({ type: 'error', message: '属性值不能为空' })
            return
          }
          if (
            l.attrValueList.find((r) => {
              if (r != n) return r.valueName === n.valueName
            })
          ) {
            y({ type: 'error', message: '属性值不能重复' })
            return
          }
          n.flag = !1
        },
        E = (n, i) => {
          ;(n.flag = !0),
            U(() => {
              V.value[i].focus()
            })
        },
        P = async (n) => {
          ;(await te(n)).code == 200
            ? (y({ type: 'success', message: '删除成功' }), C())
            : y({ type: 'error', message: '删除成功' })
        }
      return (
        W(() => {
          f.$reset()
        }),
        (n, i) => {
          const b = o('Category'),
            r = o('el-button'),
            u = o('el-table-column'),
            j = o('el-tag'),
            w = o('el-popconfirm'),
            A = o('el-table'),
            z = o('el-input'),
            F = o('el-form-item'),
            J = o('el-form'),
            R = o('el-card'),
            g = X('has')
          return (
            m(),
            x('div', null, [
              e(b, { scene: s(d) }, null, 8, ['scene']),
              e(
                R,
                { style: { margin: '10px 0px' } },
                {
                  default: a(() => [
                    p(
                      I(
                        'div',
                        null,
                        [
                          p(
                            (m(),
                            k(
                              r,
                              {
                                type: 'primary',
                                size: 'default',
                                icon: 'Plus',
                                onClick: D,
                                disabled: !s(f).c3Id,
                              },
                              { default: a(() => [_(' 添加属性 ')]), _: 1 },
                              8,
                              ['disabled'],
                            )),
                            [[g, 'btn.Attr.add']],
                          ),
                          e(
                            A,
                            {
                              border: '',
                              style: { margin: '10px 0px' },
                              data: s(N),
                            },
                            {
                              default: a(() => [
                                e(u, {
                                  label: '序号',
                                  type: 'index',
                                  align: 'center',
                                  width: '80px',
                                }),
                                e(u, {
                                  label: '属性名称',
                                  align: 'center',
                                  width: '120px',
                                  prop: 'attrName',
                                }),
                                e(
                                  u,
                                  { label: '属性值名称', align: 'center' },
                                  {
                                    default: a(({ row: t }) => [
                                      (m(!0),
                                      x(
                                        Y,
                                        null,
                                        Z(
                                          t.attrValueList,
                                          (c) => (
                                            m(),
                                            k(
                                              j,
                                              {
                                                key: c.id,
                                                style: { margin: '5px' },
                                              },
                                              {
                                                default: a(() => [
                                                  _(B(c.valueName), 1),
                                                ]),
                                                _: 2,
                                              },
                                              1024,
                                            )
                                          ),
                                        ),
                                        128,
                                      )),
                                    ]),
                                    _: 1,
                                  },
                                ),
                                e(
                                  u,
                                  {
                                    label: '操作',
                                    align: 'center',
                                    width: '120px',
                                  },
                                  {
                                    default: a(({ row: t }) => [
                                      p(
                                        e(
                                          r,
                                          {
                                            type: 'primary',
                                            size: 'small',
                                            icon: 'Edit',
                                            onClick: (c) => O(t),
                                          },
                                          null,
                                          8,
                                          ['onClick'],
                                        ),
                                        [[g, 'btn.Attr.update']],
                                      ),
                                      e(
                                        w,
                                        {
                                          title: `确定删除${t.attrName}吗？`,
                                          width: '200px',
                                          onConfirm: (c) => P(t.id),
                                        },
                                        {
                                          reference: a(() => [
                                            p(
                                              e(
                                                r,
                                                {
                                                  type: 'primary',
                                                  size: 'small',
                                                  icon: 'Delete',
                                                },
                                                null,
                                                512,
                                              ),
                                              [[g, 'btn.Trademark.remove']],
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
                        ],
                        512,
                      ),
                      [[S, s(d) == 0]],
                    ),
                    p(
                      I(
                        'div',
                        null,
                        [
                          e(
                            J,
                            { inline: !0 },
                            {
                              default: a(() => [
                                e(
                                  F,
                                  { label: '属性名称' },
                                  {
                                    default: a(() => [
                                      e(
                                        z,
                                        {
                                          placeholder: '请输入属性名称',
                                          modelValue: s(l).attrName,
                                          'onUpdate:modelValue':
                                            i[0] ||
                                            (i[0] = (t) => (s(l).attrName = t)),
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
                          ),
                          p(
                            (m(),
                            k(
                              r,
                              {
                                onClick: T,
                                disabled: !s(l).attrName,
                                type: 'primary',
                                size: 'default',
                                icon: 'Plus',
                              },
                              { default: a(() => [_(' 添加属性值 ')]), _: 1 },
                              8,
                              ['disabled'],
                            )),
                            [[g, 'btn.Trademark.add']],
                          ),
                          e(
                            r,
                            { type: 'primary', size: 'default', onClick: L },
                            { default: a(() => [_(' 取消 ')]), _: 1 },
                          ),
                          e(
                            A,
                            {
                              border: '',
                              style: { margin: '10px 0' },
                              data: s(l).attrValueList,
                            },
                            {
                              default: a(() => [
                                e(u, {
                                  label: '序号',
                                  width: '80px',
                                  type: 'index',
                                  align: 'center',
                                }),
                                e(
                                  u,
                                  { label: '属性值名称' },
                                  {
                                    default: a(({ row: t, $index: c }) => [
                                      t.flag
                                        ? (m(),
                                          k(
                                            z,
                                            {
                                              key: 0,
                                              ref: (v) => (s(V)[c] = v),
                                              size: 'small',
                                              onBlur: (v) => q(t, c),
                                              placeholder: '请输入属性值名称',
                                              modelValue: t.valueName,
                                              'onUpdate:modelValue': (v) =>
                                                (t.valueName = v),
                                            },
                                            null,
                                            8,
                                            [
                                              'onBlur',
                                              'modelValue',
                                              'onUpdate:modelValue',
                                            ],
                                          ))
                                        : (m(),
                                          x(
                                            'div',
                                            { key: 1, onClick: (v) => E(t, c) },
                                            B(t.valueName),
                                            9,
                                            ae,
                                          )),
                                    ]),
                                    _: 1,
                                  },
                                ),
                                e(
                                  u,
                                  { label: '属性值操作' },
                                  {
                                    default: a(({ index: t }) => [
                                      p(
                                        e(
                                          r,
                                          {
                                            type: 'primary',
                                            size: 'default',
                                            icon: 'Delete',
                                            onClick: (c) =>
                                              s(l).attrValueList.splice(t, 1),
                                          },
                                          null,
                                          8,
                                          ['onClick'],
                                        ),
                                        [[g, 'btn.Trademark.remove']],
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
                          e(
                            r,
                            {
                              type: 'primary',
                              size: 'default',
                              onClick: $,
                              disabled: !(s(l).attrValueList.length > 0),
                            },
                            { default: a(() => [_(' 保存 ')]), _: 1 },
                            8,
                            ['disabled'],
                          ),
                          e(
                            r,
                            { type: 'primary', size: 'default', onClick: L },
                            { default: a(() => [_(' 取消 ')]), _: 1 },
                          ),
                        ],
                        512,
                      ),
                      [[S, s(d) == 1]],
                    ),
                  ]),
                  _: 1,
                },
              ),
            ])
          )
        }
      )
    },
  })
export { ne as default }
