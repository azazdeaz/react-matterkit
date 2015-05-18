import React from 'react';
import tinycolor from 'tinycolor2';
import style from './style';
import Input from './Input';
import ColorCircle from '../utils/ColorCircle';
import Radium from 'radium';
import pureRender from 'pure-render-decorator';
import MatterBasics from '../utils/MatterBasics';

var FORMATS = ['prgb', 'hex6', 'hex3', 'hex8', 'name', 'hsl', 'hsv'];
//TODO customiseable formats

@Radium.Enhancer
@pureRender
@MatterBasics
var MultiTypeInput = React.createClass({

  static propTypes = {
  }

  static defaultProps =

  constructor(props) {
    super(props);

    this.state = ;
  }

  static defaultProps =
    return {
      value: '#000000',
    };
  },

  getInitialState() {

    var {value} = this.props;

    return {
      value,
      format: tinycolor(value).getFormat(),
    };
  },

  componentWillReceiveProps(nextProps) {

    var {value} = nextProps;
    this.setState({
      value,
      format: tinycolor(value).getFormat(),
    });
  },

  getCurrTypeIdx(props) {

    props = props || this.props;

    var {typeIdx, chooseType, value} = props;
    return chooseType ? chooseType(value) : defaultTypeIdx;
  },

  handleChange(value) {

    this.setState({
      value,
      format: tinycolor(value).getFormat(),
    });

    if (this.props.onChange) {
      this.props.onChange(value);
    }
  },

  stepFormat() {

    var idx = FORMATS.indexOf(this.state.format) + 1;
    idx %= FORMATS.length;

    var format = FORMATS[idx];
    var value = tinycolor(this.state.value).toString(format);

    this.setState({value, format});
  },

  renderSelector() {

    // if (!this.state.focus) return null;

    var hsl = tinycolor(this.state.value).toHsl();

    return <div style={{
      position: 'absolute',
      zIndex: 1,
      top: 32,
      left: 0,
      width: '100%',
    }}>
      <ColorCircle
        {...hsl}
        width={28}
        radius={64}/>
    </div>;
  },

  render() {

    return <span>
      <Input
        {...this.getBasics()}
        {...this.props}
        value = {this.state.value}
        addonIcon = 'adjust'
        onChange = {this.handleChange}
        onInitialFormat = {this.handleChange}/>
      {this.renderSelector()}
    </span>;
  }
});

module.exports = MultiTypeInput;
