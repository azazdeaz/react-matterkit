export default function (theme, mod) {

  var config = theme.get('config', mod)

  return {
    lineHeight: `${config.lineHeight}px`,
    width: '12px',
    textAlign: 'center'
  }
}
