import React from 'react';
import Radium from 'radium';
import pureRender from 'pure-render-decorator';
import MatterBasics from '../utils/MatterBasics';

@Radium.Enhancer
@pureRender
@MatterBasics
export default class Tooltip extends React.Component {

  static propTypes = {
  }

  static defaultProps = {
    width: 231
  }

  constructor(props) {
    super(props);

    this.state = {show: false};
  }

  showDelayed() {
    clearTimeout(this._showSetT);
    this._showSetT = setTimeout(() => this.show(), 1234);
  },
  show() {

    var domNode = this.getDOMNode(),
      parent = domNode.parentNode,
      br = parent.getBoundingClientRect();

    this.setState({
      show: true,
      style: {
        left: br.left - this.props.width - 5,
        top: br.top,
      }
    });
  },
  hide() {
    clearTimeout(this._showSetT);
    this.setState({show: false});
  },
  componentDidMount() {

    var parent = this.getDOMNode().parentNode;
    parent.addEventListener('mouseover', this.showDelayed);
    parent.addEventListener('mouseleave', this.hide);
  },
  render () {

    if (!this.state.show) return <div style={{display:'none'}}/>;

    return <div
        style={_.defaults({width: this.props.width}, this.state.style, style.tooltip)}>
        {this.props.content}
        <div style={style.tooltipTriangle}/>
      </div>;
  }
}
