import React from 'react';
import Input from './Input';
import Radium from 'radium';
import pureRender from 'pure-render-decorator';
import MatterBasics from '../utils/MatterBasics';

@Radium.Enhancer
@pureRender
@MatterBasics
var StringInput = React.createClass({
  render() {
    return <Input type='text' {...this.props}/>;
  }
});

module.exports = StringInput;
