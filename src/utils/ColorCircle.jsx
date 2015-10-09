import React, {PropTypes} from 'react'
import ReactDOM from 'react-dom'
import shouldPureComponentUpdate from 'react-pure-render/function'
import Dragger from 'custom-drag'
const PI = Math.PI
const PI2 = PI * 2

function radDiff(a, b) {
  const {PI} = Math
  let diff = b - a
  diff = ((diff + PI) % PI*2) - PI
  return diff
}

function setHue(monitor, component) {
  let {x, y} = monitor.getClientOffset()
  const {centerX, centerY} = monitor.getData()
  x -= centerX
  y -= centerY
  let rad = Math.atan2(y, x)
  rad = rad < 0 ? -rad : PI2 - rad
  const h = rad / PI2
  component.setState({h})
}

function setSaturationLight(props, monitor, component) {
  let {x, y} = monitor.getClientOffset()
  const {h} = component.state
  const {centerX, centerY} = monitor.getData()
  x -= centerX
  y -= centerY
  const dist = Math.sqrt(x*x + y*y)
  const baseRad = -h * PI2
  const mouseRad = Math.atan2(y, x)
  const diffRad = mouseRad - baseRad//radDiff(baseRad, mouseRad)
  x = dist * Math.cos(diffRad)
  y = dist * Math.sin(diffRad)
  const innerRadius = props.radius - props.width
  const smallAltitude = Math.sin(Math.PI/6) * innerRadius
  const edge = Math.sqrt(innerRadius**2 - smallAltitude**2) * 2
  const altitude = innerRadius + smallAltitude

  const saturation = (x + smallAltitude) / altitude
  const lightRange = edge * (1 - saturation)
  const lightness = (y / lightRange) + 0.5

  component.setState({
    l: Math.max(0, Math.min(1, lightness)),
    s: Math.max(0, Math.min(1, saturation))
  })
}

const customDragOptions = {
  onDown(props, monitor, component) {
    const {radius, width} = props
    const clientOffset = monitor.getClientOffset()
    const sourceClientOffset = monitor.getSourceClientOffset()
    const left = clientOffset.x - sourceClientOffset.x
    const top = clientOffset.y - sourceClientOffset.y
    const centerX = left + radius
    const centerY = top + radius
    const x = clientOffset.x - centerX
    const y = clientOffset.y - centerY
    const distanceFromCenter = Math.sqrt(x**2 + y**2)
    let edit

    if (distanceFromCenter < radius) {
      edit = distanceFromCenter > radius - width ? 'h' : 'sv'
    }

    if (!edit) {
      //bail dragging
      return false
    }

    component.setState({focus: true})

    monitor.setData({
      edit,
      centerX,
      centerY
    })

    if (edit === 'h') {
      setHue(monitor, component)
    }
    else {
      setSaturationLight(props, monitor, component)
    }
  },

  onDrag(props, monitor, component) {
    // var deg = getMouseDeg(monitor)
    var {edit} = monitor.getData()

    if (edit === 'h') {
      setHue(monitor, component)
    }
    else {
      setSaturationLight(props, monitor, component)
    }
  },

  onUp(props, monitor, component) {
    component.setState({
      h: props.h,
      s: props.s,
      l: props.l,
      focus: false
    })
  }
}

@Dragger(customDragOptions)
export default class ColorCircle extends React.Component {
  shouldComponentUpdate = shouldPureComponentUpdate
  static propsTypes = {
    radius: PropTypes.number,
    width: PropTypes.number,
    h: PropTypes.number,
    s: PropTypes.number,
    l: PropTypes.number,
    onChange: PropTypes.func,
  }

  static defaultProps = {
    radius: 134,
    width: 32,
    h: 0,
    s: 0.5,
    l: 0.5,
  }

  constructor(props) {
    super(props)

    this.state = {
      h: this.props.h,
      s: this.props.s,
      l: this.props.l,
    }
  }

  componentDidMount() {
    this.renderRange()
    this.renderTri()
    this.renderShadow()
  }

  componentWillReceiveProps(nextProps) {
    if (!this.state.focus) {
      this.setState({
        h: nextProps.h,
        s: nextProps.s,
        l: nextProps.l,
      })
    }
  }

