var React = require('react');
var style = require('./style');
var BasicMixin = require('../utils/BasicMixin');
var assign = require('lodash/object/assign');

var Toolbar = React.createClass({

  mixins: [BasicMixin],

  render() {
    return <div
      {...this.getBasics()}
      style={assign({}, style.toolbar, this.props.style)}
      onClick={this.props.onClick}>
      {this.props.children}
    </div>;
  }
});

module.exports = Toolbar;
