var React = require('react/addons');
var {PureRenderMixin} = React.addons;
var has = require('lodash/object/has');
var style = require('./style');
var { StyleResolverMixin, BrowserStateMixin } = require('radium');

export default React.createClass({

  mixins: [PureRenderMixin, StyleResolverMixin, BrowserStateMixin],

  getDefaultProps() {
    return {
      value: false,
    };
  },

  getInitialState() {
    return {
      disabled: false,
      value: this.props.value,
    };
  },

  componentWillReceiveProps(nextProps) {
    if (has(nextProps, 'value')) {
      this.setState({value: nextProps.value});
    }
  },

  _onClick() {

    var value = !this.state.value;

    this.setState({value});

    if (this.props.onChange) {
      this.props.onChange(value);
    }
  },

  renderCheck() {

    if (!this.state.value) {
      return null;
    }

    var {start, end} = style.gardient;

    return <svg width="18" height="18">
      <defs>
        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{stopColor: start, stopOpacity:1}} />
          <stop offset="100%" style={{stopColor: end, stopOpacity:1}} />
        </linearGradient>
      </defs>
      <path d="M3.5 9 L5.5 9 L7.5 11 L12.5 3 L 14.5 3 L8.5 13 L7 13 Z"  fill="url(#grad1)"/>
    </svg>;
  },

  render() {

    return <div
      {...this.getBrowserStateEvents()}
      style = {this.buildStyles(style.checkbox)}
      onClick = {this._onClick}
    >{this.renderCheck()}</div>;
  }
});
