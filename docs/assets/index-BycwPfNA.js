import {
  n as Y,
  d as g,
  h as s,
  s as R,
  o,
  f as i,
  m as _,
  q as T,
  v as D,
  t as y,
  x as f,
  _ as S,
  a as M,
  e as l,
  y as O,
  F as p,
  z as d,
  w as n,
  g as e,
  A as k,
  r as V,
  B as Z,
  T as ee,
  C as te,
  c as E,
  u as q,
  D as ne,
  G as oe,
  H as le,
  j as N,
  I as B,
} from './index-BUkeGmDr.js'
let ae = Y('SettingStore', { state: () => ({ fold: !1, refresh: !1 }) })
const C = ae,
  se = { key: 0, class: 'logo' },
  ce = ['src'],
  re = { name: 'Logo' },
  _e = g({
    ...re,
    setup(h) {
      let c = C()
      return (a, m) =>
        s(R).logoHidden
          ? (o(),
            i('div', se, [
              _('img', { src: s(R).logo, alt: '' }, null, 8, ce),
              T(_('p', null, y(s(R).title), 513), [[D, !s(c).fold]]),
            ]))
          : f('', !0)
    },
  }),
  ue = S(_e, [['__scopeId', 'data-v-59109748']]),
  de = { name: 'Menu' },
  ie = g({
    ...de,
    props: ['menuList'],
    setup(h) {
      let c = M()
      const a = (m) => {
        c.push(m.index)
      }
      return (m, w) => {
        const r = l('el-icon'),
          u = l('el-menu-item'),
          b = l('Menu'),
          x = l('el-sub-menu')
        return (
          o(!0),
          i(
            p,
            null,
            O(
              h.menuList,
              (t) => (
                o(),
                i(
                  p,
                  { key: t.path },
                  [
                    t.children
                      ? f('', !0)
                      : (o(),
                        i(
                          p,
                          { key: 0 },
                          [
                            t.meta.hidden
                              ? f('', !0)
                              : (o(),
                                d(
                                  u,
                                  { key: 0, index: t.path, onClick: a },
                                  {
                                    title: n(() => [
                                      _('span', null, y(t.meta.title), 1),
                                    ]),
                                    default: n(() => [
                                      e(
                                        r,
                                        null,
                                        {
                                          default: n(() => [
                                            (o(), d(k(t.meta.icon))),
                                          ]),
                                          _: 2,
                                        },
                                        1024,
                                      ),
                                    ]),
                                    _: 2,
                                  },
                                  1032,
                                  ['index'],
                                )),
                          ],
                          64,
                        )),
                    t.children && t.children.length == 1
                      ? (o(),
                        i(
                          p,
                          { key: 1 },
                          [
                            t.children[0].meta.hidden
                              ? f('', !0)
                              : (o(),
                                d(
                                  u,
                                  {
                                    key: 0,
                                    index: t.children[0].path,
                                    onClick: a,
                                  },
                                  {
                                    title: n(() => [
                                      _(
                                        'span',
                                        null,
                                        y(t.children[0].meta.title),
                                        1,
                                      ),
                                    ]),
                                    default: n(() => [
                                      e(
                                        r,
                                        null,
                                        {
                                          default: n(() => [
                                            (o(),
                                            d(k(t.children[0].meta.icon))),
                                          ]),
                                          _: 2,
                                        },
                                        1024,
                                      ),
                                    ]),
                                    _: 2,
                                  },
                                  1032,
                                  ['index'],
                                )),
                          ],
                          64,
                        ))
                      : f('', !0),
                    t.children && t.children.length > 1
                      ? (o(),
                        i(
                          p,
                          { key: 2 },
                          [
                            t.meta.hidden
                              ? f('', !0)
                              : (o(),
                                d(
                                  x,
                                  { key: 0, index: t.path },
                                  {
                                    title: n(() => [
                                      e(
                                        r,
                                        null,
                                        {
                                          default: n(() => [
                                            (o(), d(k(t.meta.icon))),
                                          ]),
                                          _: 2,
                                        },
                                        1024,
                                      ),
                                      _('span', null, y(t.meta.title), 1),
                                    ]),
                                    default: n(() => [
                                      e(b, { menuList: t.children }, null, 8, [
                                        'menuList',
                                      ]),
                                    ]),
                                    _: 2,
                                  },
                                  1032,
                                  ['index'],
                                )),
                          ],
                          64,
                        ))
                      : f('', !0),
                  ],
                  64,
                )
              ),
            ),
            128,
          )
        )
      }
    },
  }),
  me = { name: 'Main' },
  fe = g({
    ...me,
    setup(h) {
      let c = C(),
        a = V(!0)
      return (
        Z(
          () => c.refresh,
          () => {
            ;(a.value = !1),
              te(() => {
                a.value = !0
              })
          },
        ),
        (m, w) => {
          const r = l('router-view')
          return (
            o(),
            d(r, null, {
              default: n(({ Component: u }) => [
                e(
                  ee,
                  { name: 'fade' },
                  {
                    default: n(() => [
                      s(a) ? (o(), d(k(u), { key: 0 })) : f('', !0),
                    ]),
                    _: 2,
                  },
                  1024,
                ),
              ]),
              _: 1,
            })
          )
        }
      )
    },
  }),
  pe = S(fe, [['__scopeId', 'data-v-4ec89468']]),
  he = { name: 'Breadcrumb' },
  be = g({
    ...he,
    setup(h) {
      let c = C(),
        a = E()
      const m = () => {
        c.fold = !c.fold
      }
      return (w, r) => {
        const u = l('el-icon'),
          b = l('el-breadcrumb-item'),
          x = l('el-breadcrumb')
        return (
          o(),
          i(
            p,
            null,
            [
              e(
                u,
                { class: 'tabbar_left_icon', onClick: m, size: 18 },
                {
                  default: n(() => [
                    (o(), d(k(s(c).fold ? 'Fold' : 'Expand'))),
                  ]),
                  _: 1,
                },
              ),
              e(
                x,
                { 'separator-icon': 'ArrowRight' },
                {
                  default: n(() => [
                    (o(!0),
                    i(
                      p,
                      null,
                      O(s(a).matched, (t, z) =>
                        T(
                          (o(),
                          d(
                            b,
                            {
                              key: z,
                              class: 'tabbar_left_breadcrumb',
                              to: t.path,
                            },
                            {
                              default: n(() => [
                                e(
                                  u,
                                  { size: 18 },
                                  {
                                    default: n(() => [
                                      (o(), d(k(t.meta.icon))),
                                    ]),
                                    _: 2,
                                  },
                                  1024,
                                ),
                                _('span', null, y(t.meta.title), 1),
                              ]),
                              _: 2,
                            },
                            1032,
                            ['to'],
                          )),
                          [[D, !t.meta.hidden]],
                        ),
                      ),
                      128,
                    )),
                  ]),
                  _: 1,
                },
              ),
            ],
            64,
          )
        )
      }
    },
  }),
  ge = S(be, [['__scopeId', 'data-v-af22c097']]),
  ve = ['src'],
  ye = { class: 'el-dropdown-link' },
  ke = { name: 'Setting' },
  Se = g({
    ...ke,
    setup(h) {
      let c = C(),
        a = q(),
        m = M(),
        w = E(),
        r = V(!1)
      const u = () => {
          c.refresh = !c.refresh
        },
        b = () => {
          document.fullscreenElement
            ? document.exitFullscreen()
            : document.documentElement.requestFullscreen()
        },
        x = async () => {
          await a.userLogout(),
            m.push({ path: '/login', query: { redirect: w.path } })
        },
        t = V('rgba(255, 69, 0, 0.68)'),
        z = V([
          '#ff4500',
          '#ff8c00',
          '#ffd700',
          '#90ee90',
          '#00ced1',
          '#1e90ff',
          '#c71585',
          'rgba(255, 69, 0, 0.68)',
          'rgb(255, 120, 0)',
          'hsv(51, 100, 98)',
          'hsva(120, 40, 94, 0.5)',
          'hsl(181, 100%, 37%)',
          'hsla(209, 100%, 56%, 0.73)',
          '#c7158577',
        ]),
        U = () => {
          let $ = document.documentElement
          r.value ? ($.className = 'dark') : ($.className = '')
        },
        A = () => {
          document.documentElement.style.setProperty(
            '--el-color-primary',
            t.value,
          )
        }
      return ($, v) => {
        const I = l('el-button'),
          H = l('el-color-picker'),
          F = l('el-form-item'),
          j = l('el-switch'),
          G = l('el-form'),
          P = l('el-popover'),
          J = l('arrow-down'),
          K = l('el-icon'),
          Q = l('el-dropdown-item'),
          W = l('el-dropdown-menu'),
          X = l('el-dropdown')
        return (
          o(),
          i(
            p,
            null,
            [
              e(I, {
                size: 'default',
                onClick: u,
                icon: 'Refresh',
                circle: '',
              }),
              e(I, {
                size: 'default',
                onClick: b,
                icon: 'FullScreen',
                circle: '',
              }),
              e(
                P,
                {
                  placement: 'bottom',
                  title: '主题设置',
                  width: 150,
                  trigger: 'hover',
                  content: '',
                },
                {
                  reference: n(() => [
                    e(I, {
                      size: 'default',
                      onClick: v[2] || (v[2] = () => {}),
                      icon: 'Setting',
                      circle: '',
                    }),
                  ]),
                  default: n(() => [
                    e(G, null, {
                      default: n(() => [
                        e(
                          F,
                          { label: '主题颜色' },
                          {
                            default: n(() => [
                              e(
                                H,
                                {
                                  onChange: A,
                                  modelValue: t.value,
                                  'onUpdate:modelValue':
                                    v[0] || (v[0] = (L) => (t.value = L)),
                                  size: 'small',
                                  teleported: !1,
                                  'show-alpha': '',
                                  predefine: z.value,
                                },
                                null,
                                8,
                                ['modelValue', 'predefine'],
                              ),
                            ]),
                            _: 1,
                          },
                        ),
                        e(
                          F,
                          { label: '暗黑模式' },
                          {
                            default: n(() => [
                              e(
                                j,
                                {
                                  onChange: U,
                                  modelValue: s(r),
                                  'onUpdate:modelValue':
                                    v[1] ||
                                    (v[1] = (L) =>
                                      ne(r) ? (r.value = L) : (r = L)),
                                  size: 'small',
                                  class: 'mt-2',
                                  'inline-prompt': '',
                                  'active-icon': s(oe),
                                  'inactive-icon': s(le),
                                },
                                null,
                                8,
                                ['modelValue', 'active-icon', 'inactive-icon'],
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
              ),
              _(
                'img',
                { src: s(a).avatar, class: 'tabbar_right_avatar' },
                null,
                8,
                ve,
              ),
              e(X, null, {
                dropdown: n(() => [
                  e(W, null, {
                    default: n(() => [
                      e(
                        Q,
                        { onClick: x },
                        { default: n(() => [N('退出')]), _: 1 },
                      ),
                    ]),
                    _: 1,
                  }),
                ]),
                default: n(() => [
                  _('span', ye, [
                    N(y(s(a).username) + ' ', 1),
                    e(
                      K,
                      { class: 'el-icon--right' },
                      { default: n(() => [e(J)]), _: 1 },
                    ),
                  ]),
                ]),
                _: 1,
              }),
            ],
            64,
          )
        )
      }
    },
  }),
  we = S(Se, [['__scopeId', 'data-v-4fc13869']]),
  xe = { class: 'tabbar' },
  $e = { class: 'tabbar_left' },
  Ce = { class: 'tabbar_right' },
  Le = { name: 'Tabbar' },
  Ve = g({
    ...Le,
    setup(h) {
      return (c, a) => (
        o(), i('div', xe, [_('div', $e, [e(ge)]), _('div', Ce, [e(we)])])
      )
    },
  }),
  ze = S(Ve, [['__scopeId', 'data-v-9913d549']]),
  Ie = { class: 'layout_container' },
  Re = { name: 'Layout' },
  Be = g({
    ...Re,
    setup(h) {
      let c = q(),
        a = C(),
        m = E()
      return (w, r) => {
        const u = l('el-menu'),
          b = l('el-scrollbar')
        return (
          o(),
          i('div', Ie, [
            _(
              'div',
              { class: B(['layout_slider', { fold: s(a).fold }]) },
              [
                e(ue),
                e(
                  b,
                  { class: 'scrollbar' },
                  {
                    default: n(() => [
                      e(
                        u,
                        {
                          collapse: s(a).fold,
                          'default-active': s(m).path,
                          'background-color': '#001529',
                          'text-color': 'white',
                        },
                        {
                          default: n(() => [
                            e(ie, { menuList: s(c).menuRoutes }, null, 8, [
                              'menuList',
                            ]),
                          ]),
                          _: 1,
                        },
                        8,
                        ['collapse', 'default-active'],
                      ),
                    ]),
                    _: 1,
                  },
                ),
              ],
              2,
            ),
            _(
              'div',
              { class: B(['layout_tabbar', { fold: s(a).fold }]) },
              [e(ze)],
              2,
            ),
            _(
              'div',
              { class: B(['layout_main', { fold: s(a).fold }]) },
              [e(pe)],
              2,
            ),
          ])
        )
      }
    },
  }),
  Fe = S(Be, [['__scopeId', 'data-v-44a261ad']])
export { Fe as default }
