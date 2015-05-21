export default function (styles, mod) {

  var config = styles.get('config', mod);

  return {
    mixins: ['roundedCorners', 'noSelect'],

    height: config.itemHeight,
    display: 'inline-block',
    backgroundColor: config.palette.grey4,
  };
}
