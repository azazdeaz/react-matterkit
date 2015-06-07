export default function (styles, mod) {

  var config = styles.get('config', mod);
  var colors = styles.get('colors', mod);

  return {
    mixins: ['roundedCorners', 'inputBorder'],

    display: 'flex',
    position: 'relative',
    alignItems: 'stretch',
    color: '#96a6ad',
    backgroundColor: colors.grey4,
    padding: '0',
    paddingLeft: '2px',
    height: config.lineHeight,
    lineHeight: `${config.lineHeight}px`,
    margin: '1px 3px',
    boxSizing: 'border-box',
    // border: 'solid 1px transparent',

    ':hover': {
      color: '#e2e7eb',
    },
    ':focus': {
      color: '#6bb6c4',
    },
    ':active': {
      color: '#6bb6c4',
    },
    disabled: {
      color: '#96a6ad',
    },
    kind: {
      stamp: {
        backgroundColor: 'none',
        ':hover': {backgroundColor: 'none'},
        ':active': {backgroundColor: 'none'},
        ':focus': {backgroundColor: 'none'},
        disabled: {backgroundColor: 'none'},
      }
    }
  };
}
