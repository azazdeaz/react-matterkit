var React = require('react');
var { StyleResolverMixin, BrowserStateMixin } = require('radium');
var _ = require('lodash');
var style = require('./style');
var Icon = require('./Icon');
var BasicMixin = require('../utils/BasicMixin');

var MultiTypeInput = React.createClass({

  mixins: [BasicMixin, StyleResolverMixin, BrowserStateMixin],

  getDefaultProps() {
    return {
      types: [],
      defaultTypeIdx: 0,
    };
  },

  getInitialState() {

    var {defaultTypeIdx, chooseType, value, types} = this.props;
    var currTypeIdx = chooseType ? chooseType(value) : defaultTypeIdx;

    return {
      currType: types[currTypeIdx],
      value: value,
    };
  },

  handleAddonClick() {
    var {types} = this.props;
    var currTypeIdx = types.indexOf(this.state.currType);
    currTypeIdx = (currTypeIdx + 1) % types.length;
    this.setState({currType: types[currTypeIdx]});
  },

  handleChange(value) {

    this.setState({value});

    if (this.props.onChange) {
      this.props.onChange(value);
    }
  },

  render() {

    return <Input
      {...this.props}
      {...this.state.currType}
      onChange = {this.handleChange}
      onInitialFormat = {this.handleChange}
      value = {this.state.value}
      addonOnClick={this.handleAddonClick}/>;
  }
});

module.exports = MultiTypeInput;
