import React from 'react';
import Radium from 'radium';
import pureRender from 'pure-render-decorator';
import MatterBasics from '../utils/MatterBasics';

@Radium
@MatterBasics
export default class Panel extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    var {mod, style} = this.props;

    return <div
      {...this.getBasics()}
      style = {this.getStyle('panel', mod, style)}>

      {this.props.children}
    </div>;
  }
}
