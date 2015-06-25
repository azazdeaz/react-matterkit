export default function (theme, mod) {

  var config = theme.get('config', mod)
  var size = has(mod, 'size') ? mod.size : config.lineHeight

  return {
    height: size,
    display: 'flex'
  }
}
