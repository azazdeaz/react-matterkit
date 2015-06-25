export default function (theme, mod) {

  var config = theme.get('config', mod)

  return {
    position: 'relative',
    // top: 1,
    width: '100%',
    height: `${config.lineHeight}px`,
    display: 'flex',
    flexShrink: 0,
  }
}
