export default function (styles, mod) {

  var config = styles.get('config', mod);

  return {
    lineHeight: config.lineHeight,
    width: '12px',
    textAlign: 'center'
  };
}