  componentDidUpdate(prevProps, prevState) {
    var {radius, width} = this.props

    if (prevProps.radius !== radius || prevProps.width !== width) {

      this.renderRange()
      this.renderShadow()
    }

    this.renderTri()

    const hslChanged = (a, b) => {
      return a.h !== b.h || a.s !== b.s || a.l !== b.l
    }

    if (
      hslChanged(this.state, prevState) &&
      hslChanged(this.state, this.props) &&
      this.props.onChange
    ) {
      this.props.onChange({
        h: this.state.h,
        s: this.state.s,
        l: this.state.l,
      })
    }
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

    var canvas = ReactDOM.findDOMNode(this.refs.range),
      ctx = canvas.getContext('2d'),
      r0 = this.props.radius - this.props.width,
      r1 = this.props.radius,
      step = PI2 / (2 * r1 * PI)

    canvas.width = r1 * 2
    canvas.height = r1 * 2

    ctx.translate(r1, r1)
    ctx.lineWidth = 2

    for (let rad = 0; rad < PI2; rad += step) {

      const v = rad / PI2
      const color = 'rgb(' + getR(v) + ',' + getG(v) + ',' + getB(v) + ')'

      ctx.beginPath()
      ctx.strokeStyle = color
      ctx.moveTo(Math.cos(rad) * r0, Math.sin(rad) * r0)
      ctx.lineTo(Math.cos(rad) * r1, Math.sin(rad) * r1)
      ctx.stroke()
    }
  }

  renderTri() {
    const canvas = ReactDOM.findDOMNode(this.refs.tri)
    const ctx = canvas.getContext('2d')
    const r0 = this.props.radius - this.props.width
    const r1 = this.props.radius
    const {h} = this.state

    canvas.width = r1 * 2
    canvas.height = r1 * 2
    ctx.translate(r1, r1)
    ctx.moveTo(Math.cos(-PI2 / 3) * r0, Math.sin(-PI2 / 3) * r0)
    ctx.lineTo(Math.cos(0) * r0, Math.sin(0) * r0)
    ctx.lineTo(Math.cos(PI2 / 3) * r0, Math.sin(PI2 / 3) * r0)
    ctx.closePath()
    ctx.fillStyle = `hsl(${h*360},100%,50%)`
    ctx.fill()
  }

  renderShadow() {
    const canvas =  ReactDOM.findDOMNode(this.refs.shadow)
    const ctx = canvas.getContext('2d')
    const {radius, width} = this.props
    const innerRadius = radius - width
    const a = {
      x: Math.cos(-PI2 / 3) * innerRadius,
      y: Math.sin(-PI2 / 3) * innerRadius
    }
    const b = {
      x: Math.cos(0) * innerRadius,
      y: Math.sin(0) * innerRadius
    }
    const c = {
      x: Math.cos(PI2 / 3) * innerRadius,
      y: Math.sin(PI2 / 3) * innerRadius
    }
    const triangleHeight = c.y - a.y
    const triangleWidth = b.x - a.x

    canvas.width = radius * 2
    canvas.height = radius * 2
    ctx.translate(radius + a.x, radius + a.y)
    for (let i = 0; i < triangleWidth; i += 1) {
      const pos = i / triangleWidth
      const alpha = 1 - pos
      const gap = (triangleHeight * pos) / 2
      const grd = ctx.createLinearGradient(0, gap, 0, triangleHeight - gap)
      grd.addColorStop(0, `rgba(255, 255, 255, ${alpha})`)
      grd.addColorStop(1, `rgba(0, 0, 0, ${alpha})`)

      ctx.beginPath()
      ctx.moveTo(i - 0.5, gap)
      ctx.lineTo(i - 0.5, triangleHeight - gap + 0.23)
      ctx.strokeStyle = grd
      ctx.stroke()
      ctx.closePath()
    }
  }

  renderControlls() {
    const {radius, width} = this.props
    const {h, s, l} = this.state
    const rad = (-h * PI2)
    const innerRadius = radius - width
    const smallAltitude = Math.sin(PI/6) * innerRadius
    const edge = Math.sqrt(innerRadius**2 - smallAltitude**2) * 2
    const altitude = innerRadius + smallAltitude
    let cx = (altitude * s) - smallAltitude
    let cy = edge * (s - 1) * (l - 0.5)
    const cRad = Math.atan2(cy, cx) - rad
    const cDist = Math.sqrt(cx**2 + cy**2)
    cx = radius + Math.cos(cRad) * cDist
    cy = radius - Math.sin(cRad) * cDist

    return <svg style={{
        position: 'absolute',
        left: 0,
        overflow: 'visible',
        pointerEvents: 'none',
      }}>
      <circle
        r = {6}
        cx = {cx}
        cy = {cy}
        fill = 'none'
        stroke = '#fff'
        strokeWidth = {2}/>
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
    const {h} = this.state
    const rotate = `rotate(${-h * 360}deg)`

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
    const {draggerRef, style} = this.props

    return <div ref={draggerRef} style={style}>
      <canvas ref='range'/>
      {this.renderTriangle()}
      {this.renderControlls()}
    </div>
  }
}
