import React from 'react'
// import tinycolor from 'tinycolor2'
import pureRender from 'pure-render-decorator'
import Dragger from '../custom-drag'

function radDiff(a, b) {
  var {PI} = Math
  var diff = b - a
  diff = ((diff + PI) % PI*2) - PI
  return diff
}

function setHue(monitor, component) {
  var {x, y} = monitor.getClientOffset()
  var {centerX, centerY} = monitor.getData()
  x -= centerX
  y -= centerY
  var rad = Math.atan2(y, x)
  var deg = rad / Math.PI * 180

  component.setState({h: -deg})
}

function setSaturationLight(monitor, component) {
  var {x, y} = monitor.getClientOffset()
  var {h} = component.state
  var {centerX, centerY} = monitor.getData()
  x -= centerX
  y -= centerY
  var dist = Math.sqrt(x*x, y*y)
  var baseRad = h / 180 * Math.PI
  var mouseRad = Math.atan2(y, x)
  var diffRad = radDiff(baseRad, mouseRad)
  x = dist * Math.cos(diffRad)
  y = dist * Math.sin(diffRad)

  console.log({x, y, baseRad, mouseRad, diffRad})
}

const customDragOptions = {
  onDown(props, monitor, component) {
    var {radius, width} = props
    var clientOffset = monitor.getClientOffset()
    var sourceClientOffset = monitor.getSourceClientOffset()
    var left = clientOffset.x - sourceClientOffset.x
    var top = clientOffset.y - sourceClientOffset.y
    var centerX = left + radius
    var centerY = top + radius
    var x = clientOffset.x - centerX
    var y = clientOffset.y - centerY
    var distanceFromCenter = Math.sqrt(x**2 + y**2)
    var edit

    if (distanceFromCenter < radius) {
      edit = distanceFromCenter > radius - width ? 'h' : 'sv'
    }

    if (!edit) {
      //bail dragging
      return false
    }
    console.log('clientOffset', clientOffset)
    console.log('sourceClientOffset', sourceClientOffset)

    monitor.setData({
      edit,
      centerX,
      centerY
    })

    if (edit === 'h') {
      setHue(monitor, component)
    }
    else {
      setSaturationLight(monitor, component)
    }
  },

  onDrag(props, monitor, component) {
    // var deg = getMouseDeg(monitor)
    var {edit} = monitor.getData()

    if (edit === 'h') {
      setHue(monitor, component)
    }
    else {
      setSaturationLight(monitor, component)
    }
  }
}

@Dragger(customDragOptions)
@pureRender
export default class ColorCircle extends React.Component {

  static defaultProps = {
    radius: 234,
    width: 32,
    h: 10,
    l: 100,
    s: 12,
  }

  constructor(props) {
    super(props)
    this.state = {
      h: this.props.h,
      s: this.props.s,
      v: this.props.v,
    }
  }

