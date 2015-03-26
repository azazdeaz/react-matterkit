var React = require('react');
var _ = require('lodash');
var style = require('./style');
var CustomDrag = require('../utils/CustomDrag');

var Slider = React.createClass({
  getDefaultProps() {
    return {
      min: -100,
      max: 100,
      value: 0,
    };
  },
  getInitialState() {
    return {dragging: false};
  },
  componentDidMount() {
    new CustomDrag({
      deTarget: this.refs.handle.getDOMNode(),
      onDown: () => ({
        value: this.props.value,
        width: this.getDOMNode().offsetWidth,
      }),
      onDrag: md => {

        this.setState({dragging: true});

        var range = this.props.max - this.props.min,
          value = md.value + (md.dx / md.width) * range;

        this.props.onChange(value);
      },
      onUp: () => {
        this.setState({dragging: false});
      }
    });
  },
  render() {

    var width = this.isMounted() ? this.getDOMNode().offsetWidth : 0,
      range = this.props.max - this.props.min,
      progress = (this.props.value - this.props.min) / range,
      percent = Math.max(0, Math.min(1, progress))*100 + '%';

    return <div style={style.slider}
      onMouseDown={e => e.preventDefault()}>
      <Handle ref='handle' left={percent} dragging={this.state.dragging}/>
      <div style={style.sliderBarBg}>
        <div ref='progress' style={_.defaults({width: percent}, style.sliderBarProgress)}/>
      </div>
    </div>;
  },
});

var Handle = React.createClass({

  getInitialState() {
    return {
      hover: false,
      down: false,
    };
  },
  onMouseUp() {
    this.setState({down: false});
  },
  componentDidMount() {
    window.addEventListener('mouseup', this.onMouseUp);
  },
  componentDidUnmount() {
    window.removeEventListener('mouseup', this.onMouseUp);
  },
  render() {

    var s;

  if (this.state.down || this.props.dragging) s = style.sliderHandleActive;
    else if (this.state.hover) s = style.sliderHandleHover;
    else s = style.sliderHandle;

    return <div style={_.defaults({left: this.props.left}, s)}
      onMouseEnter={() => this.setState({hover: true})}
      onMouseLeave={() => this.setState({hover: false})}
      onMouseDown={() => this.setState({down: true})}>
    </div>;
  }
});

module.exports = Slider;
