import React from 'react'
import makeDraggable from './makeDraggable'

export default options => {
  return ComposedComponent => class CustomDrag extends React.Component {
    constructor(props) {
      super(props)

      this.connectReference = component => {
        if (component) {
          this.dragger = makeDraggable(React.findDOMNode(component), options)
        }
        else {
          this.dragger.dispose()
        }
      }
    }

    handleChildRef = (component) => {
      this.dragger.receiveComponent(component)
    }

    render() {
      const refName = options.connectReferenceName || 'customDragReference'
      const props = {
        ...this.props,
        [refName]: this.connectReference
      }

      return <ComposedComponent
        {...props}
        ref = {this.handleChildRef}/>
    }
  }
}
