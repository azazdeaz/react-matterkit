export default function (theme, mod) {

  var config = theme.getStyle('config', mod)
  var colors = theme.getStyle('colors', mod)

  return {
    mixins: ['roundedCorners', 'inputBorder', 'font'],

    display: 'flex',
    position: 'relative',
    alignItems: 'stretch',
    color: '#96a6ad',
    backgroundColor: colors.grey4,
    paddingTop: '0',
    paddingLeft: '2px',
    paddingBottom: '0',
    paddingRight: '0',
    height: config.lineHeight,
    lineHeight: `${config.lineHeight}px`,
    // marginTop: 1,
    // marginBottom: 3,
    marginLeft: 3,
    marginRight: 3,
    boxSizing: 'border-box',
    overflow: 'hidden',

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
  }
}
