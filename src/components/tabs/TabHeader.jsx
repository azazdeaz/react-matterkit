import React from 'react';
import TabLabel from './TabLabel';
import Radium from 'radium';
import pureRender from 'pure-render-decorator';
import MatterBasics from '../../utils/MatterBasics';

@Radium
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
    var {mod, style} = this.props;

    var childCount = React.Children.count(this.props.children);

    return <div
      {...this.getBasics()}
      style = {this.getStyle('tabHeader', mod, style)}>

      {React.Children.map(this.props.children, (child, idx) => {

        return <TabLabel
          stretch = {this.props.stretchLabels}
          first = {idx === 0}
          last = {idx === childCount - 1}
          selected = {this.props.currTabIdx === idx}
          icon = {child.props.icon}
          label = {child.props.label}
          onSelect = {() => this.props.onSelectTab(idx)}/>;
      })}
    </div>;
  }
}
