import React, {PropTypes} from 'react'
import ClickAway from './ClickAway'
import List from '../components/List'
import Panel from '../components/Panel'

export default class ContextMenu extends React.Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
    items: PropTypes.arrayOf(PropTypes.object),
    triggerEvent: PropTypes.string,
    renderContent: PropTypes.func,
  }

  static defaultProps = {
    triggerEvent: 'contextmenu',
    renderContent: props => <Panel><List items={props.items}/></Panel>
  }

  componentDidMount() {
    const node = React.findDOMNode(this)
    const {triggerEvent} = this.props

    node.addEventListener(triggerEvent, this.handleContextMenu)
    this.dispose = () => {
      node.removeEventListener(triggerEvent, this.handleContextMenu)
    }
  }

  componentWillUnmount() {
    this.dispose()
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

  handleClickAway = () => {
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
    const parentNode = this.mountNode && this.mountNode.parentNode
    if (parentNode) {
      parentNode.removeChild(this.mountNode)
    }
    this.mountNode = undefined
  }

  renderContextMenu() {
    const {renderContent} = this.props
    return <ClickAway onClickAway={this.handleClickAway}>
      {renderContent(this.props)}
    </ClickAway>
  }

  render() {
    return this.props.children
  }
}
