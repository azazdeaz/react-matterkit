export default function (styles, mod) {

  var config = styles.get('config', mod);

  return {

    fontFamily: config.fontFamily,
    fontWeight: config.fontWeight,
    fontSize: '12.9px',
    color: config.fontColor.normal,
  };
}
