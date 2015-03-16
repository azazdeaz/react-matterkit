var React = require('react');
var _ = require('lodash');
var style = require('./style');

var Toolbar = React.createClass({

  render() {

    var s = _.assign({}, style.toolbarGroup, {
      flex: this.props.flex,
      width: this.props.width,
      justifyContent: this.props.justifyContent,
    });

    return <div style={s}>
      {this.props.children}
    </div>;
  }
});

module.exports = Toolbar;
