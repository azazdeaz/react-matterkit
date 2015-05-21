import React from 'react';
import style from './style';
import BasicMixin from '../utils/BasicMixin';
import assign from 'lodash/object/assign';
import Radium from 'radium';
import pureRender from 'pure-render-decorator';
import MatterBasics from '../utils/MatterBasics';

@Radium.Enhancer
@MatterBasics
export default class Toolbar extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return <div
      {...this.getBasics()}
      style={assign({}, style.toolbar, this.props.style)}
      onClick={this.props.onClick}>
      {this.props.children}
    </div>;
  }
}
