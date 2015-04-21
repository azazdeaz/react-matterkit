var React = require('react');
var { StyleResolverMixin, BrowserStateMixin } = require('radium');
var style = require('./style');
var BasicMixin = require('../utils/BasicMixin');

var Panel = React.createClass({

  mixins: [BasicMixin, StyleResolverMixin, BrowserStateMixin],

  render() {

    return <div
      {...this.getBasics()}
      {...this.getBrowserStateEvents()}
      style={this.buildStyles(style.panel)}>

      {this.props.children}
    </div>;
  }
});

module.exports = Panel;
