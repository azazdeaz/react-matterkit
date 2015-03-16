var React = require('react');
var Tooltip = require('./Tooltip.jsx');
var DropdownMenu = require('./DropdownMenu.jsx');
var _ = require('lodash');

var Base = React.createClass({

  render() {

    var tooltip, dropdownMenu;

    //tooltip
    if (true||this.props.tooltip) {
      tooltip = <Tooltip content='tooltip tooltip tooltip'/>;
    }

    //dropdown
    if (this.props.dropdownMenu) {

      let ddm = this.props.dropdownMenu;
      ddm = _.isArray(ddm) ?  {items: ddm} : ddm;

      dropdownMenu = <DropdownMenu {...ddm}/>;
    }

    return <div style={this.props.style}>
      {this.props.children}
      {tooltip}
      {dropdownMenu}
    </div>;
  }
});

module.exports = Base;
