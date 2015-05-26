import React from 'react';
import Radium from 'radium';
import pureRender from 'pure-render-decorator';
import assign from 'lodash/object/assign';
import MatterBasics from '../utils/MatterBasics';

@Radium.Enhancer
@pureRender
@MatterBasics
export default class Toolbar extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    var {mod, style} = this.props;

    style = assign({
      flex: this.props.flex,
      width: this.props.width,
      justifyContent: this.props.justifyContent,
    }, style);

    return <div
      {...this.getBasics()}
      style={this.getStyle('toolbarGroup', mod, style)}>
      {this.props.children}
    </div>;
  }
}
