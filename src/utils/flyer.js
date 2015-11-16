import ReactDOM from 'react-dom'

export default function flyer({x, y, renderElement, wrapperStyle}) {
  const mountNode = document.createElement('div')
  mountNode.style.position = 'fixed'
  mountNode.style.left = `${x}px`
  mountNode.style.top   = `${y}px`

  if (wrapperStyle) {
    Object.keys(wrapperStyle).forEach(name => {
      mountNode.style[name] = wrapperStyle[name]
    })
  }

  document.body.appendChild(mountNode)
  ReactDOM.render(renderElement(), mountNode, place)

  function place() {
    const {right, bottom} = mountNode.getBoundingClientRect()
    if (right > window.innerWidth) {
      mountNode.style.left = `${x - (right - window.innerWidth)}px`
    }
    if (bottom > window.innerHeight) {
      mountNode.style.top = `${y - (bottom - window.innerHeight)}px`
    }
  }

  return () => {
    ReactDOM.unmountComponentAtNode(mountNode)
    const parentNode = mountNode && mountNode.parentNode
    if (parentNode) {
      parentNode.removeChild(mountNode)
    }
  }
}

// show = () => {
//   var domNode = React.findDOMNode(this)
//   var parent = domNode.parentNode
//   var br = parent.getBoundingClientRect()
//
//   this.setState({
//     show: true,
//     style: {
//       left: br.left - this.props.width - 5,
//       top: br.top,
//     }
//   })
// }
//
// hide = () => {
//   clearTimeout(this._showSetT)
//   this.setState({show: false})
// }
//
// componentDidMount() {
//   this.targetNode = React.findDOMNode(this).parentNode
//   this.targetNode.addEventListener('mouseover', this.showDelayed)
//   this.targetNode.addEventListener('mouseleave', this.hide)
// }
//
// componentWillUnmount() {
//   this.targetNode.removeEventListener('mouseover', this.showDelayed)
//   this.targetNode.removeEventListener('mouseleave', this.hide)
// }
//
// componentDidUpdate() {
//   this.placeContent()
// }
//
// placeContent(node) {
//   var {place} = this.props
//   var full = {
//     top: 0,
//     left: 0,
//     width: window.innerWidth,
//     height: window.innerHeight
//   }
//   full.right = full.width
//   full.bottom = full.height
//   var target = this.targetNode.getBoundingClientRect()
//   var content = React.findDOMNode(this).getBoundingClientRect()
//   var position = {}
//
//   changePlaceIfNeeded()
//
//   if (isPlaceVertical()) {
//     if (place === 'left') {
//       position.left = target.left - content.width
//     }
//     else {
//       position.left = target.right
//     }
//     position.top = target.top + ((target.height - content.height) / 2)
//   }
//   else {
//     if (place === 'top') {
//       position.top = target.top - content.height
//     }
//     else {
//       position.top = target.bottom
//     }
//     position.left = target.left + ((target.width - content.width) / 2)
//   }
//
//   this.setState({position})
//
//   function changePlaceIfNeeded() {
//     var oppositePlace = getOppositePlace()
//     var space = target[palce] - full[palce]
//     var oppositeSpace = target[oppositePalce] - full[oppositePalce]
//     var size = isPlaceVertical() ? content.width : content.height
//
//     if (space < size && space < oppositeSpace) {
//       place = oppositePalce
//     }
//   }
//
//   function getOppositePlace() {
//     switch (place) {
//       case 'top': return 'bottom'
//       case 'bottom': return 'top'
//       case 'left': return 'right'
//       case 'right': return 'left'
//     }
//   }
//
//   function isPlaceVertical() {
//     return place === 'left' || place === 'right'
//   }
// }
