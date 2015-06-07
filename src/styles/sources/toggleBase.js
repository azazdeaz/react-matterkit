export default function (styles, mod) {

  var config = styles.get('config', mod);
  var colors = styles.get('colors', mod);

  return {
    mixins: ['roundedCorners'],

    userSelect: 'none',
    height: config.lineHeight,
    display: 'inline-block',
    backgroundColor: colors.grey4,
  };
}
