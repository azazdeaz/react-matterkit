export default function (theme, mod) {

  var config = theme.get('config', mod)
  var colors = theme.get('colors', mod)

  return {
    mixins: ['font'],
    backgroundColor: config.grey.active,
    border: 'solid 1px ' + colors.grey4,
  }
}
