export default function (theme, mod) {

  var colors = theme.getStyle('colors', mod)

  return {
    position: 'absolute',
    width: 8,
    height: '100%',
    right: 0,
    top: 0,
    backgroundColor: 'transparent',
  }
}
