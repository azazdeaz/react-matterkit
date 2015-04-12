var _ = require('lodash');
var merge = require('lodash.merge');
// var datauri = require('datauri');
var uriBorder = '';//datauri(__dirname+'/assets/border.png');
var uriCheck = '';//datauri(__dirname+'/assets/check.png');

var style = {
    lineHeight: 32,
    lineHeightPX: '34px',
    itemHeight: 32,
    itemHeightPX: '32px',

    borderRadius: 2,

    uri: {
      check: uriCheck,
    },

    gardient: {
        normal: 'linear-gradient(135deg, #6bb6c4 0%,#6b9ad3 100%)',
        backward: 'linear-gradient(-45deg, #6bb6c4 0%,#6b9ad3 100%)',
    },

    fontFamily: 'Open Sans',
    fontWeight: '300',

    palette: {
        purple: '#8091c6',
        blue: '#6bb6c4',
        green: '#43aa81',
        red: '#b64d65',
        grey1: '#e2e7eb',
        grey2: '#96a6ad',
        grey3: '#3b424a',
        grey4: '#1a1d21',
        bg: '#262A2E'
    },
    grey: {
      normal: '#282c30',
      hover: '#2a3035',
      active: '#2c3034'
    },
};

export default style;

var noSelect = {
  userSelect: 'none',
  WebkitUserSelect: 'none',
  MozUserSelect: 'none',
  msUserSelect: 'none',
};

style.fontColor = {
  normal: style.palette.grey2,
  hover: style.palette.grey1,
  active: style.palette.blue,
};

style.font = {
  fontFamily: style.fontFamily,
  fontWeight: style.fontWeight,
  fontSize: '12.9px',
  color: style.fontColor.normal,
};

style.roundedCorners = {
  borderRadiusTopLeft: style.borderRadius,
  borderRadiusTopRight: style.borderRadius,
  borderRadiusBottomLeft: style.borderRadius,
  borderRadiusBottomRight: style.borderRadius,
};



module.exports = style;


style.line = {
  height: style.lineHeightPX,
  lineHeight: style.lineHeightPX,
  display: 'flex',
  color: '#96a6ad',
  fontSize: '13px',
  backgroundColor: '#262a2e',
  borderBottom: 'solid 1px #1a1d21',
  boxSizing: 'border-box',
};

style.lineGroup = _.defaults({
  color: '#e2e7eb',
  backgroundColor: '#3b424a',
  // borderBottom: 'none',
}, style.line);


//Button

style.button = merge({}, style.roundedCorners, style.font, noSelect, {

  height: style.itemHeight,
  lineHeight: style.itemHeightPX,
  display: 'inline-block',
  boxSizing: 'border-box',
  textAlign: 'center',
  color: '#96a6ad',
  backgroundColor: '#363c43',
  backgroundImage: 'linear-gradient(to top, rgba(255,255,255,0), rgba(255,255,255,.05))',
  border: 'solid 1px rgba(26,29,33,.75)',
  boxShadow: 'inset 0 1px rgba(255,255,255,.02)',
  margin: '1px 3px',
  padding: '0 8px',

  states: [
    {
      hover: {
        color: '#e2e7eb',
        backgroundColor: '#3b424a',
      },
    }, {
      active: {
        color: '#6bb6c4',
        backgroundColor: '#363c43',
        boxShadow: 'inset 0 -1px rgba(255,255,255,.02)',
        backgroundImage: 'linear-gradient(to top, rgba(0,0,0,0), rgba(0,0,0,.1))',
      },
    }, {
      disabled: {
        color: 'rgba(150,166,173,.2)',
        backgroundColor: '#2c3136',
        border: 'solid 1px rgba(26,29,33,.32)',
      }
    },
  ],
  modifiers: [
    {
      kind: {
        colored: {
          color: '#191c1f',
          backgroundColor: '#262a2e',
          backgroundImage: 'linear-gradient(135deg, rgba(107,182,196,.75) 0%,rgba(107,154,211,.75) 100%)',

          states: [
            {
              hover: {
                backgroundImage: 'linear-gradient(135deg, rgba(107,182,196,1) 0%,rgba(107,154,211,1) 100%)',
              },
            }, {
              disabled: {
                color: 'rgba(23,28,31,.7)',
                backgroundImage: 'linear-gradient(135deg, rgba(107,182,196,.32) 0%,rgba(107,154,211,.32) 100%)',
              }
            }
          ]
        },
        empty: {
          backgroundImage: 'none',
          backgroundColor: 'none',
          border: 'none',
          boxShadow: 'none',
          states: [
            {hover:{backgroundColor: 'none'}},
            {active:{backgroundColor: 'none'}},
            {focus:{backgroundColor: 'none'}},
            {disabled:{backgroundColor: 'none'}},
          ],
        }
      },
    }
  ]
});


