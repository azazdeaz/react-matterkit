import React from 'react';
import AccordionTab from './AccordionTab';
import Radium from 'radium';
import pureRender from 'pure-render-decorator';
import MatterBasics from '../../utils/MatterBasics';

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
