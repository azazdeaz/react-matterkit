export default function (styles, mod) {

  var config = styles.get('config', mod);
  var colors = styles.get('colors', mod);

  return {
    backgroundColor: config.grey.active,
    border: 'solid 1px ' + colors.grey4,
  };
}
