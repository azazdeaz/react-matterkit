import React from 'react'
import tinycolor from 'tinycolor2'
import pureRender from 'pure-render-decorator'
import CustomDrag from '../utils/CustomDrag'

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

    var node = React.findDOMNode(this)

    this._customDrag = new CustomDrag({
      deTarget: node,
      onDown: (e) => {

        var {radius, width} = this.props
        var md = {
          centerX: e.clientX - e.offsetX + radius,
          centerY: e.clientY - e.offsetY + radius,
        }
        var xFromCenter = e.offsetX - radius
        var yFromCenter = e.offsetY - radius
        var r = Math.sqrt(xFromCenter*xFromCenter + yFromCenter*yFromCenter)

        if (r <= radius) {
          if (r < radius - width) {
            md.mode = 'tri'
          }
          else {
            md.mode = 'range'
          }
        }
        console.log(md)
        return md
      },
      onMove(md, mx, my) {

        var x = mx - md.centerX
        var y = my - md.centerY
        var rad = Math.atan2(y, x)
        var deg = rad / Math.PI * 180

        console.log(x, y, deg)
      }
    })

    this.renderRange()
    this.renderTri()
  }

  componentWillUnmount() {

    this._customDrag.destroy()
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

    if (prevProps.radius !== radius && prevProps.radius !== width) {

      this.renderRange()
    }

    this.renderTri()
  }

  renderRange() {

    function getChannel(stops, v) {

      var p = (v * 6) % 1,
        posA = parseInt(v * 6),
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

    canvas.style.transform = `rotate(${h}deg)`
  }

  renderControlls() {

    var {radius, width} = this.props
    var {h, s, l} = this.state
    var rad = h / 180 * Math.PI
    var hRadius = radius - (width / 2)
    var hx = radius + (Math.cos(rad) * hRadius)
    var hy = radius + (Math.sin(rad) * hRadius)

    var slRadius = radius - width

    return <svg style={{
        position: 'absolute',
        left: 0,
        overflow: 'visible',
        pointerEvents: 'none',
      }}>
      <circle
        cx = {hx}
        cy = {hy}
        r = {width/2}/>
    </svg>
  }

  render() {

    return <div style={this.props.style}>
      <canvas ref='range'/>
      <canvas ref='tri' style={{position: 'absolute', left: 0}}/>
      {this.renderControlls()}
    </div>
  }
}
