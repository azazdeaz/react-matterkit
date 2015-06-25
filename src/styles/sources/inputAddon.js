export default function (theme, mod) {

  var config = theme.get('config', mod)

  return {
    userSelect: 'none',
    height: '100%',
    right: 0,
    padding: '0 5px',
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
