import {
  d as c,
  a as n,
  e as _,
  o as d,
  f as p,
  m as o,
  g as l,
  w as i,
  j as r,
  p as m,
  k as u,
  _ as h,
} from './index-BUkeGmDr.js'
const x = '/mallManagement/assets/404-BCxKwoK6.png',
  f = (e) => (m('data-v-0d3b588a'), (e = e()), u(), e),
  k = { class: 'box' },
  v = f(() => o('div', { class: 'top' }, [o('img', { src: x, alt: '' })], -1)),
  g = { class: 'bottom' },
  C = c({
    __name: 'index',
    setup(e) {
      let s = n()
      const t = () => {
        s.push('/home')
      }
      return (b, w) => {
        const a = _('el-link')
        return (
          d(),
          p('div', k, [
            v,
            o('div', g, [
              l(
                a,
                { onClick: t, class: 'link' },
                { default: i(() => [r('回到首页')]), _: 1 },
              ),
            ]),
          ])
        )
      }
    },
  }),
  I = h(C, [['__scopeId', 'data-v-0d3b588a']])
export { I as default }
