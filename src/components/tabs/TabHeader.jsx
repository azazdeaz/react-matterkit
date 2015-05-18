import React from 'react';
import TabLabel from './TabLa   bel';
import Radium from 'radium';
import pureRender from 'pure-render-decorator';
import MatterBasics from '../../utils/MatterBasics';

@Radium.Enhancer
@pureRender
@MatterBasics
export default class TabHeader extends React.Component {

  static propTypes = {
  }

  static defaultProps = {
    stretchLabels: true,
  }

  constructor(props) {
    super(props);
  }

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
}
