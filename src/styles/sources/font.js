export default function (theme, mod) {

  var config = theme.get('config', mod)

  return {

    fontFamily: config.fontFamily,
    fontWeight: config.fontWeight,
    fontSize: '12.9px',
    color: config.fontColor.normal,
  }
}
