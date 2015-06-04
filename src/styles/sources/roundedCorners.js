export default function (styles, mod) {

  var config = styles.get('config', mod);
  var {borderRadius} = config;

  return {
    borderTopLeftRadius: borderRadius,
    borderTopRightRadius: borderRadius,
    borderBottomLeftRadius: borderRadius,
    borderBottomRightRadius: borderRadius,
  };
}
