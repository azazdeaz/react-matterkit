import React from 'react';
import TabHeader from './TabHeader';
import Radium from 'radium';
import pureRender from 'pure-render-decorator';
import MatterBasics from '../../utils/MatterBasics';

@Radium.Enhancer
@pureRender
@MatterBasics
export default class Tabs extends React.Component {

  static propTypes = {
  }

  static defaultProps = {
    stretchLabels: true,
    defaultTabIdx: 0,
  }

  constructor(props) {
    super(props);

    this.state = {
      currTabIdx: props.defaultTabIdx,
    };
  }

  _selectTab(idx) {
    this.setState({currTabIdx: idx});

    if (this.props.onChangeTabIdx) {

      this.props.onChangeTabIdx(idx);
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({currTabIdx: nextProps.defaultTabIdx});
  }

  render() {
    var {mod, style} = this.props;

    var currTab;


    React.Children.forEach(this.props.children, (child, idx) => {

      if(this.state.currTabIdx === idx) {

        currTab = child;
      }
    });

    return <div
      {...this.getBasics()}
      style = {this.getStyle('tabBase', mod, style)}>

      <TabHeader
        currTabIdx = {this.state.currTabIdx}
        onSelectTab = {idx => this._selectTab(idx)}
        children = {this.props.children}
        stretchLabels = {this.props.stretchLabels}/>

      <div style={this.getStyle('tabCont', mod)}>
        {currTab}
      </div>
    </div>;
  }
}
