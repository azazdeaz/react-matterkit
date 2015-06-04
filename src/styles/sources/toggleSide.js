export default function (styles, mod) {

  var config = styles.get('config', mod);
  var {knobWidth, labelOffset} = styles.get('toggleConfig', mod);

  return {
    mixins: ['font'],

    transition: `all ${config.anim}`,
    height: 0,
    paddingLeft: 12,
    paddingRight: 12,
    lineHeight: `${config.lineHeight}px`,
    textAlign: 'center',
    cursor: 'default',
    opacity: 0,
    side: {
      left: {
        marginLeft: knobWidth,
        transform: `translateX(${labelOffset})`,
      },
      right: {
        marginRight: knobWidth,
        transform: `translateX(-${labelOffset})`,
      }
    },
    on: {
      opacity: 1,
      transform: 'translateX(0px)',
    }
  };
}
