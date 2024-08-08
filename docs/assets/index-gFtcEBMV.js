import {
  M as C,
  d as Y,
  r as k,
  J as Z,
  e as r,
  N as ee,
  o as s,
  z as p,
  w as l,
  g as t,
  h as a,
  m as V,
  q as N,
  D as q,
  j as i,
  f as h,
  t as g,
  F as U,
  y as $,
  x as te,
  P as D,
  p as le,
  k as ae,
  _ as ne,
} from './index-BUkeGmDr.js'
const oe = (u, _) => C.get(`/admin/product/list/${u}/${_}`),
  se = (u) => C.get('/admin/product/getSkuInfo/' + u),
  ue = (u) => C.get('/admin/product/onSale/' + u),
  de = (u) => C.get('/admin/product/cancelSale/' + u),
  re = (u) => C.delete('/admin/product/deleteSku/' + u),
  ce = (u) => (le('data-v-0ced4b39'), (u = u()), ae(), u),
  ie = ['src', 'alt'],
  pe = ce(() => V('h2', null, '查看商品详情', -1)),
  _e = { key: 0 },
  me = { key: 0 },
  fe = { key: 0 },
  ke = ['src'],
  ge = Y({
    __name: 'index',
    setup(u) {
      let _ = k(1),
        x = k(3),
        B = k(0),
        L = k([]),
        m = k(!1),
        y = k(!0),
        o = k({})
      Z(() => {
        b()
      })
      const b = async () => {
          let d = await oe(_.value, x.value)
          d.code == 200 &&
            ((L.value = d.data.records), (B.value = d.data.total))
        },
        A = () => {
          ;(_.value = 1), b()
        },
        E = async (d) => {
          ;(await (d.isSale == 1 ? de(d.id) : ue(d.id))).code == 200
            ? (D({
                type: 'success',
                message: d.isSale == 1 ? '下架成功！' : '上架成功',
              }),
              b())
            : D({ type: 'error', message: '下架失败！' })
        },
        F = async (d) => {
          ;(m.value = !0), (y.value = !1)
        },
        M = async (d) => {
          ;(m.value = !0), (y.value = !0)
          let n = await se(d.id)
          n.code == 200 && ((o.value = n.data), console.log(o.value))
        },
        j = () => {
          m.value = !1
        },
        P = () => {},
        J = async (d) => {
          ;(await re(d.id)).code == 200
            ? (D({ type: 'success', message: '删除成功' }), b())
            : D({ type: 'error', message: '删除失败' })
        }
      return (d, n) => {
        const f = r('el-table-column'),
          S = r('el-button'),
          O = r('el-popconfirm'),
          R = r('el-table'),
          G = r('el-pagination'),
          c = r('el-col'),
          I = r('el-input'),
          v = r('el-form-item'),
          T = r('el-tag'),
          H = r('el-carousel-item'),
          K = r('el-carousel'),
          Q = r('el-form'),
          W = r('el-drawer'),
          X = r('el-card'),
          w = ee('has')
        return (
          s(),
          p(X, null, {
            default: l(() => [
              t(
                R,
                { border: '', data: a(L), class: 'table' },
                {
                  default: l(() => [
                    t(f, {
                      label: '序号',
                      type: 'index',
                      align: 'center',
                      width: '80px',
                    }),
                    t(f, { label: '名称', width: '200px', prop: 'skuName' }),
                    t(f, { label: '描述', width: '250px', prop: 'skuDesc' }),
                    t(
                      f,
                      { label: '图片', width: '150px' },
                      {
                        default: l(({ row: e }) => [
                          V(
                            'img',
                            {
                              src: e.skuDefaultImg,
                              alt: `暂无图片-${e.skuName}`,
                              height: '100px',
                            },
                            null,
                            8,
                            ie,
                          ),
                        ]),
                        _: 1,
                      },
                    ),
                    t(f, { label: '重量', width: '150px', prop: 'weight' }),
                    t(f, { label: '价格', width: '150px', prop: 'price' }),
                    t(
                      f,
                      { label: '操作', width: '300px', fixed: 'right' },
                      {
                        default: l(({ row: e }) => [
                          N(
                            t(
                              S,
                              {
                                icon: e.isSale == 1 ? 'Bottom' : 'Top',
                                type: e.isSale == 1 ? '' : 'success',
                                onClick: (z) => E(e),
                              },
                              null,
                              8,
                              ['icon', 'type', 'onClick'],
                            ),
                            [[w, 'btn.Sku.updown']],
                          ),
                          N(
                            t(
                              S,
                              {
                                icon: 'Edit',
                                type: 'primary',
                                onClick: (z) => F(e),
                              },
                              null,
                              8,
                              ['onClick'],
                            ),
                            [[w, 'btn.Sku.update']],
                          ),
                          N(
                            t(
                              S,
                              {
                                icon: 'InfoFilled',
                                type: 'info',
                                onClick: (z) => M(e),
                              },
                              null,
                              8,
                              ['onClick'],
                            ),
                            [[w, 'btn.Sku.detail']],
                          ),
                          N(
                            (s(),
                            p(
                              O,
                              {
                                title: `确定删除${e.skuName}吗？`,
                                width: '200px',
                                onConfirm: (z) => J(e),
                              },
                              {
                                reference: l(() => [
                                  t(S, { icon: 'Delete', type: 'danger' }),
                                ]),
                                _: 2,
                              },
                              1032,
                              ['title', 'onConfirm'],
                            )),
                            [[w, 'btn.Sku.remove']],
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
                G,
                {
                  'current-page': a(_),
                  'onUpdate:currentPage':
                    n[0] || (n[0] = (e) => (q(_) ? (_.value = e) : (_ = e))),
                  'page-size': a(x),
                  'onUpdate:pageSize':
                    n[1] || (n[1] = (e) => (q(x) ? (x.value = e) : (x = e))),
                  'page-sizes': [3, 5, 10, 15],
                  background: !0,
                  layout: 'prev, pager, next, jumper, ->, sizes, total',
                  total: a(B),
                  onSizeChange: A,
                  onCurrentChange: n[2] || (n[2] = (e) => b()),
                },
                null,
                8,
                ['current-page', 'page-size', 'total'],
              ),
              t(
                W,
                {
                  modelValue: a(m),
                  'onUpdate:modelValue':
                    n[6] || (n[6] = (e) => (q(m) ? (m.value = e) : (m = e))),
                },
                {
                  header: l(() => [pe]),
                  default: l(() => [
                    t(
                      Q,
                      { data: a(o) },
                      {
                        default: l(() => [
                          t(v, null, {
                            default: l(() => [
                              t(
                                c,
                                { span: 4 },
                                { default: l(() => [i('名称')]), _: 1 },
                              ),
                              t(
                                c,
                                { span: 20 },
                                {
                                  default: l(() => [
                                    a(y)
                                      ? (s(), h('text', _e, g(a(o).skuName), 1))
                                      : (s(),
                                        p(
                                          I,
                                          {
                                            key: 1,
                                            modelValue: a(o).skuName,
                                            'onUpdate:modelValue':
                                              n[3] ||
                                              (n[3] = (e) =>
                                                (a(o).skuName = e)),
                                            placeholder: '请填写名称',
                                          },
                                          null,
                                          8,
                                          ['modelValue'],
                                        )),
                                  ]),
                                  _: 1,
                                },
                              ),
                            ]),
                            _: 1,
                          }),
                          t(v, null, {
                            default: l(() => [
                              t(
                                c,
                                { span: 4 },
                                { default: l(() => [i('描述')]), _: 1 },
                              ),
                              t(
                                c,
                                { span: 20 },
                                {
                                  default: l(() => [
                                    a(y)
                                      ? (s(), h('text', me, g(a(o).skuDesc), 1))
                                      : (s(),
                                        p(
                                          I,
                                          {
                                            key: 1,
                                            modelValue: a(o).skuDesc,
                                            'onUpdate:modelValue':
                                              n[4] ||
                                              (n[4] = (e) =>
                                                (a(o).skuDesc = e)),
                                            placeholder: '请填写描述',
                                          },
                                          null,
                                          8,
                                          ['modelValue'],
                                        )),
                                  ]),
                                  _: 1,
                                },
                              ),
                            ]),
                            _: 1,
                          }),
                          t(v, null, {
                            default: l(() => [
                              t(
                                c,
                                { span: 4 },
                                { default: l(() => [i('价格')]), _: 1 },
                              ),
                              t(
                                c,
                                { span: 20 },
                                {
                                  default: l(() => [
                                    a(y)
                                      ? (s(), h('text', fe, g(a(o).price), 1))
                                      : (s(),
                                        p(
                                          I,
                                          {
                                            key: 1,
                                            modelValue: a(o).price,
                                            'onUpdate:modelValue':
                                              n[5] ||
                                              (n[5] = (e) => (a(o).price = e)),
                                            placeholder: '请填写价格',
                                          },
                                          null,
                                          8,
                                          ['modelValue'],
                                        )),
                                  ]),
                                  _: 1,
                                },
                              ),
                            ]),
                            _: 1,
                          }),
                          t(v, null, {
                            default: l(() => [
                              t(
                                c,
                                { span: 4 },
                                { default: l(() => [i('平台属性')]), _: 1 },
                              ),
                              t(
                                c,
                                { span: 20 },
                                {
                                  default: l(() => [
                                    (s(!0),
                                    h(
                                      U,
                                      null,
                                      $(
                                        a(o).skuAttrValueList,
                                        (e) => (
                                          s(),
                                          p(
                                            T,
                                            { type: 'info', key: e.id },
                                            {
                                              default: l(() => [
                                                i(g(e.valueName), 1),
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
                            ]),
                            _: 1,
                          }),
                          t(v, null, {
                            default: l(() => [
                              t(
                                c,
                                { span: 4 },
                                { default: l(() => [i('销售属性')]), _: 1 },
                              ),
                              t(
                                c,
                                { span: 20 },
                                {
                                  default: l(() => [
                                    (s(!0),
                                    h(
                                      U,
                                      null,
                                      $(
                                        a(o).skuSaleAttrValueList,
                                        (e) => (
                                          s(),
                                          p(
                                            T,
                                            { type: 'info', key: e.id },
                                            {
                                              default: l(() => [
                                                i(g(e.saleAttrValueName), 1),
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
                            ]),
                            _: 1,
                          }),
                          t(v, null, {
                            default: l(() => [
                              t(
                                c,
                                { span: 4 },
                                { default: l(() => [i('商品图片')]), _: 1 },
                              ),
                              t(
                                c,
                                { span: 20 },
                                {
                                  default: l(() => [
                                    t(
                                      K,
                                      {
                                        interval: 4e3,
                                        type: 'card',
                                        height: '200px',
                                      },
                                      {
                                        default: l(() => [
                                          (s(!0),
                                          h(
                                            U,
                                            null,
                                            $(
                                              a(o).skuImageList,
                                              (e) => (
                                                s(),
                                                p(
                                                  H,
                                                  { key: e.id },
                                                  {
                                                    default: l(() => [
                                                      V(
                                                        'img',
                                                        {
                                                          src: e.imgUrl,
                                                          height: '100%',
                                                        },
                                                        null,
                                                        8,
                                                        ke,
                                                      ),
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
                      ['data'],
                    ),
                  ]),
                  footer: l(() => [
                    V('h6', null, '创建时间：' + g(a(o).createTime), 1),
                    V('h6', null, '更新时间：' + g(a(o).updateTime), 1),
                    a(y)
                      ? te('', !0)
                      : (s(),
                        p(
                          S,
                          { key: 0, type: 'success', onClick: P },
                          { default: l(() => [i(' 保存 ')]), _: 1 },
                        )),
                    t(
                      S,
                      { type: 'default', onClick: j },
                      { default: l(() => [i('取消')]), _: 1 },
                    ),
                  ]),
                  _: 1,
                },
                8,
                ['modelValue'],
              ),
            ]),
            _: 1,
          })
        )
      }
    },
  }),
  Se = ne(ge, [['__scopeId', 'data-v-0ced4b39']])
export { Se as default }
