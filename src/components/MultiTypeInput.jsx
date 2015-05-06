var React = require('react');
var { StyleResolverMixin, BrowserStateMixin } = require('radium');
var _ = require('lodash');
var style = require('./style');
var Input = require('./Input');
var BasicMixin = require('../utils/BasicMixin');

var MultiTypeInput = React.createClass({

  mixins: [BasicMixin, StyleResolverMixin, BrowserStateMixin],

  getDefaultProps() {
    return {
      types: [],
      typeIdx: 0,
    };
  },

  getInitialState() {

    return {currTypeIdx: this.getCurrTypeIdx()};
  },

  componentWillReceiveProps(nextProps) {

    this.setState({currTypeIdx: this.getCurrTypeIdx(nextProps)});
  },

  getCurrTypeIdx(props) {

    props = props || this.props;

    var {typeIdx, chooseType, value} = props;
    return chooseType ? chooseType(value) : defaultTypeIdx;
  },

  handleAddonClick() {
    var {types} = this.props;
    var {currTypeIdx} = this.state;
    currTypeIdx = (currTypeIdx + 1) % types.length;
    this.setState({currTypeIdx});
  },

  handleChange(value) {

    if (this.props.onChange) {
      this.props.onChange(value);
    }
  },

  render() {

    return <Input
      {...this.getBasics()}
      {...this.props}
      {...this.props.types[this.state.currTypeIdx]}
      onChange = {this.handleChange}
      onInitialFormat = {this.handleChange}
      addonOnClick = {this.handleAddonClick}/>;
  }
});

module.exports = MultiTypeInput;
