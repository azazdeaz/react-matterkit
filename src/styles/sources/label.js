export default function (styles, mod) {

  var config = styles.get('config', mod);

  return {
    mixins: ['font'],
    
    lineHeight: `${config.lineHeight}px`,
  };
}
