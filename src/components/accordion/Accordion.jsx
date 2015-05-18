import React from 'react';
import Radium from 'radium';
import pureRender from 'pure-render-decorator';
import MatterBasics from '../../utils/MatterBasics';

@Radium.Enhancer
@pureRender
@MatterBasics
export default class Accordion extends React.Component {

  constructor(props) {
    super(props);
  }

  onSelect(index) {
    console.log('select tab', index);
  }
  render() {

    return <div style={style.accordion}>
      {this.props.children}
    </div>;
  }
}
