var React = require('react');
var _ = require('lodash');
var style = require('./style');

var Icon = React.createClass({

  render: function () {
    return <i className = {`fa fa-${this.props.icon}`}
      style = {_.assign({
        lineHeight: this.props.lineHeight || style.itemHeightPX,
        width: '12px',
        textAlign: 'center'
      }, this.props.style)}
      onClick = {this.props.onClick}
    ></i>;
  },
});

module.exports = Icon;
