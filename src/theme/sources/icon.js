export default function (theme, mod) {

  var config = theme.getStyle('config', mod)

  return {
    lineHeight: `${config.lineHeight}px`,
    width: '12px',
    textAlign: 'center',
    color: '#96a6ad',
  }
}
