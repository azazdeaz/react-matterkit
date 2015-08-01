export default function (theme, mod) {

  var config = theme.getStyle('config', mod)

  return {
    mixins: ['font'],

    lineHeight: `${config.lineHeight}px`,
  }
}
