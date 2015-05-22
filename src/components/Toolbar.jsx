import React from 'react';
import style from './style';
import Radium from 'radium';
import MatterBasics from '../utils/MatterBasics';

@Radium.Enhancer
@MatterBasics
export default class Toolbar extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    var {mod, style} = this.props;

    return <div
      {...this.getBasics()}
      style={this.getStyle('toolbar', mod, style)}
      onClick={this.props.onClick}>
      {this.props.children}
    </div>;
  }
}
