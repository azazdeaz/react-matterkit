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

  render: function () {

    return <div
      {...this.getBrowserStateEvents()}
      style = {this.buildStyles(style.checkbox)}
      onClick = {this._onClick}
    ></div>;
  }
});