//Panel
style.panel = {
  backgroundColor: style.grey.active,
  border: 'solid 1px ' + style.palette.grey4,
  borderRadius: 2,
};

//Input
style.inputReset = {
  fontSize: 'inherit',
  fontFamily: 'inherit',
  color: 'inherit',
  lineHeight: 'inherit',
  outline: 'none',
  backgroundColor: 'transparent',
  border: 'none',
};

style.inputAddon = merge({}, noSelect, {
  height: '100%',
  right: 0,
  padding: '0 5px',
  backgroundColor: style.grey.normal,
  borderRadiusTopLeft: style.borderRadius,
  borderRadiusBottomLeft: style.borderRadius,

  states: [
    {hover:{
      color: '#e2e7eb',
      backgroundColor: style.grey.hover,
    }},
    {active:{
      color: '#6bb6c4',
      backgroundColor: style.grey.active,
    }},
    {disabled:{
      color: '#96a6ad',
    }},
  ],

  modifiers: [
    {background: {
      transparent: {
        backgroundColor: 'none',
        states: [
          {hover:{backgroundColor: 'none'}},
          {active:{backgroundColor: 'none'}},
          {focus:{backgroundColor: 'none'}},
          {disabled:{backgroundColor: 'none'}},
        ],
      },
    }}
  ],
});

style.input = merge({}, style.font, style.roundedCorners, {
  display: 'flex',
  alignItems: 'stretch',
  color: '#96a6ad',
  background: style.palette.grey4,
  padding: '0',
  paddingLeft: '2px',
  borderRadius: '2px',
  height: style.itemHeight,
  lineHeight: style.itemHeightPX,
  margin: '1px 3px',
  boxSizing: 'border-box',
  border: 'solid 1px transparent',

  states: [
    {hover:{
      color: '#e2e7eb',
      border: 'solid 1px rgba(68,79,88,.5)',
    }},
    {focus:{
      color: '#6bb6c4',
      boxShadow: '0 0 3px rgba(86,83,136,.6), inset 0 0 4px rgba(86,83,136,.6)',
      border: 'solid 1px rgba(93,169,167,1)',
    }},
    {disabled:{
      color: '#96a6ad',
      backgroundColor: 'rgba(26,29,33,.6)',
    }},
    {error:{
      border: 'solid 1px #aa4353',
    }}
  ],
  modifiers: [
    {background: {
      transparent: {
        backgroundColor: 'none',
        states: [
          {hover:{backgroundColor: 'none'}},
          {active:{backgroundColor: 'none'}},
          {focus:{backgroundColor: 'none'}},
          {disabled:{backgroundColor: 'none'}},
        ],
      },
    }}
  ],
});

style.checkbox = merge({}, style.roundedCorners, {
  width: 18,
  height: 18,
  margin: 'auto 3px',
  backgroundColor: style.palette.grey4,
  backgroundPosition: '1px 1px',
  backgroundRepeat: 'no-repeat',

  states: [
    {hover:{
      color: '#e2e7eb',
      border: 'solid 1px rgba(68,79,88,.5)',
    }},
    {focus:{
      color: '#6bb6c4',
      boxShadow: '0 0 3px rgba(86,83,136,.6), inset 0 0 4px rgba(86,83,136,.6)',
      border: 'solid 1px rgba(93,169,167,1)',
    }},
    {disabled:{
      color: '#96a6ad',
      backgroundColor: 'rgba(26,29,33,.6)',
    }},
    {error:{
      border: 'solid 1px #aa4353',
    }},
    {value: {
      backgroundColor: style.palette.green,
      states: [
        {hover:{backgroundColor: style.palette.green}},
        {active:{backgroundColor: style.palette.green}},
        {focus:{backgroundColor: style.palette.green}},
        {disabled:{backgroundColor: style.palette.green}},
      ],
    }}
  ],
  modifiers: [
  ],
});

