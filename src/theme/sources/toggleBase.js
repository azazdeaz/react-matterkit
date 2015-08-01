export default function (theme, mod) {

  var config = theme.getStyle('config', mod)
  var colors = theme.getStyle('colors', mod)

  return {
    mixins: ['roundedCorners'],

    userSelect: 'none',
    height: config.lineHeight,
    display: 'inline-block',
    backgroundColor: colors.grey4,
  }
}
