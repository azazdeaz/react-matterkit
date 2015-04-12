var React = require('react/addons');
var { StyleResolverMixin, BrowserStateMixin } = require('radium');
var style = require('./style');
var has = require('lodash/object/has');
var assign = require('lodash/object/assign');

var Toggle = React.createClass({

  mixins: [ StyleResolverMixin, BrowserStateMixin ],

  getDefaultProps() {
    return {
      labelLeft: 'OFF',
      valueLeft: false,
      labelRight: 'ON',
      valueRight: true,
    };
  },

  getInitialState() {
    return {
      left: true,
    };
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
  console.log("this.buildStyles(style.toggleSide, {right: true})", this.buildStyles(style.toggleSide, {right: true}));
    return <div
      {...this.getBrowserStateEvents()}
      style={style.toggleBase}
      onClick={this.onClick}>

      <div style={this.buildStyles(style.toggleSide, {left: true})}>
        {this.props.labelLeft}
      </div>
      <div style={this.buildStyles(style.toggleSide, {right: true})}>
        {this.props.labelRight}
      </div>
      <div style={this.buildStyles(style.toggleKnob)}>
        <svg width='32' height='32'>
          <line x1='7.5' y1='2' x2='7.5' y2='28' stroke='black' stroke-width='1'/>
          <line x1='16.5' y1='2' x2='16.5' y2='28' stroke='black' stroke-width='1'/>
          <line x1='25.5' y1='2' x2='25.5' y2='28' stroke='black' stroke-width='1'/>
        </svg>
      </div>
    </div>;
  }
});

module.exports = Toggle;
