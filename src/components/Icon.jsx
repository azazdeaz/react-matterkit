import React from 'react';
import Radium from 'radium';
import pureRender from 'pure-render-decorator';
import MatterBasics from '../utils/MatterBasics';

@Radium.Enhancer
@pureRender
@MatterBasics
export default class Icon extends React.Component {

  static propTypes = {
  }

  static defaultProps = {

  }

  constructor(props) {
    super(props);
  }

  render() {
    var {mod, style} = this.prosp;

    return <i
      {...this.getBasics()}
      style = {this.getStyle('icon', mod, style)}
      className = {this.props.className || `fa fa-${this.props.icon}`}
      onClick = {this.props.onClick}/>;
  }
}
