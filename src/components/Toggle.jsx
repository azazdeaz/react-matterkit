import React from 'react';
import has from 'lodash/object/has';
import assign from 'lodash/object/assign';
import Radium from 'radium';
import pureRender from 'pure-render-decorator';
import MatterBasics from '../utils/MatterBasics';

@Radium
@pureRender
@MatterBasics
export default class Toggle extends React.Component {

  static propTypes = {
    labelLeft: React.PropTypes.string,
    valueLeft: React.PropTypes.any,
    labelRight: React.PropTypes.string,
    valueRight: React.PropTypes.any,
  }

  static defaultProps = {
    valueLeft: true,
    valueRight: false,
    labelLeft: 'ON',
    labelRight: 'OFF',
  }

  constructor(props) {
    super(props);

    var {defaultValue, valueRight} = props;

    this.state = {
      left: defaultValue === valueRight ? false : true,
    };
  }

  componentWillReceiveProps(nextProps) {

    if (has(nextProps, 'defaultValue')) {

      let {defaultValue, valueLeft, valueRight} = this.props;
      let left;

      if (defaultValue === valueLeft) left = true;
      else if (defaultValue === valueRight) left = false;

      if (left !== undefined) {
        this.setState({left});
      }
    }
  }

  renderSide(label, on, side) {
    var mod = assign({on, side}, this.props.mod);

    return <div style={this.getStyle('toggleSide', mod)}>
      {label}
    </div>;
  }

  renderKnob(left) {
    var mod = assign({onLeft: left ? 'true' : 'false'}, this.props.mod);

    return <div style={this.getStyle('toggleKnob', mod)}>
      {this.renderGrip()}
    </div>;
  }

  renderGrip() {
    var grey = 'white';

    return <svg width='32' height='32'>
      <line x1='13.5' y1='12' x2='13.5' y2='20' stroke={grey} strokeWidth='1'/>
      <line x1='15.5' y1='12' x2='15.5' y2='20' stroke={grey} strokeWidth='1'/>
      <line x1='17.5' y1='12' x2='17.5' y2='20' stroke={grey} strokeWidth='1'/>
    </svg>;
  }

  handleClick() {

    var left = !this.state.left;

    if (this.props.onChange) {
      let value = left ? this.props.valueLeft : this.props.valueRight;
      this.props.onChange(value);
    }

    this.setState({left});
  }

  render() {
    var {mod, style, labelLeft, labelRight} = this.props;

    return <div
      style = {this.getStyle('toggleBase', mod, style)}
      onClick = {() => this.handleClick()}>

      {this.renderSide(labelLeft, this.state.left, 'left')}
      {this.renderSide(labelRight, !this.state.left, 'right')}
      {this.renderKnob(this.state.left)}
    </div>;
  }
}
