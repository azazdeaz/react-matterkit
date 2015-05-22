export default function (styles, mod) {

  var config = styles.get('config', mod);

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
    borderTop: 'solid 1px ' + config.palette.grey4,
    borderLeft: 'solid 1px ' + config.palette.grey4,
    borderBottom: 'solid 1px ' + config.palette.grey4,
    borderRight: 'solid 1px ' + config.palette.grey4,
    padding: '0 8px',
    margin: 0,

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
      borderBottom: 'none',
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
      borderLeft: 'none',
    },
  };
}
