export default function (theme, mod) {

  var config = theme.getStyle('config', mod)
  var colors = theme.getStyle('colors', mod)

  return {
    position: 'relative',
    width: 18,
    height: 18,
    marginTop: (config.lineHeight - 18) / 2,
    marginBottom: (config.lineHeight - 18) / 2,
    marginLeft: 3,
    marginRight: 3,
    backgroundColor: colors.grey4,
    backgroundPosition: '1px 1px',
    backgroundRepeat: 'no-repeat',
  }
}
