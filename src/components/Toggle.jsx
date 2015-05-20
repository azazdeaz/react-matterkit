var React = require('react/addons');
var { StyleResolverMixin, BrowserStateMixin } = require('radium');
var style = require('./style');
var has = require('lodash/object/has');
var assign = require('lodash/object/assign');

var Toggle = React.createClass({

  mixins: [ StyleResolverMixin ],

  getDefaultProps() {
    return {
      labelLeft: 'ON',
      valueLeft: true,
      labelRight: 'OFF',
      valueRight: false,
    };
  },

  getInitialState() {

    var {defaultValue, valueRight} = this.props;

    return {
      left: defaultValue === valueRight ? false : true,
    };
  },

  componentWillReceiveProps(nextProps) {

    if (has(nextProps, 'defaultValue')) {

      let {defaultValue, valueLeft, valueRight} = this.props;
      let left;

      if (defaultValue === valueLeft) left = true;
      else if (defaultValue === valueRight) left = false;

      if (left !== undefined) {
        this.setState({left});
      }
    }
  },

  onClick() {

    var left = !this.state.left;

    if (this.props.onChange) {
      let value = left ? this.props.valueLeft : this.props.valueRight;
      this.props.onChange(value);
    }

    this.setState({left});
  },

  render() {

    return <div
      style={this.buildStyles(style.toggleBase)}
      onClick={this.onClick}>

      <Side side='left' label={this.props.labelLeft} on={this.state.left}/>
      <Side side='right' label={this.props.labelRight} on={!this.state.left}/>
      <Knob left={this.state.left}/>
    </div>;
  }
});




var Side = React.createClass({

  mixins: [StyleResolverMixin, BrowserStateMixin],

  render() {
    return <div style={this.buildStyles(style.toggleSide)}>
      {this.props.label}
    </div>;
  },
});


var Knob = React.createClass({

  mixins: [ StyleResolverMixin, BrowserStateMixin ],

  renderGrip() {

    var grey = style.grey.hover;

    return <svg width='32' height='32'>
      <line x1='13.5' y1='12' x2='13.5' y2='20' stroke={grey} strokeWidth='1'/>
      <line x1='15.5' y1='12' x2='15.5' y2='20' stroke={grey} strokeWidth='1'/>
      <line x1='17.5' y1='12' x2='17.5' y2='20' stroke={grey} strokeWidth='1'/>
    </svg>;
  },

  render() {

    return <div
      {...this.getBrowserStateEvents()}
      style={this.buildStyles(style.toggleKnob)}>

      {this.renderGrip()}
    </div>;
  },
});



module.exports = Toggle;
