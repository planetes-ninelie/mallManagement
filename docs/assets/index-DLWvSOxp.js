import {
  M as y,
  d as Y,
  r as p,
  b as Z,
  J as F,
  e as s,
  N as ee,
  o as v,
  f as z,
  g as t,
  w as l,
  q as T,
  z as N,
  j as k,
  h as d,
  m as w,
  t as ae,
  D as x,
  C as q,
  P as _,
  _ as te,
} from './index-BUkeGmDr.js'
const le = (u, c) => y.get(`/admin/product/baseTrademark/${u}/${c}`),
  oe = (u) =>
    u.id
      ? y.put('/admin/product/baseTrademark/update', u)
      : y.post('/admin/product/baseTrademark/save', u),
  re = (u) => y.delete('/admin/product/baseTrademark/remove/' + u),
  se = { style: { color: 'brown' } },
  ne = ['src'],
  de = ['src'],
  ie = Y({
    __name: 'index',
    setup(u) {
      let c = p(1),
        f = p(3),
        C = p(0),
        V = p([]),
        i = p(!1),
        r = Z({ tmName: '', logoUrl: '' }),
        m = p()
      const g = async () => {
        let a = await le(c.value, f.value)
        a.code == 200 && ((C.value = a.data.total), (V.value = a.data.records))
      }
      F(() => {
        g()
      })
      const D = () => {
          ;(c.value = 1), g()
        },
        O = () => {
          ;(i.value = !0),
            (r.id = 0),
            (r.tmName = ''),
            (r.logoUrl = ''),
            q(() => {
              m.value.clearValidate('tmName'), m.value.clearValidate('logoUrl')
            })
        },
        P = () => {
          i.value = !1
        },
        j = async () => {
          await m.value.validate(),
            (await oe(r)).code == 200
              ? ((i.value = !1),
                _({
                  type: 'success',
                  message: r.id ? '修改品牌成功' : '添加品牌成功',
                }),
                g())
              : _({
                  type: 'error',
                  message: r.id ? '修改品牌失败' : '添加品牌失败',
                }),
            (i.value = !1)
        },
        E = (a, o) => {
          ;(r.logoUrl = a.data), m.value.clearValidate('logoUrl')
        },
        L = (a) =>
          a.type !== 'image/jpeg' &&
          a.type !== 'image/png' &&
          a.type !== 'image/gif'
            ? (_.error('上传的文件必须为: jpeg | png | gif'), !1)
            : a.size / 1024 / 1024 > 4
              ? (_.error('上传的文件大小超过4MB!'), !1)
              : !0,
        A = async (a) => {
          ;(await re(a)).code == 200
            ? (_({ type: 'success', message: '删除品牌成功' }), g())
            : _({ type: 'error', message: '删除品牌失败' })
        },
        M = {
          tmName: [
            {
              required: !0,
              trigger: 'blur',
              validator: (a, o, n) => {
                o.trim().length >= 2
                  ? n()
                  : n(new Error('品牌名称位数大于等于两位'))
              },
            },
          ],
          logoUrl: [
            {
              required: !0,
              trigger: 'change',
              validator: (a, o, n) => {
                o ? n() : n(new Error('Logo图片务必上传'))
              },
            },
          ],
        },
        S = (a) => {
          q(() => {
            m.value.clearValidate('tmName'), m.value.clearValidate('logoUrl')
          }),
            (i.value = !0),
            Object.assign(r, a)
        }
      return (a, o) => {
        const n = s('el-button'),
          b = s('el-table-column'),
          B = s('el-popconfirm'),
          R = s('el-table'),
          $ = s('el-pagination'),
          G = s('el-card'),
          H = s('el-input'),
          h = s('el-form-item'),
          I = s('Plus'),
          J = s('el-icon'),
          K = s('el-upload'),
          Q = s('el-form'),
          W = s('el-dialog'),
          U = ee('has')
        return (
          v(),
          z('div', null, [
            t(
              G,
              { class: 'card' },
              {
                default: l(() => [
                  T(
                    (v(),
                    N(
                      n,
                      {
                        type: 'primary',
                        size: 'default',
                        onClick: O,
                        icon: 'Plus',
                      },
                      { default: l(() => [k(' 添加品牌 ')]), _: 1 },
                    )),
                    [[U, 'btn.Trademark.add']],
                  ),
                  t(
                    R,
                    { border: '', class: 'table', data: d(V) },
                    {
                      default: l(() => [
                        t(b, {
                          label: '序号',
                          width: '80px',
                          align: 'center',
                          type: 'index',
                        }),
                        t(
                          b,
                          { label: '品牌名称' },
                          {
                            default: l(({ row: e }) => [
                              w('pre', se, ae(e.tmName), 1),
                            ]),
                            _: 1,
                          },
                        ),
                        t(
                          b,
                          { label: '品牌LOGO' },
                          {
                            default: l(({ row: e }) => [
                              w(
                                'img',
                                {
                                  style: { height: '100px' },
                                  src: e.logoUrl,
                                  alt: '暂无图片',
                                },
                                null,
                                8,
                                ne,
                              ),
                            ]),
                            _: 1,
                          },
                        ),
                        t(
                          b,
                          { label: '品牌操作' },
                          {
                            default: l(({ row: e }) => [
                              T(
                                t(
                                  n,
                                  {
                                    type: 'primary',
                                    size: 'small',
                                    icon: 'Edit',
                                    onClick: (X) => S(e),
                                  },
                                  null,
                                  8,
                                  ['onClick'],
                                ),
                                [[U, 'btn.Trademark.update']],
                              ),
                              T(
                                (v(),
                                N(
                                  B,
                                  {
                                    title: `确定要删除${e.tmName}吗？`,
                                    width: '250px',
                                    icon: 'Delete',
                                    'icon-color': 'red',
                                    onConfirm: (X) => A(e.id),
                                  },
                                  {
                                    reference: l(() => [
                                      t(n, null, {
                                        default: l(() => [k('删除')]),
                                        _: 1,
                                      }),
                                    ]),
                                    _: 2,
                                  },
                                  1032,
                                  ['title', 'onConfirm'],
                                )),
                                [[U, 'btn.Trademark.remove']],
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
                    $,
                    {
                      onSizeChange: D,
                      onCurrentChange: o[0] || (o[0] = (e) => g()),
                      'pager-count': 9,
                      'current-page': d(c),
                      'onUpdate:currentPage':
                        o[1] ||
                        (o[1] = (e) => (x(c) ? (c.value = e) : (c = e))),
                      'page-size': d(f),
                      'onUpdate:pageSize':
                        o[2] ||
                        (o[2] = (e) => (x(f) ? (f.value = e) : (f = e))),
                      'page-sizes': [3, 5, 7, 9],
                      background: !0,
                      layout: 'prev, pager, next, jumper, ->, sizes, total',
                      total: d(C),
                    },
                    null,
                    8,
                    ['current-page', 'page-size', 'total'],
                  ),
                ]),
                _: 1,
              },
            ),
            t(
              W,
              {
                modelValue: d(i),
                'onUpdate:modelValue':
                  o[4] || (o[4] = (e) => (x(i) ? (i.value = e) : (i = e))),
                title: d(r).id ? '修改品牌' : '添加品牌',
              },
              {
                footer: l(() => [
                  t(
                    n,
                    { type: 'primary', size: 'default', onClick: P },
                    { default: l(() => [k(' 取消 ')]), _: 1 },
                  ),
                  t(
                    n,
                    { type: 'primary', size: 'default', onClick: j },
                    { default: l(() => [k(' 确定 ')]), _: 1 },
                  ),
                ]),
                default: l(() => [
                  t(
                    Q,
                    {
                      style: { width: '80%' },
                      model: d(r),
                      rules: M,
                      ref_key: 'formRef',
                      ref: m,
                    },
                    {
                      default: l(() => [
                        t(
                          h,
                          {
                            label: '品牌名称',
                            'label-width': '80px',
                            prop: 'tmName',
                          },
                          {
                            default: l(() => [
                              t(
                                H,
                                {
                                  placeholder: '请输入品牌名称',
                                  modelValue: d(r).tmName,
                                  'onUpdate:modelValue':
                                    o[3] || (o[3] = (e) => (d(r).tmName = e)),
                                },
                                null,
                                8,
                                ['modelValue'],
                              ),
                            ]),
                            _: 1,
                          },
                        ),
                        t(
                          h,
                          {
                            label: '品牌LOGO',
                            'label-width': '80px',
                            prop: 'logoUrl',
                          },
                          {
                            default: l(() => [
                              t(
                                K,
                                {
                                  class: 'avatar-uploader',
                                  action: '/api/admin/product/fileUpload',
                                  'show-file-list': !1,
                                  'on-success': E,
                                  'before-upload': L,
                                },
                                {
                                  default: l(() => [
                                    d(r).logoUrl
                                      ? (v(),
                                        z(
                                          'img',
                                          {
                                            key: 0,
                                            src: d(r).logoUrl,
                                            class: 'avatar',
                                          },
                                          null,
                                          8,
                                          de,
                                        ))
                                      : (v(),
                                        N(
                                          J,
                                          {
                                            key: 1,
                                            class: 'avatar-uploader-icon',
                                          },
                                          { default: l(() => [t(I)]), _: 1 },
                                        )),
                                  ]),
                                  _: 1,
                                },
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
          ])
        )
      }
    },
  }),
  pe = te(ie, [['__scopeId', 'data-v-0ee9f069']])
export { pe as default }
