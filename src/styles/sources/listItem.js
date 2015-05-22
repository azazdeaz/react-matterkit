export default function (styles, mod) {

  var config = styles.get('config', mod);

  return {
    height: config.lineHeight,
    lineHeight: `${config.lineHeight}px`,
    padding: '0 8px',

    ':hover': {
      backgroundColor: 'rgba(226,231,235,.05)',
    },

    selected: {
      color: config.fontColor.active,
    }
  };
}
