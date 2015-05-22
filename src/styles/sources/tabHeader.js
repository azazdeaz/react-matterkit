export default function (styles, mod) {

  var config = styles.get('config', mod);

  return {
    position: 'relative',
    top: 1,
    width: '100%',
    height: `${config.lineHeight}px`,
    display: 'flex',
  };
}
