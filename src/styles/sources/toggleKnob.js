export default function (theme, mod) {

  var config = theme.getStyle('config', mod)
  var {knobWidth} = theme.getStyle('toggleConfig', mod)
  var colors = theme.getStyle('colors', mod)

  return {
    mixins: ['font'],

    boxSizing: 'border-box',
    transition: `left ${config.anim}`,
    position: 'relative',
    height: config.lineHeight,
    width: knobWidth,
    display: 'inline-block',
    backgroundColor: colors.grey3,
    onLeft: {
      'true': {left: 0},
      'false': {left: `calc(100% - ${knobWidth - 2}px)`}
    },
  }
}
