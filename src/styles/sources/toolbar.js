export default function (theme, mod) {

  var config = theme.get('config', mod);

  return {
    direction: {
      row: {
        height: config.lineHeight,
        // width: '100%',
      },
      column: {
        width: config.lineHeight,
        // height: '100%',
      }
    },
    display: 'flex'
  };
}
