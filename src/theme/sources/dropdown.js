export default function (theme, mod) {

  var config = theme.getStyle('config', mod)

  return {
    mixins: ['font', 'roundedCorners'],

    display: 'flex',
    flexDirection: 'column',
    height: config.lineHeight - 2,
    boxSizing: 'content-box',
    lineHeight: `${config.lineHeight - 2}px`,
    backgroundColor: '#363c43',
    boxShadow: 'inset 0 1px rgba(255,255,255,.02)',
    borderStyle: 'solid',
    borderWidth: '1px',
    borderColor: 'rgba(26,29,33,.75)',
    backgroundImage: 'linear-gradient(to top, rgba(255,255,255,0), rgba(255,255,255,.05))',
    overflow: 'hidden',
    marginTop: 1,
    marginLeft: 0,
    marginBottom: 1,
    marginRight: 0,

    ':hover': {
      color: '#e2e7eb',
      backgroundColor: '#3b424a',
    },
    open: {
      zIndex: 1,
      height: 'auto',
      position: 'relative',
      color: '#6bb6c4',
      backgroundColor: '#3b424a',
      backgroundImage: 'linear-gradient(to top, rgba(0,0,0,0), rgba(0,0,0,.1))',
    }
  }
}
