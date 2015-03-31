var React = require('react');
var { StyleResolverMixin, BrowserStateMixin } = require('radium');
var style = require('./style');

var Panel = React.createClass({

  mixins: [ StyleResolverMixin, BrowserStateMixin ],

  render() {

    return <div
      {...this.getBrowserStateEvents()}
      style={this.buildStyles(style.panel)}>

      {this.props.children}
    </div>;
  }
});

module.exports = Panel;
