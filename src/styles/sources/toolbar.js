import has from 'lodash/object/has'

export default function (theme, mod) {
  var config = theme.get('config', mod)
  var size = has(mod, 'size') ? mod.size : config.lineHeight

  return {
    direction: {
      row: {
        height: size,
      },
      column: {
        width: size,
      }
    },
    flexDirection: mod.direction,
    display: 'flex'
  }
}
