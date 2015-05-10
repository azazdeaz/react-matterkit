export default function (styles, mod) {

  var config = styles.get('config', mod);

  return {

    mixins: ['roundedCorners'],

    backgroundColor: config.grey.active,
    border: 'solid 1px ' + config.palette.grey4,
  };
}
