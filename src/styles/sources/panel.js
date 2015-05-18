export default function (styles, mod) {

  var config = styles.get('config', mod);

  return {

    backgroundColor: config.grey.active,
    border: 'solid 1px ' + config.palette.grey4,
  };
}
