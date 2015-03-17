var React = require('react');
var Input = require('./Input');
var CustomDrag = require('./CustomDrag');
var _ = require('lodash');

var NumberInput = React.createClass({

  componentDidMount() {

    if (this.props.draggable) {
      new CustomDrag({
        deTarget: this.getDOMNode(),
        onDown: (e) => {
          return {
            value: this.props.value,
            moved: false,
          };
        },
        onDrag: (md) => {

          md.moved = true;

          var value = md.value + md.dx * this.props.dragSpeed;
          this.props.onChange(this.formatValue(value));
        },
        onUp: (md) => {
          if (!md.moved) this.getDOMNode().focus();
        }
      });
    }
  },
  formatValue(value) {

    var min = this.props.min,
      max = this.props.max,
      precision = this.props.precision;

    if (_.isFinite(min)) value = Math.max(min, value);
    if (_.isFinite(max)) value = Math.min(max, value);

    value = parseFloat(value.toFixed(precision));

    return value;
  },
  getDefaultProps() {
    return {
      draggable: true,
      precision: 0,
      dragSpeed: 1,
      defaultValue: 0,
      min: Number.MIN_VALUE,
      max: Number.MAX_VALUE,
    };
  },
  render() {
    return <Input
      {...this.props}
      onChange = {v => this.props.onChange(this.formatValue(v))}
      type='number'
    ></Input>;
  }
});

module.exports = NumberInput;
