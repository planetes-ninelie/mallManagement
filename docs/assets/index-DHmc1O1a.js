import {
  M as $,
  d as Z,
  r as c,
  V as ie,
  e as s,
  o as _,
  z as h,
  w as t,
  g as e,
  h as u,
  f as B,
  F as M,
  y as T,
  D as O,
  m as X,
  j as F,
  t as pe,
  P as z,
  _ as te,
  b as ce,
  R as me,
  Q as _e,
  B as fe,
  K as ge,
  N as Se,
  q as H,
  v as Y,
} from './index-BUkeGmDr.js'
const ye = (S, v, b) => $.get(`/admin/product/${S}/${v}?category3Id=${b}`),
  ee = () => $.get('/admin/product/baseTrademark/getTrademarkList'),
  ae = (S) => $.get('/admin/product/spuImageList/' + S),
  ue = (S) => $.get('/admin/product/spuSaleAttrList/' + S),
  le = () => $.get('/admin/product/baseSaleAttrList'),
  ve = (S) =>
    S.id
      ? $.post('/admin/product/updateSpuInfo', S)
      : $.post('/admin/product/saveSpuInfo', S),
  be = (S) => $.post('/admin/product/saveSkuInfo', S),
  Ve = (S) => $.get('/admin/product/findBySpuId/' + S),
  ke = (S) => $.delete('/admin/product/deleteSpu/' + S),
  Ie = ['src'],
  Ae = Z({
    __name: 'spuForm',
    emits: ['changeScene'],
    setup(S, { expose: v, emit: b }) {
      let I = b
      const w = () => {
        I('changeScene', { flag: 0, params: 'update' })
      }
      let C = c([]),
        V = c([]),
        o = c([]),
        N = c([]),
        L = c(!1),
        r = c({
          category3Id: '',
          spuName: '',
          description: '',
          tmId: '',
          spuImageList: [],
          spuSaleAttrList: [],
        }),
        x = c(''),
        A = c('')
      const P = async (l) => {
          r.value = l
          let a = await ee(),
            y = await ae(l.id),
            U = await ue(l.id),
            E = await le()
          ;(V.value = y.data.map((D) => ({ name: D.imgName, url: D.imgUrl }))),
            (C.value = a.data),
            (o.value = U.data),
            (N.value = E.data)
        },
        d = (l) => {
          ;(x.value = l.url), (L.value = !0)
        },
        i = () => {},
        m = (l) =>
          l.type == 'image/png' ||
          l.type == 'image/jpeg' ||
          l.type == 'image/gif'
            ? l.size / 1024 / 1024 < 3
              ? !0
              : (z({ type: 'error', message: '上传文件必须小于3MB!' }), !1)
            : (z({ type: 'error', message: '上传文件必须为PNG|JPG|GIF' }), !1)
      let k = ie(() =>
        N.value.filter((a) => o.value.every((y) => a.name != y.saleAttrName)),
      )
      const K = () => {
          const [l, a] = A.value.split(':')
          let y = {
            baseSaleAttrId: l,
            saleAttrName: a,
            spuSaleAttrValueList: [],
          }
          o.value.push(y), (A.value = '')
        },
        p = (l) => {
          ;(l.flag = !0), (l.saleAttrValue = '')
        },
        f = (l) => {
          const { baseSaleAttrId: a, saleAttrValue: y } = l
          let U = { baseSaleAttrId: a, saleAttrValueName: y }
          if (y.trim() == '') {
            z({ type: 'error', message: '属性值不能为空！' }), (l.flag = !1)
            return
          }
          if (l.spuSaleAttrValueList.find((D) => D.saleAttrValueName == y)) {
            z({ type: 'error', message: '属性值重复！' })
            return
          }
          l.spuSaleAttrValueList.push(U), (l.flag = !1)
        },
        R = async () => {
          ;(r.value.spuImageList = V.value.map((a) => ({
            imgName: a.name,
            imgUrl: (a.response && a.response.data) || a.url,
          }))),
            (r.value.spuSaleAttrList = o.value),
            (await ve(r.value)).code == 200
              ? (z({
                  type: 'success',
                  message: r.value.id ? '更新成功' : '添加成功',
                }),
                I('changeScene', {
                  flag: 0,
                  params: r.value.id ? 'update' : 'add',
                }))
              : z({
                  type: 'error',
                  message: r.value.id ? '更新成功' : '添加成功',
                })
        }
      return (
        v({
          initHasSpuData: P,
          initAddSpu: async (l) => {
            Object.assign(r.value, {
              category3Id: '',
              spuName: '',
              description: '',
              tmId: '',
              spuImageList: [],
              spuSaleAttrList: [],
            }),
              (V.value = []),
              (o.value = []),
              (A.value = ''),
              (r.value.category3Id = l)
            let a = await ee(),
              y = await le()
            ;(C.value = a.data), (N.value = y.data)
          },
        }),
        (l, a) => {
          const y = s('el-input'),
            U = s('el-form-item'),
            E = s('el-option'),
            D = s('el-select'),
            j = s('Plus'),
            g = s('el-icon'),
            J = s('el-upload'),
            ne = s('el-dialog'),
            Q = s('el-button'),
            W = s('el-table-column'),
            se = s('el-tag'),
            oe = s('el-table'),
            re = s('el-form')
          return (
            _(),
            h(
              re,
              { 'label-width': '100px' },
              {
                default: t(() => [
                  e(
                    U,
                    { label: 'SPU名称' },
                    {
                      default: t(() => [
                        e(
                          y,
                          {
                            placeholder: '请输入SPU名称',
                            class: 'widthStyle',
                            modelValue: u(r).spuName,
                            'onUpdate:modelValue':
                              a[0] || (a[0] = (n) => (u(r).spuName = n)),
                          },
                          null,
                          8,
                          ['modelValue'],
                        ),
                      ]),
                      _: 1,
                    },
                  ),
                  e(
                    U,
                    { label: 'SPU品牌' },
                    {
                      default: t(() => [
                        e(
                          D,
                          {
                            class: 'widthStyle',
                            modelValue: u(r).tmId,
                            'onUpdate:modelValue':
                              a[1] || (a[1] = (n) => (u(r).tmId = n)),
                          },
                          {
                            default: t(() => [
                              (_(!0),
                              B(
                                M,
                                null,
                                T(
                                  u(C),
                                  (n) => (
                                    _(),
                                    h(
                                      E,
                                      {
                                        key: n.id,
                                        label: n.tmName,
                                        value: n.id,
                                      },
                                      null,
                                      8,
                                      ['label', 'value'],
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
                  e(
                    U,
                    { label: 'SPU描述' },
                    {
                      default: t(() => [
                        e(
                          y,
                          {
                            type: 'textarea',
                            placeholder: '请输入描述',
                            modelValue: u(r).description,
                            'onUpdate:modelValue':
                              a[2] || (a[2] = (n) => (u(r).description = n)),
                          },
                          null,
                          8,
                          ['modelValue'],
                        ),
                      ]),
                      _: 1,
                    },
                  ),
                  e(
                    U,
                    { label: 'SPU图标' },
                    {
                      default: t(() => [
                        e(
                          J,
                          {
                            'file-list': u(V),
                            'onUpdate:fileList':
                              a[3] ||
                              (a[3] = (n) => (O(V) ? (V.value = n) : (V = n))),
                            action: '/api/admin/product/fileUpload',
                            'list-type': 'picture-card',
                            'on-preview': d,
                            'on-remove': i,
                            'before-upload': m,
                          },
                          {
                            default: t(() => [
                              e(g, null, { default: t(() => [e(j)]), _: 1 }),
                            ]),
                            _: 1,
                          },
                          8,
                          ['file-list'],
                        ),
                        e(
                          ne,
                          {
                            modelValue: u(L),
                            'onUpdate:modelValue':
                              a[4] ||
                              (a[4] = (n) => (O(L) ? (L.value = n) : (L = n))),
                          },
                          {
                            default: t(() => [
                              X(
                                'img',
                                {
                                  'w-full': '',
                                  src: u(x),
                                  alt: 'Preview Image',
                                  style: { width: '100%', height: '100%' },
                                },
                                null,
                                8,
                                Ie,
                              ),
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
                  e(
                    U,
                    { label: 'SPU销售属性' },
                    {
                      default: t(() => [
                        e(
                          D,
                          {
                            modelValue: u(A),
                            'onUpdate:modelValue':
                              a[5] ||
                              (a[5] = (n) => (O(A) ? (A.value = n) : (A = n))),
                            class: 'widthStyle',
                            placeholder: u(k).length
                              ? `还未选择${u(k).length}个`
                              : '无',
                          },
                          {
                            default: t(() => [
                              (_(!0),
                              B(
                                M,
                                null,
                                T(
                                  u(k),
                                  (n) => (
                                    _(),
                                    h(
                                      E,
                                      {
                                        key: n.id,
                                        label: n.name,
                                        value: `${n.id}:${n.name}`,
                                      },
                                      null,
                                      8,
                                      ['label', 'value'],
                                    )
                                  ),
                                ),
                                128,
                              )),
                            ]),
                            _: 1,
                          },
                          8,
                          ['modelValue', 'placeholder'],
                        ),
                        e(
                          Q,
                          {
                            style: { 'margin-left': '10px' },
                            type: 'primary',
                            size: 'default',
                            icon: 'Plus',
                            disabled: !u(A),
                            onClick: K,
                          },
                          { default: t(() => [F(' 添加属性值 ')]), _: 1 },
                          8,
                          ['disabled'],
                        ),
                        e(
                          oe,
                          {
                            border: '',
                            style: { margin: '10px 0px' },
                            data: u(o),
                          },
                          {
                            default: t(() => [
                              e(W, {
                                label: '序号',
                                type: 'index',
                                align: 'center',
                                width: '80px',
                              }),
                              e(W, {
                                label: '销售属性名字',
                                width: '120px',
                                prop: 'saleAttrName',
                              }),
                              e(
                                W,
                                { label: '销售属性值' },
                                {
                                  default: t(({ row: n }) => [
                                    (_(!0),
                                    B(
                                      M,
                                      null,
                                      T(
                                        n.spuSaleAttrValueList,
                                        (G, de) => (
                                          _(),
                                          h(
                                            se,
                                            {
                                              style: { margin: '0px 5px' },
                                              key: n.id,
                                              closable: '',
                                              onClose: (Ne) =>
                                                n.spuSaleAttrValueList.splice(
                                                  de,
                                                  1,
                                                ),
                                            },
                                            {
                                              default: t(() => [
                                                F(pe(G.saleAttrValueName), 1),
                                              ]),
                                              _: 2,
                                            },
                                            1032,
                                            ['onClose'],
                                          )
                                        ),
                                      ),
                                      128,
                                    )),
                                    n.flag
                                      ? (_(),
                                        h(
                                          y,
                                          {
                                            key: 0,
                                            modelValue: n.saleAttrValue,
                                            'onUpdate:modelValue': (G) =>
                                              (n.saleAttrValue = G),
                                            onBlur: (G) => f(n),
                                            placeholder: '请输入属性值',
                                            style: { width: '150px' },
                                            size: 'small',
                                          },
                                          null,
                                          8,
                                          [
                                            'modelValue',
                                            'onUpdate:modelValue',
                                            'onBlur',
                                          ],
                                        ))
                                      : (_(),
                                        h(
                                          Q,
                                          {
                                            key: 1,
                                            type: 'primary',
                                            size: 'small',
                                            onClick: (G) => p(n),
                                            icon: 'Plus',
                                          },
                                          null,
                                          8,
                                          ['onClick'],
                                        )),
                                  ]),
                                  _: 1,
                                },
                              ),
                              e(
                                W,
                                { label: '操作', width: '120px' },
                                {
                                  default: t(({ $index: n }) => [
                                    e(
                                      Q,
                                      {
                                        type: 'primary',
                                        size: 'small',
                                        icon: 'Delete',
                                        onClick: (G) => u(o).splice(n, 1),
                                      },
                                      null,
                                      8,
                                      ['onClick'],
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
                      ]),
                      _: 1,
                    },
                  ),
                  e(U, null, {
                    default: t(() => [
                      e(
                        Q,
                        { type: 'primary', size: 'default', onClick: R },
                        { default: t(() => [F('保存')]), _: 1 },
                      ),
                      e(
                        Q,
                        { type: 'primary', size: 'default', onClick: w },
                        { default: t(() => [F('取消')]), _: 1 },
                      ),
                    ]),
                    _: 1,
                  }),
                ]),
                _: 1,
              },
            )
          )
        }
      )
    },
  }),
  Ue = te(Ae, [['__scopeId', 'data-v-32aa52a8']]),
  he = ['src'],
  we = Z({
    __name: 'skuForm',
    emits: ['changeScene'],
    setup(S, { expose: v, emit: b }) {
      let I = b,
        w = c([]),
        C = c([]),
        V = c([]),
        o = ce({
          category3Id: '',
          spuId: '',
          tmId: '',
          skuName: '',
          price: '',
          weight: '',
          skuDesc: '',
          skuAttrValueList: [],
          skuSaleAttrValueList: [],
          skuDefaultImg: '',
        }),
        N = c()
      const L = () => {
          I('changeScene', { flag: 0, params: '' })
        },
        r = async (P, d, i) => {
          ;(o.category3Id = i.category3Id), (o.spuId = i.id), (o.tmId = i.tmId)
          let m = await me(P, d, i.category3Id),
            k = await ue(i.id),
            K = await ae(i.id)
          ;(w.value = m.data), (C.value = k.data), (V.value = K.data)
        },
        x = (P) => {
          V.value.forEach((d) => {
            N.value.toggleRowSelection(d, !1)
          }),
            N.value.toggleRowSelection(P, !0),
            (o.skuDefaultImg = P.imgUrl)
        },
        A = async () => {
          ;(o.skuAttrValueList = w.value.reduce((d, i) => {
            if (i.attrIdAndValueId) {
              let [m, k] = i.attrIdAndValueId.split(':')
              d.push({ attrId: m, valueId: k })
            }
            return d
          }, [])),
            (o.skuSaleAttrValueList = C.value.reduce((d, i) => {
              if (i.saleIdAndValueId) {
                let [m, k] = i.saleIdAndValueId.split(':')
                d.push({ saleAttrId: m, saleAttrValueId: k })
              }
              return d
            }, [])),
            (await be(o)).code == 200
              ? (z({ type: 'success', message: '添加SKU成功' }),
                I('changeScene', { flag: 0, params: '' }))
              : z({ type: 'error', message: '添加SKU失败' })
        }
      return (
        v({ initSkuData: r }),
        (P, d) => {
          const i = s('el-input'),
            m = s('el-form-item'),
            k = s('el-option'),
            K = s('el-select'),
            p = s('el-form'),
            f = s('el-table-column'),
            R = s('el-button'),
            q = s('el-table')
          return (
            _(),
            h(
              p,
              { 'label-width': '100px' },
              {
                default: t(() => [
                  e(
                    m,
                    { label: 'SKU名称' },
                    {
                      default: t(() => [
                        e(
                          i,
                          {
                            placeholder: 'SKU名称',
                            modelValue: u(o).skuName,
                            'onUpdate:modelValue':
                              d[0] || (d[0] = (l) => (u(o).skuName = l)),
                          },
                          null,
                          8,
                          ['modelValue'],
                        ),
                      ]),
                      _: 1,
                    },
                  ),
                  e(
                    m,
                    { label: '价格' },
                    {
                      default: t(() => [
                        e(
                          i,
                          {
                            placeholder: '价格(元)',
                            type: 'number',
                            modelValue: u(o).price,
                            'onUpdate:modelValue':
                              d[1] || (d[1] = (l) => (u(o).price = l)),
                          },
                          null,
                          8,
                          ['modelValue'],
                        ),
                      ]),
                      _: 1,
                    },
                  ),
                  e(
                    m,
                    { label: '重量' },
                    {
                      default: t(() => [
                        e(
                          i,
                          {
                            placeholder: '重量(克)',
                            type: 'number',
                            modelValue: u(o).weight,
                            'onUpdate:modelValue':
                              d[2] || (d[2] = (l) => (u(o).weight = l)),
                          },
                          null,
                          8,
                          ['modelValue'],
                        ),
                      ]),
                      _: 1,
                    },
                  ),
                  e(
                    m,
                    { label: 'SKU描述' },
                    {
                      default: t(() => [
                        e(
                          i,
                          {
                            placeholder: 'SKU描述',
                            type: 'textarea',
                            modelValue: u(o).skuDesc,
                            'onUpdate:modelValue':
                              d[3] || (d[3] = (l) => (u(o).skuDesc = l)),
                          },
                          null,
                          8,
                          ['modelValue'],
                        ),
                      ]),
                      _: 1,
                    },
                  ),
                  e(
                    m,
                    { label: '平台属性' },
                    {
                      default: t(() => [
                        e(
                          p,
                          { inline: !0, 'label-width': '80px' },
                          {
                            default: t(() => [
                              (_(!0),
                              B(
                                M,
                                null,
                                T(
                                  u(w),
                                  (l) => (
                                    _(),
                                    h(
                                      m,
                                      { key: l.id, label: l.attrName },
                                      {
                                        default: t(() => [
                                          e(
                                            K,
                                            {
                                              class: 'widthStyle',
                                              modelValue: l.attrIdAndValueId,
                                              'onUpdate:modelValue': (a) =>
                                                (l.attrIdAndValueId = a),
                                            },
                                            {
                                              default: t(() => [
                                                (_(!0),
                                                B(
                                                  M,
                                                  null,
                                                  T(
                                                    l.attrValueList,
                                                    (a) => (
                                                      _(),
                                                      h(
                                                        k,
                                                        {
                                                          label: a.valueName,
                                                          value: `${l.id}:${a.id}`,
                                                          key: a.id,
                                                        },
                                                        null,
                                                        8,
                                                        ['label', 'value'],
                                                      )
                                                    ),
                                                  ),
                                                  128,
                                                )),
                                              ]),
                                              _: 2,
                                            },
                                            1032,
                                            [
                                              'modelValue',
                                              'onUpdate:modelValue',
                                            ],
                                          ),
                                        ]),
                                        _: 2,
                                      },
                                      1032,
                                      ['label'],
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
                  e(
                    m,
                    { label: '销售属性' },
                    {
                      default: t(() => [
                        e(
                          p,
                          { inline: !0, 'label-width': '80px' },
                          {
                            default: t(() => [
                              (_(!0),
                              B(
                                M,
                                null,
                                T(
                                  u(C),
                                  (l) => (
                                    _(),
                                    h(
                                      m,
                                      { key: l.id, label: l.saleAttrName },
                                      {
                                        default: t(() => [
                                          e(
                                            K,
                                            {
                                              class: 'widthStyle',
                                              modelValue: l.saleIdAndValueId,
                                              'onUpdate:modelValue': (a) =>
                                                (l.saleIdAndValueId = a),
                                            },
                                            {
                                              default: t(() => [
                                                (_(!0),
                                                B(
                                                  M,
                                                  null,
                                                  T(
                                                    l.spuSaleAttrValueList,
                                                    (a) => (
                                                      _(),
                                                      h(
                                                        k,
                                                        {
                                                          value: `${l.id}:${a.id}`,
                                                          key: a.id,
                                                          label:
                                                            a.saleAttrValueName,
                                                        },
                                                        null,
                                                        8,
                                                        ['value', 'label'],
                                                      )
                                                    ),
                                                  ),
                                                  128,
                                                )),
                                              ]),
                                              _: 2,
                                            },
                                            1032,
                                            [
                                              'modelValue',
                                              'onUpdate:modelValue',
                                            ],
                                          ),
                                        ]),
                                        _: 2,
                                      },
                                      1032,
                                      ['label'],
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
                  e(
                    m,
                    { label: '图片名称' },
                    {
                      default: t(() => [
                        e(
                          q,
                          { border: '', data: u(V), ref_key: 'table', ref: N },
                          {
                            default: t(() => [
                              e(f, {
                                type: 'selection',
                                width: '80px',
                                align: 'center',
                              }),
                              e(
                                f,
                                { label: '图片' },
                                {
                                  default: t(({ row: l }) => [
                                    X(
                                      'img',
                                      {
                                        src: l.imgUrl,
                                        alt: '',
                                        style: { height: '100px' },
                                      },
                                      null,
                                      8,
                                      he,
                                    ),
                                  ]),
                                  _: 1,
                                },
                              ),
                              e(f, { label: '名称', prop: 'imgName' }),
                              e(
                                f,
                                { label: '操作' },
                                {
                                  default: t(({ row: l }) => [
                                    e(
                                      R,
                                      {
                                        type: 'primary',
                                        size: 'default',
                                        onClick: (a) => x(l),
                                      },
                                      {
                                        default: t(() => [F(' 设置默认 ')]),
                                        _: 2,
                                      },
                                      1032,
                                      ['onClick'],
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
                      ]),
                      _: 1,
                    },
                  ),
                  e(m, null, {
                    default: t(() => [
                      e(
                        R,
                        { type: 'primary', size: 'default', onClick: A },
                        { default: t(() => [F('保存')]), _: 1 },
                      ),
                      e(
                        R,
                        { type: 'primary', size: 'default', onClick: L },
                        { default: t(() => [F('取消')]), _: 1 },
                      ),
                    ]),
                    _: 1,
                  }),
                ]),
                _: 1,
              },
            )
          )
        }
      )
    },
  }),
  xe = te(we, [['__scopeId', 'data-v-86c89561']]),
  Ce = ['src'],
  Pe = Z({
    __name: 'index',
    setup(S) {
      let v = _e(),
        b = c(0),
        I = c(1),
        w = c(3),
        C = c([]),
        V = c(0),
        o = c(),
        N = c(),
        L = c(),
        r = c(!1)
      fe(
        () => v.c3Id,
        () => {
          v.c3Id && x()
        },
      )
      const x = async () => {
          let p = await ye(I.value, w.value, v.c3Id)
          p.code == 200 &&
            ((C.value = p.data.records), (V.value = p.data.total))
        },
        A = () => {
          ;(I.value = 1), x()
        },
        P = () => {
          ;(b.value = 1), o.value.initAddSpu(v.c3Id)
        },
        d = (p) => {
          ;(b.value = p.flag), p.params == 'update' || (I.value = 1), x()
        },
        i = async (p) => {
          await o.value.initHasSpuData(p), (b.value = 1)
        },
        m = (p) => {
          N.value.initSkuData(v.c1Id, v.c2Id, p), (b.value = 2)
        },
        k = async (p) => {
          let f = await Ve(p.id)
          f.code == 200 && ((L.value = f.data), (r.value = !0))
        },
        K = async (p) => {
          ;(await ke(p.id)).code == 200
            ? (z({ type: 'success', message: '删除成功' }), x())
            : z({ type: 'error', message: '删除失败' })
        }
      return (
        ge(() => {
          v.$reset()
        }),
        (p, f) => {
          const R = s('Category'),
            q = s('el-button'),
            l = s('el-table-column'),
            a = s('el-popconfirm'),
            y = s('el-table'),
            U = s('el-pagination'),
            E = s('el-dialog'),
            D = s('el-card'),
            j = Se('has')
          return (
            _(),
            B('div', null, [
              e(R, { scene: u(b) }, null, 8, ['scene']),
              e(
                D,
                { style: { margin: '10px 0px' } },
                {
                  default: t(() => [
                    H(
                      X(
                        'div',
                        null,
                        [
                          H(
                            (_(),
                            h(
                              q,
                              {
                                type: 'primary',
                                size: 'default',
                                onClick: P,
                                icon: 'Plus',
                                disabled: !u(v).c3Id,
                              },
                              { default: t(() => [F(' 添加SPU ')]), _: 1 },
                              8,
                              ['disabled'],
                            )),
                            [[j, 'btn.Spu.add']],
                          ),
                          e(
                            y,
                            {
                              style: { margin: '10px 0' },
                              border: '',
                              data: u(C),
                            },
                            {
                              default: t(() => [
                                e(l, {
                                  label: '序号',
                                  type: 'index',
                                  align: 'center',
                                  width: '80px',
                                }),
                                e(l, { label: 'SPU名称', prop: 'spuName' }),
                                e(l, {
                                  label: 'SPU描述',
                                  prop: 'description',
                                  'show-overflow-tooltip': '',
                                }),
                                e(
                                  l,
                                  { label: 'SPU操作' },
                                  {
                                    default: t(({ row: g }) => [
                                      H(
                                        e(
                                          q,
                                          {
                                            type: 'primary',
                                            size: 'default',
                                            icon: 'Plus',
                                            onClick: (J) => m(g),
                                            title: '添加SKU',
                                          },
                                          null,
                                          8,
                                          ['onClick'],
                                        ),
                                        [[j, 'btn.Spu.addsku']],
                                      ),
                                      H(
                                        e(
                                          q,
                                          {
                                            type: 'primary',
                                            size: 'default',
                                            icon: 'Edit',
                                            onClick: (J) => i(g),
                                            title: '修改SKU',
                                          },
                                          null,
                                          8,
                                          ['onClick'],
                                        ),
                                        [[j, 'btn.Spu.update']],
                                      ),
                                      e(
                                        q,
                                        {
                                          type: 'primary',
                                          size: 'default',
                                          icon: 'View',
                                          onClick: (J) => k(g),
                                          title: '查看SKU列表',
                                        },
                                        null,
                                        8,
                                        ['onClick'],
                                      ),
                                      e(
                                        a,
                                        {
                                          title: `确定删除${g.spuName}吗？`,
                                          width: '200px',
                                          onConfirm: (J) => K(g),
                                        },
                                        {
                                          reference: t(() => [
                                            H(
                                              e(
                                                q,
                                                {
                                                  type: 'primary',
                                                  size: 'default',
                                                  icon: 'Delete',
                                                  title: '删除SKU',
                                                },
                                                null,
                                                512,
                                              ),
                                              [[j, 'btn.Spu.delete']],
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
                          e(
                            U,
                            {
                              onSizeChange: A,
                              onCurrentChange: f[0] || (f[0] = (g) => x()),
                              'pager-count': 9,
                              'current-page': u(I),
                              'onUpdate:currentPage':
                                f[1] ||
                                (f[1] = (g) =>
                                  O(I) ? (I.value = g) : (I = g)),
                              'page-size': u(w),
                              'onUpdate:pageSize':
                                f[2] ||
                                (f[2] = (g) =>
                                  O(w) ? (w.value = g) : (w = g)),
                              'page-sizes': [3, 5, 7, 9],
                              background: !0,
                              layout:
                                'prev, pager, next, jumper, ->, sizes, total',
                              total: u(V),
                            },
                            null,
                            8,
                            ['current-page', 'page-size', 'total'],
                          ),
                        ],
                        512,
                      ),
                      [[Y, u(b) == 0]],
                    ),
                    H(
                      e(
                        Ue,
                        { ref_key: 'spu', ref: o, onChangeScene: d },
                        null,
                        512,
                      ),
                      [[Y, u(b) == 1]],
                    ),
                    H(
                      e(
                        xe,
                        { ref_key: 'sku', ref: N, onChangeScene: d },
                        null,
                        512,
                      ),
                      [[Y, u(b) == 2]],
                    ),
                    e(
                      E,
                      {
                        modelValue: u(r),
                        'onUpdate:modelValue':
                          f[3] ||
                          (f[3] = (g) => (O(r) ? (r.value = g) : (r = g))),
                        title: 'SKU列表',
                      },
                      {
                        default: t(() => [
                          e(
                            y,
                            { border: '', data: u(L) },
                            {
                              default: t(() => [
                                e(l, { label: 'SKU名字', prop: 'skuName' }),
                                e(l, { label: 'SKU价格', prop: 'price' }),
                                e(l, { label: 'SKU重量', prop: 'weight' }),
                                e(
                                  l,
                                  { label: 'SKU图片' },
                                  {
                                    default: t(({ row: g }) => [
                                      X(
                                        'img',
                                        {
                                          src: g.skuDefaultImg,
                                          style: { width: '100px' },
                                        },
                                        null,
                                        8,
                                        Ce,
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
            ])
          )
        }
      )
    },
  })
export { Pe as default }
