export default function (theme, mod) {

  var config = theme.get('config', mod)
  var {borderRadius} = config

  return {
    borderTopLeftRadius: borderRadius,
    borderTopRightRadius: borderRadius,
    borderBottomLeftRadius: borderRadius,
    borderBottomRightRadius: borderRadius,
  }
}
