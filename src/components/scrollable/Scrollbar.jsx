import React, {PropTypes} from 'react'
import CustomDrag from '../../custom-drag'
import Radium from 'radium'
import pureRender from 'pure-render-decorator'
import MatterBasics from '../../utils/MatterBasics'

const dragOptions = {
  onDown(props, monitor) {
    monitor.setData({
      initScroll: props.scroll
    })
  },
  onDrag(props, monitor) {
    const {y: mouseOffset} = monitor.getDifferenceFromInitialOffset()
    const {initScroll} = monitor.data
    const {maxScroll, height} = props
    const offset = (maxScroll / height) * mouseOffset
    const scroll = Math.max(0, Math.min(maxScroll, initScroll + offset))
    props.onChange(scroll)
  }
}

@CustomDrag(dragOptions, connect => ({
  dragRef: connect.getDragRef()
}))
@Radium
@MatterBasics
export default class Scrollbar extends React.Component {
  static propTypes = {
    height: PropTypes.number,
    scroll: PropTypes.number,
    maxScroll: PropTypes.number,
    onChange: PropTypes.func,
  }

  static defaultProps = {
    height: 0,
    scroll: 0,
    maxScroll: 0,
  }

  getThumbStyle() {
    const {maxScroll, height, scroll} = this.props
    const display = maxScroll > 0 ? 'hidden' : 'visible'
    const thumbHeight = Math.max(17, height * (height / (maxScroll + height))) || 0
    const top = (height - thumbHeight) * (scroll / maxScroll) || 0
    console.log({top, height, thumbHeight, scroll, maxScroll})
    return {display, height: thumbHeight, top}
  }

  render() {
    const {height, scroll, maxScroll, mod, style, dragRef} = this.props

    return <div style={this.getStyle('scrollbar', mod, style)}>
      <div
        ref = {dragRef}
        style = {this.getStyle('scrollbarThumb', mod, this.getThumbStyle())}/>
    </div>
  }
}
