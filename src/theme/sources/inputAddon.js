export default function (theme, mod) {

  var config = theme.getStyle('config', mod)

  return {
    userSelect: 'none',
    height: '100%',
    right: 0,
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 5,
    paddingRight: 5,
    backgroundColor: config.grey.normal,
    borderTopRightRadius: config.borderRadius,
    borderBottomRightRadius: config.borderRadius,
    fontWeight: 'bold',

    ':hover': {
      color: '#e2e7eb',
      backgroundColor: config.grey.hover,
    },
    ':active': {
      color: '#6bb6c4',
      backgroundColor: config.grey.active,
    },
    disabled: {
      color: '#96a6ad',
    },
    addonBackground: {
      transparent: {
        backgroundColor: 'none',
        ':hover': {backgroundColor: 'none'},
        ':active': {backgroundColor: 'none'},
      },
    }
  }
}
