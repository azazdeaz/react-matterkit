export default function (styles, mod) {

  var config = styles.get('config', mod);
  var {knobWidth} = styles.get('toggleConfig', mod);

  return {
    mixins: ['font'],

    boxSizing: 'border-box',
    transition: `left ${config.anim}`,
    position: 'relative',
    height: config.lineHeight,
    width: knobWidth,
    display: 'inline-block',
    backgroundColor: config.palette.grey3,
    onLeft: {
      'true': {left: 0},
      'false': {left: `calc(100% - ${knobWidth - 2}px)`}
    },
  };
}
