import React from 'react';
import Radium from 'radium';
import pureRender from 'pure-render-decorator';
import MatterBasics from '../utils/MatterBasics';

@Radium.Enhancer
@pureRender
@MatterBasics
export default class Label extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return <span style={style.label}>
      {this.props.children}
    </span>;
  }
});

module.exports = Label;
