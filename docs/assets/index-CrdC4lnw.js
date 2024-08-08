import {
  d as l,
  u as a,
  e as o,
  o as _,
  f as d,
  g as n,
  w as m,
  m as s,
  h as e,
  t,
  s as p,
} from './index-BUkeGmDr.js'
import { g } from './time-DpAMgIKn.js'
const h = ['src'],
  u = { class: 'right' },
  v = { class: 'title' },
  f = { class: 'svg' },
  y = l({
    __name: 'index',
    setup(x) {
      let c = a().avatar
      return (w, B) => {
        const r = o('el-card'),
          i = o('svg-icon')
        return (
          _(),
          d('div', null, [
            n(
              r,
              { 'body-class': 'card' },
              {
                default: m(() => [
                  s('img', { src: e(c), class: 'avatar' }, null, 8, h),
                  s('div', u, [
                    s('h1', v, t(e(g)()) + '好！' + t(e(a)().username), 1),
                    s('p', null, t(e(p).title), 1),
                  ]),
                ]),
                _: 1,
              },
            ),
            s('div', f, [
              n(i, {
                name: 'welcome',
                width: '500px',
                height: '300px',
                class: 'svg-icon',
              }),
            ]),
          ])
        )
      }
    },
  })
export { y as default }
