export default function (styles, mod) {

  var config = styles.get('config', mod);

  return {

    height: config.lineHeight,
    lineHeight: `${config.lineHeight}px`,
    boxSizing: 'border-box',
    display: 'inline-block',
    textAlign: 'center',
    color: '#96a6ad',
    marginTop: 1,
    marginLeft: 3,
    marginBottom: 1,
    marginRight: 3,
    paddingLeft: 8,
    paddingRight: 8,
    ':hover': {
      color: '#e2e7eb',
    },
    ':active': {
      color: '#6bb6c4',
    },
    disabled: {
      color: 'rgba(150,166,173,.2)',
    },
    kind: {
      colored: {
        color: '#191c1f',
        border: 'solid 1px rgba(26,29,33,.75)',
        // boxShadow: 'inset 0 1px rgba(255,255,255,.02)',
        backgroundColor: '#262a2e',
        backgroundImage: 'linear-gradient(135deg, rgba(107,182,196,.75) 0%,rgba(107,154,211,.75) 100%)',

        ':hover': {
          backgroundImage: 'linear-gradient(135deg, rgba(107,182,196,1) 0%,rgba(107,154,211,1) 100%)',
        },
        disabled: {
          color: 'rgba(23,28,31,.7)',
          backgroundImage: 'linear-gradient(135deg, rgba(107,182,196,.32) 0%,rgba(107,154,211,.32) 100%)',
        },
      },
      stamp: {
        backgroundImage: 'none',
        backgroundColor: 'none',
        border: 'none',
        boxShadow: 'none',
        ':hover': {backgroundImage: 'none', backgroundColor: 'none'},
        ':active': {backgroundImage: 'none', backgroundColor: 'none'},
        disabled:{backgroundImage: 'none', backgroundColor: 'none'},
      }
    },
  };
}
