import React from 'react';
import style from './style';
import BasicMixin from '../utils/BasicMixin';
import assign from 'lodash/object/assign';
import Radium from 'radium';
import pureRender from 'pure-render-decorator';
import MatterBasics from '../utils/MatterBasics';

@Radium.Enhancer
@MatterBasics
var Toolbar = React.createClass({

  render() {
    return <div
      {...this.getBasics()}
      style={assign({}, style.toolbar, this.props.style)}
      onClick={this.props.onClick}>
      {this.props.children}
    </div>;
  }
});

module.exports = Toolbar;
