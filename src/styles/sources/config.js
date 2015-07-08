export default function (theme, mod) {

  var colors = theme.getStyle('colors', mod)

  return {
    palette: colors,

    lineHeight: 25,
    borderRadius: 3,

    anim: '0.23s cubic-bezier(0.445, 0.050, 0.550, 0.950)',

    gardient: (()=>{
      var start = '#6bb6c4'
      var end = '#6b9ad3'

      return {
        start,
        end,
        normal: `linear-gradient(135deg, ${start} 0%, ${end} 100%)`,
        backward: `linear-gradient(-45deg, ${start} 0%, ${end} 100%)`,
      }
    })(),

    fontFamily: 'Open Sans',
    fontWeight: '300',

    grey: {
      normal: '#282c30',
      hover: '#2a3035',
      active: '#2c3034'
    },

    fontColor: {
      normal: colors.grey2,
      hover: colors.grey1,
      active: colors.blue,
    },
  }
}
