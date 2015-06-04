import React from 'react';
import Radium from 'radium';
import assign from 'lodash/object/assign';
import MatterBasics from '../utils/MatterBasics';

@Radium.Enhancer
@MatterBasics
export default class Toolbar extends React.Component {
  static defaultProps = {
    direction: 'row'
  }

  constructor(props) {
    super(props);
  }

  render() {
    var {mod, style, direction} = this.props;

    mod = assign({direction}, mod);

    return <div
      {...this.getBasics()}
      style={this.getStyle('toolbar', mod, style)}
      onClick={this.props.onClick}>
      {this.props.children}
    </div>;
  }
}
