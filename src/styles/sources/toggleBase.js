export default function (styles, mod) {

  var config = styles.get('config', mod);

  return {
    mixins: ['roundedCorners'],

    userSelect: 'none',
    height: config.lineHeight,
    display: 'inline-block',
    backgroundColor: config.palette.grey4,
  };
}
