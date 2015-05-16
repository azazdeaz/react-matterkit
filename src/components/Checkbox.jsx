var React = require('react/addons');
var {PureRenderMixin} = React.addons;
var has = require('lodash/object/has');
var style = require('./style');
var Radium = require('radium');
import pureRender from 'pure-render-decorator';

@Radium.Enhancer
@pureRender
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

    var {start, end} = style.gardient;

    return <svg width="18" height="18" style={{position: 'absolute'}}>
      <defs>
        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{stopColor: start, stopOpacity:1}} />
          <stop offset="100%" style={{stopColor: end, stopOpacity:1}} />
        </linearGradient>
      </defs>
      <path d="M3.5 9 L5.5 9 L7.5 11 L12.5 3 L 14.5 3 L8.5 13 L7 13 Z"  fill="url(#grad1)"/>
    </svg>;
  }

  render() {

    return <div
      style = {this.buildStyles(style.checkbox)}
      onClick = {this._onClick}>

      {this.renderCheck()}
    </div>;
  }
}
