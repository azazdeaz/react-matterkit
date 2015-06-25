export default function (theme, mod) {

  var config = theme.get('config', mod)

  return {
    height: config.lineHeight,
    lineHeight: `${config.lineHeight}px`,
    padding: '0 8px',
    color: config.fontColor.normal,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',

    ':hover': {
      color: config.fontColor.hover,
      backgroundColor: 'rgba(226,231,235,.05)',
    },

    selected: {
      color: config.fontColor.active,
    }
  }
}
