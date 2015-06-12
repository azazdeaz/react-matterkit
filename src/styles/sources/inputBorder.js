export default function (theme, mod) {

  var config = theme.get('config', mod);
  var colors = theme.get('colors', mod);

  return {
    border: 'solid 1px transparent',

    ':hover': {
      border: 'solid 1px rgba(68,79,88,.5)',
    },
    ':focus': {
      boxShadow: '0 0 3px rgba(86,83,136,.6), inset 0 0 4px rgba(86,83,136,.6)',
      border: 'solid 1px rgba(93,169,167,1)',
    },
    ':active': {
      boxShadow: '0 0 3px rgba(86,83,136,.6), inset 0 0 4px rgba(86,83,136,.6)',
      border: 'solid 1px rgba(93,169,167,1)',
    },
    disabled: {
      backgroundColor: 'rgba(26,29,33,.6)',
    },
    error: {
      border: `solid 1px ${colors.wrong}`,
    }
  };
}
