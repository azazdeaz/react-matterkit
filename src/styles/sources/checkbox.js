export default function (styles, mod) {

  var config = styles.get('config', mod);

  return {
    position: 'relative',
    width: 18,
    height: 18,
    marginTop: (style.lineHeight - 18) / 2,
    marginBottom: (style.lineHeight - 18) / 2,
    marginLeft: 3,
    marginRight: 3,
    backgroundColor: style.palette.grey4,
    backgroundPosition: '1px 1px',
    backgroundRepeat: 'no-repeat',
  }
}
