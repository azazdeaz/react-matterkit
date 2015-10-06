export default function (theme, mod) {

  var config = theme.getStyle('config', mod)

  return {
    mixins: ['roundedCorners', 'font'],

    color: '#191c1f',
    backgroundColor: '#262a2e',
    borderStyle: 'solid',
    borderWidth: '1px',
    borderColor: 'rgba(26,29,33,.75)',
    backgroundImage: 'linear-gradient(135deg, rgba(107,182,196,.75) 0%,rgba(107,154,211,.75) 100%)',
    boxShadow: 'inset 0 1px rgba(255,255,255,.01)',
    height: config.lineHeight - 2,
    lineHeight: `${config.lineHeight - 2}px`,
    boxSizing: 'border-box',
    display: 'inline-block',
    textAlign: 'center',
    marginTop: 1,
    marginLeft: 3,
    marginBottom: 1,
    marginRight: 3,
    paddingLeft: 8,
    paddingRight: 8,
  }
}
