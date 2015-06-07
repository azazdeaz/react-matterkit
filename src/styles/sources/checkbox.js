export default function (styles, mod) {

  var config = styles.get('config', mod);
  var colors = styles.get('colors', mod);

  return {
    position: 'relative',
    width: 18,
    height: 18,
    marginTop: (config.lineHeight - 18) / 2,
    marginBottom: (config.lineHeight - 18) / 2,
    marginLeft: 3,
    marginRight: 3,
    backgroundColor: colors.grey4,
    backgroundPosition: '1px 1px',
    backgroundRepeat: 'no-repeat',
  }
}