//Tooltip
style.tooltip = {
  position: 'fixed',
  fontFamily: style.fontFamily,
  fontWeight: style.fontWeight,
  color: '#6bb6c4',
  borderRadius: 2,
  padding: '5px',
  backgroundColor: '#363c43',
  backgroundImage: 'linear-gradient(to top, rgba(255,255,255,0), rgba(255,255,255,.05))',
  boxSizing: 'border-box',
  boxShadow: '0 0 3px rgba(86,83,136,.6), inset 0 0 4px rgba(86,83,136,.6)',
  border: 'solid 1px rgba(93,169,167,1)',
};

style.tooltipTriangle = {
  position: 'absolute',
  left: '100%',
  top: 1,
  width: 0,
  height: 0,
  borderStyle: 'solid',
  borderWidth: '5px 0 5px 5px',
  borderColor: 'transparent transparent transparent ' + style.palette.blue,
};


//Dropdown
style.dropdown = {
    height: style.itemHeight,
    lineHeight: style.itemHeightPX,
    borderRadius: 2,
    backgroundColor: 'rgba(59,66,74,.75)',
    boxShadow: 'inset 0 1px rgba(255,255,255,.02)',
    border: 'solid 1px rgba(26,29,33,.75)',
    backgroundImage: 'linear-gradient(to top, rgba(255,255,255,0), rgba(255,255,255,.05))',
    overflow: 'hidden',
    boxSizing: 'border-box',
    margin: '1px 0',
    outline: 'none',

    states: [
      {hover: {
        color: '#e2e7eb',
        backgroundColor: '#3b424a',
      }},
      {open: {
        zIndex: 1,
        height: 'auto',
        position: 'relative',
        color: '#6bb6c4',
        backgroundColor: '#3b424a',
        backgroundImage: 'linear-gradient(to top, rgba(0,0,0,0), rgba(0,0,0,.1))',
      }}
    ],
};


//List
style.list = merge({} , style.panel, {
    borderColor: '#1a1d21',
});

//ListItem
style.listItem = merge({}, style.font, {
    height: style.itemHeight,
    lineHeight: style.itemHeightPX,
    padding: '0 8px',

    states: [
      {hover: {
        backgroundColor: 'rgba(226,231,235,.05)',
      }}
    ],

    modifiers: [
      {selected: {
        color: style.fontColor.active,
      }}
    ],
});








//Slider

style.slider = {
  flex: 1,
  position: 'relative',
	height: style.itemHeight,
};

style.sliderHandle = {
  position: 'absolute',
  width: 16,
  height: 16,
  top: '50%',
  transform: 'translate(-8px, -8px)',
  borderRadius: 8,
  boxSizing: 'border-box',
  backgroundColor: '#262a2e',
  borderStyle: 'solid',
  borderWidth: '2px',
  borderColor: '#96a6ad',
};

style.sliderHandleHover = _.defaults({
	borderColor: '#e2e7eb',
}, style.sliderHandle);

style.sliderHandleActive = _.defaults({
	borderColor: '#6bb6c4',
	backgroundColor: '#6bb6c4',
}, style.sliderHandle);

style.sliderBarBg = {
	margin: '13px 5px',
  overflow: 'auto',
	height: 6,
	borderRadius: '2px',
	backgroundColor: '#1a1d21',
};

style.sliderBarProgress = {
  // width: '100%',
  margin: 1,
	height: 4,
	borderRadius: '1px',
	backgroundColor: '#6bb6c4',
};


