var React = require('react');
var _ = require('lodash');
var style = require('../style');
var AccordionTab = require('./AccordionTab.jsx');

var Accordion = React.createClass({
  selecteds: [],
  onSelect(index) {
    console.log('select tab', index);
  },
  render() {

    return <div style={style.accordion}>
      {this.props.children}
    </div>;
  },
});

module.exports = Accordion;
