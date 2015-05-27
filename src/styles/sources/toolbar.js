export default function (styles, mod) {

  var config = styles.get('config', mod);

  return {
    direction: {
      row: {
        height: config.lineHeight,
        width: '100%',
      },
      column: {
        width: config.lineHeight,
        height: '100%',
      }
    },
    display: 'flex'
  };
}
