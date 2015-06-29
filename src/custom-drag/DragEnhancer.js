import React from 'react'
import makeDraggable from './makeDraggable'
import cloneWithRef from './utils/cloneWithRef'

export default ComposedComponent => class extends React.Component {
  constructor(props) {
    super(props)
    this.disposables = new Map()
  }

  componentWillUnmount() {
    this.disposables.forEach(dispose => dispose())
  }

  connectDrag(connectElement, options) {
    return cloneWithRef(connectElement, (element) => {
      const node = React.findDOMNode(element)
      if (node) {
        const dispose = makeDraggable(node, options)
        this.disposables.set(element, dispose)
      }
      else {
        const dispose = this.disposables.get(element)
        dispose()
      }
    })
  }

  render() {
    return <ComposedComponent
      {...this.props}
      connectDrag={this.connectDrag.bind(this)} />
  }
}
