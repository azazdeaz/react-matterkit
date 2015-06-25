import React from 'react'
import CustomDrag from '../utils/CustomDrag'
import Radium from 'radium'
import pureRender from 'pure-render-decorator'
import MatterBasics from '../utils/MatterBasics'

@Radium
@pureRender
@MatterBasics
export default class Slider extends React.Component {

  static propTypes = {
  }

  static defaultProps = {
    min: -100,
    max: 100,
    value: 0,
  }

  constructor(props) {
    super(props)

    this.state = {dragging: false}
  }

  componentDidMount() {
    new CustomDrag({
      deTarget: React.findDOMNode(this.refs.handle),
      onDown: () => ({
        value: this.props.value,
        width: React.findDOMNode(this).offsetWidth,
      }),
      onDrag: md => {

        this.setState({dragging: true})

        var range = this.props.max - this.props.min,
          value = md.value + (md.dx / md.width) * range

        this.props.onChange(value)
      },
      onUp: () => {
        this.setState({dragging: false})
      }
    })
  }
  render() {

    var width = this.isMounted() ? React.findDOMNode(this).offsetWidth : 0,
      range = this.props.max - this.props.min,
      progress = (this.props.value - this.props.min) / range,
      percent = Math.max(0, Math.min(1, progress))*100 + '%'

    return <div style={style.slider}
      onMouseDown={e => e.preventDefault()}>
      <Handle ref='handle' left={percent} dragging={this.state.dragging}/>
      <div style={style.sliderBarBg}>
        <div ref='progress' style={_.defaults({width: percent}, style.sliderBarProgress)}/>
      </div>
    </div>
  }
}

export default class Handle extends React.Component {

  getInitialState() {
    return {
      hover: false,
      down: false,
    }
  }
  onMouseUp() {
    this.setState({down: false})
  }
  componentDidMount() {
    window.addEventListener('mouseup', this.onMouseUp)
  }
  componentWillUnmount() {
    window.removeEventListener('mouseup', this.onMouseUp)
  }
  render() {

    var s

  if (this.state.down || this.props.dragging) s = style.sliderHandleActive
    else if (this.state.hover) s = style.sliderHandleHover
    else s = style.sliderHandle

    return <div style={_.defaults({left: this.props.left}, s)}
      onMouseEnter={() => this.setState({hover: true})}
      onMouseLeave={() => this.setState({hover: false})}
      onMouseDown={() => this.setState({down: true})}>
    </div>
  }
}
