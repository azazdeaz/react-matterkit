export default function (theme, mod) {

  var config = theme.getStyle('config', mod)

  return {
    height: config.lineHeight,
    lineHeight: `${config.lineHeight}px`,
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 8,
    paddingRight: 8,
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
