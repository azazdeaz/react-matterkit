export default function (theme, mod) {

  var config = theme.get('config', mod)

  return {
    mixins: ['font'],

    lineHeight: `${config.lineHeight}px`,
  }
}