//Tab
style.tabLabel = merge({}, style.font, {
  height: style.itemHeight,
  lineHeight: style.itemHeightPX,
  boxSizing: 'border-box',
  textAlign: 'center',
  overflow: 'hidden',
  color: style.fontColor.normal,
  backgroundColor: style.grey.normal,
  backgroundImage: 'none',
  // border: 'solid 1px ' + style.palette.grey4,
  borderTop: 'solid 1px ' + style.palette.grey4,
  borderLeft: 'solid 1px ' + style.palette.grey4,
  borderBottom: 'solid 1px ' + style.palette.grey4,
  borderRight: 'solid 1px ' + style.palette.grey4,
  padding: '0 8px',
  margin: 0,

  states: [
    {hover: {
      color: style.fontColor.hover,
      backgroundColor: style.grey.hover,
    }},
    {active: {
      color: style.fontColor.active,
      backgroundColor: style.grey.active,
    }}
  ],

  modifiers: [
    {selected: {
      color: style.fontColor.active,
      backgroundColor: style.grey.active,
      borderBottom: 'none',
    }},
    {stretch: {
      flex: 1,
    }},
    {first: {
      borderTopLeftRadius: 2,
    }},
    {last: {
      borderTopRightRadius: 2,
    }},
    {notFirst: {
      borderLeft: 'none',
    }},
  ],
});

style.tabHeader = {
  position: 'relative',
  top: 1,
  width: '100%',
  height: style.itemHeight,
  display: 'flex',
};

style.tabBase = {
  display: 'flex',
  flexDirection: 'column',
};

style.tabCont = _.merge({}, style.panel, {
  borderTopLeftRadius: 0,
  flex: 1,
  modifiers:[
    {stretchLabels: {
      borderTopRightRadius: 0,
    }}
  ],
});


//Accordion
style.accordion = _.assign({}, style.font, {
  width: '100%',
  maxHeight: '100%',
  backgroundColor: style.palette.grey4,
  border: 'solid 1px rgba(26,29,33,.75)',
  borderRadius: 2,
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
});

style.accordionTab = _.assign({}, style.font, {
  fontWeight: 600,
  color: style.fontColor.normal,
  backgroundColor: style.grey.normal,
  states: [
    {hover: {
      color: style.fontColor.hover,
      backgroundColor: style.grey.hover,
    }},
    {active: {
      color: style.fontColor.active,
      backgroundColor: style.grey.active,
    }}
  ],
  modifiers: [
    {opened: {
      color: style.fontColor.active,
      backgroundColor: style.grey.active,
    }},
    {states: [{hover:{}}]},
  ]
});

//Toolbar
style.toolbar = _.assign({}, {
  height: style.lineHeight,
  width: '100%',
  display: 'flex'
});

style.toolbarGroup = _.assign({}, {
  height: style.lineHeight,
  display: 'flex',
});

//Toggle

(()=>{

  const knobWidth = 32;
  const anim = '0.23s cubic-bezier(0.445, 0.050, 0.550, 0.950)';

  style.toggleBase = merge({}, style.roundedCorners, noSelect, {
    height: style.itemHeight,
    display: 'inline-block',
    backgroundColor: style.palette.grey4,
  });

  style.toggleSide = merge({}, style.font, {
    transition: `opacity ${anim}`,
    height: 0,
    paddingLeft: 12,
    paddingRight: 12,
    lineHeight: style.lineHeightPX,
    textAlign: 'center',
    modifiers: [
      {left:{
        marginRight: knobWidth,
        opacity: 1,
        states: [{left: {opacity: 0}}],
      }},
      {right:{
        marginLeft: knobWidth,
        opacity: 0,
        states: [{left: {opacity: 1}}],
      }}
    ],
  });

  style.toggleKnob = merge({}, style.roundedCorners, {
    transition: `left ${anim}`,
    position: 'relative',
    height: style.itemHeight,
    width: knobWidth,
    display: 'inline-block',
    backgroundColor: style.palette.grey3,
    left: `calc(100% - ${knobWidth}px)`,
    states: [{left: {left: 0}}],
  });
})();
