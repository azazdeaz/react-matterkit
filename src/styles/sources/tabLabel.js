export default function (theme, mod) {

  var config = theme.getStyle('config', mod)
  var colors = theme.getStyle('colors', mod)

  return {
    mixins: ['font'],

    height: config.lineHeight,
    lineHeight: `${config.lineHeight}px`,
    boxSizing: 'border-box',
    textAlign: 'center',
    overflow: 'hidden',
    color: config.fontColor.normal,
    backgroundColor: config.grey.normal,
    backgroundImage: 'none',
    borderWidth: '1px',
    borderColor: colors.grey4,
    borderTopStyle: 'solid',
    borderLeftStyle: 'solid',
    borderBottomStyle: 'solid',
    borderRightStyle: 'solid',
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 8,
    paddingRight: 8,
    marginTop: 0,
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0,

    ':hover': {
      color: config.fontColor.hover,
      backgroundColor: config.grey.hover,
    },
    ':active': {
      color: config.fontColor.active,
      backgroundColor: config.grey.active,
    },

    selected: {
      color: config.fontColor.active,
      backgroundColor: config.grey.active,
      borderBottomStyle: 'none',
    },
    stretch: {
      flex: 1,
    },
    first: {
      borderTopLeftRadius: 2,
    },
    last: {
      borderTopRightRadius: 2,
    },
    notFirst: {
      borderLeftStyle: 'none',
    },
  }
}
