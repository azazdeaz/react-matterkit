export default function (styles, mod) {

  var config = styles.get('config', mod);

  return {
    mixins: ['font'],

    height: config.itemHeight,
    lineHeight: config.itemHeightPX,
    padding: '0 8px',

    ':hover': {
      backgroundColor: 'rgba(226,231,235,.05)',
    },

    selected: {
      color: config.fontColor.active,
    }
  };
}
