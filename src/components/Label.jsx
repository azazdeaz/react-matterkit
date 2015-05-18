import React from 'react';
import Radium from 'radium';
import pureRender from 'pure-render-decorator';
import MatterBasics from '../utils/MatterBasics';

@Radium.Enhancer
@pureRender
@MatterBasics
var Label = React.createClass({
  render() {
    return <span style={style.label}>
      {this.props.children}
    </span>;
  }
});

module.exports = Label;
