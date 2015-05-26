export default function (styles, mod) {

  var config = styles.get('config', mod);

  return {
    height: config.lineHeight,
    width: '100%',
    display: 'flex'
  };
}
