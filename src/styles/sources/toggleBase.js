export default function (theme, mod) {

  var config = theme.get('config', mod)
  var colors = theme.get('colors', mod)

  return {
    mixins: ['roundedCorners'],

    userSelect: 'none',
    height: config.lineHeight,
    display: 'inline-block',
    backgroundColor: colors.grey4,
  }
}
