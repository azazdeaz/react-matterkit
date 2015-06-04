export default function (styles, mod) {

  var config = styles.get('config', mod);

  return {
    lineHeight: `${config.lineHeight}px`,
    width: '12px',
    textAlign: 'center'
  };
}
