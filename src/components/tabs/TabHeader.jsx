import React from 'react';
import TabLabel from './TabLabel';
import Radium from 'radium';
import pureRender from 'pure-render-decorator';
import MatterBasics from '../../utils/MatterBasics';

var TabHeader = React.createClass({

  getDefaultProps() {
    return {
      stretchLabels: true,
    };
  },

  render() {

    var childCount = React.Children.count(this.props.children);

    return <div
      style={this.buildStyles(style.tabHeader)}>

      {React.Children.map(this.props.children, (child, idx) => {

        return <TabLabel
          stretch = {this.props.stretchLabels}
          first = {idx === 0}
          last = {idx === childCount - 1}
          selected = {this.props.currTabIdx === idx}
          label = {child.props.label}
          onSelect = {() => this.props.onSelectTab(idx)}/>;
      })}
    </div>;
  }
});

module.exports = TabHeader;
