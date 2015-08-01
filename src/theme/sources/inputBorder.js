export default function (theme, mod) {

  var config = theme.getStyle('config', mod)
  var colors = theme.getStyle('colors', mod)

  return {
    borderStyle: 'solid',
    borderWidth: '1px',
    borderColor: 'transparent',

    ':hover': {
      borderColor: 'rgba(68,79,88,.5)',
    },
    ':focus': {
      boxShadow: '0 0 3px rgba(86,83,136,.6), inset 0 0 4px rgba(86,83,136,.6)',
      borderColor: 'rgba(93,169,167,1)',
    },
    ':active': {
      boxShadow: '0 0 3px rgba(86,83,136,.6), inset 0 0 4px rgba(86,83,136,.6)',
      borderColor: 'rgba(93,169,167,1)',
    },
    disabled: {
      backgroundColor: 'rgba(26,29,33,.6)',
    },
    error: {
      borderColor: colors.wrong,
    }
  }
}
