var React = require('react');
var { StyleResolverMixin, BrowserStateMixin } = require('radium');
var tinycolor = require('tinycolor2');
var style = require('./style');
var Input = require('./Input');
var BasicMixin = require('../utils/BasicMixin');
var ColorCircle = require('../utils/ColorCircle');

var FORMATS = ['prgb', 'hex6', 'hex3', 'hex8', 'name', 'hsl', 'hsv'];
//TODO customiseable formats
var MultiTypeInput = React.createClass({

  mixins: [BasicMixin, StyleResolverMixin, BrowserStateMixin],

  getDefaultProps() {
    return {
      value: '#000000',
    };
  },

  getInitialState() {

    var {value} = this.props;

    return {
      value,
      format: tinycolor(value).getFormat(),
    };
  },

  componentWillReceiveProps(nextProps) {

    this.setState({currTypeIdx: this.getCurrTypeIdx(nextProps)});
  },

  getCurrTypeIdx(props) {

    props = props || this.props;

    var {typeIdx, chooseType, value} = props;
    return chooseType ? chooseType(value) : defaultTypeIdx;
  },

  handleChange(value) {

    if (this.props.onChange) {
      this.props.onChange(value);
    }
  },

  stepFormat() {

    var idx = FORMATS.indexOf(this.state.format) + 1;
    idx %= FORMATS.length;

    var format = FORMATS[idx];
    var value = tinycolor(this.state.value).toString(format);

    this.setState({value, format});
  },

  showSelector() {

    this.setState({oprened: true});
  },

  renderSelector() {

    if (!this.state.focus) return null;

    return <div style={{
      position: 'absolute',
      zIndex: 1,
      top: '100%',
      left: 0,
      width: '100%',
    }}>
      <ColorCircle
        {...tinyColor(this.state.value).toHsl()}
        width={32}
        radius={256}/>
    </div>;
  },

  render() {

    return <Input
      {...this.getBasics()}
      {...this.props}
      {...this.props.types[this.state.currTypeIdx]}
      addonIcon = 'adjust'
      addonOnClick = {this.showSelector()}
      onChange = {this.handleChange}
      onInitialFormat = {this.handleChange}/>;
  }
});

module.exports = MultiTypeInput;