  componentDidMount() {
    this.renderRange()
    this.renderTri()
    this.renderShadow()
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      h: nextProps.h,
      s: nextProps.s,
      v: nextProps.v,
    })
  }

  componentDidUpdate(prevProps) {
    var {radius, width} = this.props

    if (prevProps.radius !== radius || prevProps.width !== width) {

      this.renderRange()
      this.renderShadow()
    }

    this.renderTri()
  }

  renderRange() {
    function getChannel(stops, _v) {

      var p = (_v * 6) % 1,
        posA = parseInt(_v * 6),
        posB = (posA + 1) % 6,
        pos = stops[posA] + (stops[posB] - stops[posA]) * p

      return parseInt(pos * 256)
    }
    var getR = getChannel.bind(null, [1, 1, 0, 0, 0, 1, 1])
    var getG = getChannel.bind(null, [0, 0, 0, 1, 1, 1, 0])
    var getB = getChannel.bind(null, [0, 1, 1, 1, 0, 0, 0])

    var canvas = React.findDOMNode(this.refs.range),
      ctx = canvas.getContext('2d'),
      r0 = this.props.radius - this.props.width,
      r1 = this.props.radius,
      PI2 = Math.PI * 2,
      step = PI2 / (2 * r1 * Math.PI)

    canvas.width = r1 * 2
    canvas.height = r1 * 2

    ctx.translate(r1, r1)
    ctx.lineWidth = 2

    for (var rad = 0; rad < PI2; rad += step) {

      var v = rad / PI2,
        color = 'rgb(' + getR(v) + ',' + getG(v) + ',' + getB(v) + ')'

      ctx.beginPath()
      ctx.strokeStyle = color
      ctx.moveTo(Math.cos(rad) * r0, Math.sin(rad) * r0)
      ctx.lineTo(Math.cos(rad) * r1, Math.sin(rad) * r1)
      ctx.stroke()
    }
  }

  renderTri() {
    var canvas = React.findDOMNode(this.refs.tri),
      ctx = canvas.getContext('2d'),
      r0 = this.props.radius - this.props.width,
      r1 = this.props.radius,
      {h} = this.state

    canvas.width = r1 * 2
    canvas.height = r1 * 2
    ctx.translate(r1, r1)
    ctx.moveTo(Math.cos(Math.PI * -2 / 3) * r0, Math.sin(Math.PI * -2 / 3) * r0)
    ctx.lineTo(Math.cos(0) * r0, Math.sin(0) * r0)
    ctx.lineTo(Math.cos(Math.PI * 2 / 3) * r0, Math.sin(Math.PI * 2 / 3) * r0)
    ctx.closePath()
    ctx.fillStyle = `hsl(${h},100%,50%)`
    ctx.fill()
  }

  renderShadow() {
    var canvas =  React.findDOMNode(this.refs.shadow)
    var ctx = canvas.getContext('2d')
    var {radius} = this.props
    var r0 = this.props.radius - this.props.width
    var r1 = this.props.radius
    var {h} = this.state
    var a = {
      x: Math.cos(Math.PI * -2 / 3) * r0,
      y: Math.sin(Math.PI * -2 / 3) * r0
    }
    var b = {
      x: Math.cos(0) * r0,
      y: Math.sin(0) * r0
    }
    var c = {
      x: Math.cos(Math.PI * 2 / 3) * r0,
      y: Math.sin(Math.PI * 2 / 3) * r0
    }
    var height = c.y - a.y
    var width = b.x - a.x

    canvas.width = radius * 2
    canvas.height = radius * 2
    ctx.translate(radius + a.x, radius + a.y)
    for (let i = 0; i < width; i += 1) {
      let pos = i / width
      let alpha = 1 - pos
      let gap = (height * pos) / 2
      let grd = ctx.createLinearGradient(0, gap, 0, height - gap)
      grd.addColorStop(0, `rgba(255, 255, 255, ${alpha})`)
      grd.addColorStop(1, `rgba(0, 0, 0, ${alpha})`)

      ctx.beginPath()
      ctx.moveTo(i - 0.5, gap)
      ctx.lineTo(i - 0.5, height - gap + 0.23)
      ctx.strokeStyle = grd
      ctx.stroke()
      ctx.closePath()
    }
  }

  renderControlls() {
    var {radius, width} = this.props
    var {h, s, l} = this.state
    var rad = -h / 180 * Math.PI

    var innerRadius = radius - width

    return <svg style={{
        position: 'absolute',
        left: 0,
        overflow: 'visible',
        pointerEvents: 'none',
      }}>
      <line
        x1 = {radius + Math.cos(rad) * innerRadius}
        y1 = {radius + Math.sin(rad) * innerRadius}
        x2 = {radius + Math.cos(rad) * radius}
        y2 = {radius + Math.sin(rad) * radius}
        stroke = '#fff'
        strokeWidth = {2}/>
    </svg>
  }

  renderTriangle() {
    const {radius} = this.props
    const rotate = `rotate(${-this.state.h}deg)`

    return <div style =   {{
        position: 'absolute',
        width: radius * 2,
        height: radius * 2,
        left: 0,
        top: 0,
        transform: rotate}}>
      <canvas ref='tri' style={{position: 'absolute', left: 0}}/>
      <canvas ref='shadow' style={{position: 'absolute', left: 0}}/>
    </div>
  }

  render() {
    const {draggerRef} = this.props

    return <div ref={draggerRef} style={this.props.style}>
      <canvas ref='range'/>
      {this.renderTriangle()}
      {this.renderControlls()}
    </div>
  }
}
