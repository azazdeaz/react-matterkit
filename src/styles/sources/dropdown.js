export default function (theme, mod) {

  var config = theme.getStyle('config', mod)

  return {
    mixins: ['font', 'roundedCorners'],

    display: 'inline-block',
    height: config.lineHeight,
    lineHeight: `${config.lineHeight}px`,
    backgroundColor: '#363c43',
    boxShadow: 'inset 0 1px rgba(255,255,255,.02)',
    border: 'solid 1px rgba(26,29,33,.75)',
    backgroundImage: 'linear-gradient(to top, rgba(255,255,255,0), rgba(255,255,255,.05))',
    overflow: 'hidden',
    boxSizing: 'border-box',
    margin: '1px 0',

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
