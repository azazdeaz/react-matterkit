import React, {PropTypes} from 'react'
import ReactDOM from 'react-dom'
import ClickAway from './ClickAway'
import List from '../components/List'
import Panel from '../components/Panel'
import flyer from './flyer'

export default class ContextMenu extends React.Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
    items: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.arrayOf(PropTypes.object)
    ]),
    triggerEvent: PropTypes.string,
    renderContent: PropTypes.func,
  }

  static defaultProps = {
    triggerEvent: 'contextmenu',
    renderContent: (props, hide) => {
      const items = (props.items || []).map(item => {
        const originalClickHandler = item.onClick
        if (typeof item === 'string') {
          item = {label: item}
        }
        return {
          ...item,
          onClick() {
            if (originalClickHandler) {
              originalClickHandler()
            }
            hide()
          }
        }
      })

      return <Panel><List items={items}/></Panel>
    }
  }

  componentDidMount() {
    const node = ReactDOM.findDOMNode(this)
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
    this.hide()
    this.disposeLast = flyer({
      x,
      y,
      renderElement: () => this.renderContextMenu()
    })
  }

  hide() {
    if (this.disposeLast) {
      this.disposeLast()
      this.disposeLast = undefined
    }
  }

  renderContextMenu() {
    const {renderContent} = this.props
    return <ClickAway onClickAway={this.handleClickAway}>
      {renderContent(this.props, () => this.hide())}
    </ClickAway>
  }

  render() {
    return this.props.children
  }
}
