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

  render() {
    return <div/>
  }
}
