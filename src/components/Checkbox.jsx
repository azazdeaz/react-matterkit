import React from 'react';
import has from 'lodash/object/has';
import Radium from 'radium';
import pureRender from 'pure-render-decorator';
import MatterBasics from '../utils/MatterBasics';

@Radium
@pureRender
@MatterBasics
export default class Checkbox extends React.Component {

  static propTypes = {
    value: React.PropTypes.bool,
    disabled: React.PropTypes.bool,
  }

  static defaultProps = {
    value: false,
    disabled: false,
  }

  constructor(props) {
    super(props);

    this.state = {
      value: props.value,
    };
  }

  componentWillReceiveProps(nextProps) {

    this.setState({value: nextProps.value});
  }

  handleClick() {

    var value = !this.state.value;

    this.setState({value});

    if (this.props.onChange) {
      this.props.onChange(value);
    }
  }

  renderCheck() {

    if (!this.state.value) {
      return null;
    }

    var {start, end} = this.getStyle('config', {gardient: true});

    return <svg width="18" height="18" style={{position: 'absolute'}}>
      <defs>
        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{stopColor: start, stopOpacity: 1}} />
          <stop offset="100%" style={{stopColor: end, stopOpacity: 1}} />
        </linearGradient>
      </defs>
      <path d="M3.5 9 L5.5 9 L7.5 11 L12.5 3 L 14.5 3 L8.5 13 L7 13 Z" fill="url(#grad1)"/>
    </svg>;
  }

  render() {

    var {mod, style} = this.props;

    return <div
      {...this.getBasics()}
      style={this.getStyle('checkbox', mod, style)}
      onClick = {() => this.handleClick()}>

      {this.renderCheck()}
    </div>;
  }
}
