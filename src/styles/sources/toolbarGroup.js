export default function (theme, mod) {

  var config = theme.get('config', mod);

  return {
    height: config.lineHeight,
    display: 'flex'
  };
}
