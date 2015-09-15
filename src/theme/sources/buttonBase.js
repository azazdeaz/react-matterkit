export default function () {

  return {
    backgroundColor: '#363c43',
    backgroundImage: 'linear-gradient(to top, rgba(255,255,255,0), rgba(255,255,255,.05))',
    borderStyle: 'solid',
    borderWidth: '1px',
    borderColor: 'rgba(26,29,33,.32)',
    boxShadow: 'inset 0 1px rgba(255,255,255,.01)',

    ':hover': {
      boxShadow: 'inset 0 1px rgba(255,255,255,.02)',
      backgroundColor: '#3b424a',
    },
    ':active': {
      backgroundColor: '#363c43',
      boxShadow: 'inset 0 -1px rgba(255,255,255,.02)',
      backgroundImage: 'linear-gradient(to top, rgba(0,0,0,0), rgba(0,0,0,.1))',
    },
    disabled: {
      backgroundColor: '#2c3136',
      borderStyle: 'solid',
      borderWidth: '1px',
      borderColor: 'rgba(26,29,33,.32)',
    }
  }
}
