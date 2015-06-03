const palette = {
  purple: '#8091c6',
  blue: '#6bb6c4',
  right: '#43aa81',
  wrong: '#b64d65',
  grey1: '#e2e7eb',
  grey2: '#96a6ad',
  grey3: '#3b424a',
  grey4: '#1a1d21',
  bg: '#262A2E',
};

export default function () {

  return {
    palette,

    lineHeight: 25,
    borderRadius: 3,

    anim: '0.23s cubic-bezier(0.445, 0.050, 0.550, 0.950)',

    gardient: (()=>{
      var start = '#6bb6c4';
      var end = '#6b9ad3';

      return {
        start,
        end,
        normal: `linear-gradient(135deg, ${start} 0%, ${end} 100%)`,
        backward: `linear-gradient(-45deg, ${start} 0%, ${end} 100%)`,
      };
    })(),

    fontFamily: 'Open Sans',
    fontWeight: '300',

    grey: {
      normal: '#282c30',
      hover: '#2a3035',
      active: '#2c3034'
    },

    fontColor: {
      normal: palette.grey2,
      hover: palette.grey1,
      active: palette.blue,
    },
  };
}
