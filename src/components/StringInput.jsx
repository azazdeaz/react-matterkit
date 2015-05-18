import React from 'react';
import Input from './Input';
import Radium from 'radium';
import pureRender from 'pure-render-decorator';
import MatterBasics from '../utils/MatterBasics';

@Radium.Enhancer
@pureRender
@MatterBasics
export default class StringInput extends React.Component {

  static propTypes = {
  }

  static defaultProps =

  constructor(props) {
    super(props);

    this.state = ;
  }

  render() {
    return <Input type='text' {...this.props}/>;
  }
});

module.exports = StringInput;
