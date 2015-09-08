export default function (theme, mod) {

  var colors = theme.getStyle('colors', mod)

  return {
    position: 'absolute',
    width: 8,
    backgroundColor: colors.grey2,
  }
}
