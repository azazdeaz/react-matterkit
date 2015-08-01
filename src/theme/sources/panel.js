export default function (theme, mod) {

  var config = theme.getStyle('config', mod)
  var colors = theme.getStyle('colors', mod)

  return {
    mixins: ['font'],
    backgroundColor: config.grey.active,
    borderStyle: 'solid',
    borderWidth: '1px',
    borderColor: colors.grey4,
  }
}
