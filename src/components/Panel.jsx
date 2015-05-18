import React from 'react';
import Radium from 'radium';
import pureRender from 'pure-render-decorator';
import MatterBasics from '../utils/MatterBasics';

@Radium.Enhancer
@MatterBasics
var Panel = React.createClass(Radium.wrap({

  render() {

    var {mod, style} = this.props;

    return <div
      {...this.getBasics()}
      style = {this.getStyle('panel', mod, style)}>

      {this.props.children}
    </div>;
  }
}));

module.exports = Panel;
