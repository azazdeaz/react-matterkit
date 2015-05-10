var React = require('react');
var Radium = require('radium');
var style = require('./style');
var BasicMixin = require('../utils/BasicMixin');

var Panel = React.createClass(Radium.wrap({

  mixins: [BasicMixin],

  render() {

    var {mod, style} = this.props;

    return <div
      {...this.getBasics()}
      style = {this.getStyle('panel', mod, style)}>

      {this.props.children}
    </div>;
  }
}));

module.exports = Panel;
