import React, {PropTypes} from 'react'
import ClickAway from './ClickAway'
import List from '../components/List'

export default class ContextMenu extends React.Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
    items: PropTypes.arrayOf(PropTypes.object),
  }

  componentDidMount() {
    const node = React.findDOMNode(this)
    node.addEventListener('contextmenu', this.handleContextMenu)
  }

  componentWillUnmount() {
    const node = React.findDOMNode(this)
    node.removeEventListener('contextmenu', this.handleContextMenu)
  }

  handleContextMenu = (e) => {
    e.preventDefault()

    if (this.mountNode) {
      this.hide()
    }
    else {
      this.show(e.clientX, e.clientY)
    }
  }

  handleClickAway() {
    this.hide()
  }

  show(x, y) {
    this.mountNode = document.createElement('div')
    this.mountNode.style.position = 'fixed'
    this.mountNode.style.left = `${x}px`
    this.mountNode.style.top   = `${y}px`
    document.body.appendChild(this.mountNode)
    React.render(this.renderContextMenu(), this.mountNode)
  }

  hide() {
    React.unmountComponentAtNode(this.mountNode)
    const {parentNode} = this.mountNode
    if (parentNode) {
      parentNode.removeChild(this.mountNode)
    }
  }

  renderContextMenu() {
    const {items} = this.props
    return <ClickAway onClickAway={this.handleClickAway}>
      <List items={items}/>
    </ClickAway>
  }

  render() {
    return this.props.children
  }
}
