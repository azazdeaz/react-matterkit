import React from 'react';
import has from 'lodash/object/has';
import assign from 'lodash/object/assign';
import Radium from 'radium';
import pureRender from 'pure-render-decorator';
import MatterBasics from '../utils/MatterBasics';

@Radium.Enhancer
@pureRender
@MatterBasics
export default class Toggle extends React.Component {

  static propTypes = {
  }

  static defaultProps = {
    labelLeft: 'ON',
    valueLeft: true,
    labelRight: 'OFF',
    valueRight: false,
  }

  constructor(props) {
    super(props);

    var {defaultValue, valueRight} = props;

    this.state = {
      left: defaultValue === valueRight ? false : true,
    };
  }

  componentWillReciveProps(nextProps) {

    if (has(nextProps, 'defaultValue')) {

      let {defaultValue, valueLeft, valueRight} = this.props;
      let left;

      if (defaultValue === valueLeft) left = true;
      else if (defaultValue === valueRight) left = false;

      if (left !== undefined) {
        this.setState({left});
      }
    }
  },

  onClick() {

    var left = !this.state.left;

    if (this.props.onChange) {
      let value = left ? this.props.valueLeft : this.props.valueRight;
      this.props.onChange(value);
    }

    this.setState({left});
  },

  render() {

    return <div
      style={this.buildStyles(style.toggleBase)}
      onClick={this.onClick}>

      <Side side='left' label={this.props.labelLeft} on={this.state.left}/>
      <Side side='right' label={this.props.labelRight} on={!this.state.left}/>
      <Knob left={this.state.left}/>
    </div>;
  }
});




export default class Side extends React.Component {

  render() {
    return <div style={this.buildStyles(style.toggleSide)}>
      {this.props.label}
    </div>;
  },
});


export default class Knob extends React.Component {

  renderGrip() {

    var grey = style.grey.hover;

    return <svg width='32' height='32'>
      <line x1='13.5' y1='12' x2='13.5' y2='20' stroke={grey} strokeWidth='1'/>
      <line x1='15.5' y1='12' x2='15.5' y2='20' stroke={grey} strokeWidth='1'/>
      <line x1='17.5' y1='12' x2='17.5' y2='20' stroke={grey} strokeWidth='1'/>
    </svg>;
  },

  render() {

    return <div
      {...this.getBrowserStateEvents()}
      style={this.buildStyles(style.toggleKnob)}>

      {this.renderGrip()}
    </div>;
  },
});



module.exports = Toggle;
