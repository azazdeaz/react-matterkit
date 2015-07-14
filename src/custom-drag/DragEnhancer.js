import React from 'react'
import createDragger from './createDragger'

export default options => {
  return ComposedComponent => class CustomDrag extends React.Component {
    constructor(props) {
      super(props)

      this.dragItemRef = dragComponent => {
        //TODO handle custom ref functions
        if (dragComponent) {
          let dragNode = React.findDOMNode(dragComponent)
          this.dragger = createDragger(dragNode, options)
        }
        else {
          this.dragger.dispose()
        }
      }
    }

    handleComposedComonentRef = (component) => {
      if (this.dragger) {
        this.dragger.receiveComponent(component)
      }
      else {
        console.warn('Dragger: no item connected!')
      }
    }

    render() {
      const refName = options.connectReferenceName || 'draggerRef'
      const props = {
        ...this.props,
        [refName]: this.dragItemRef
      }

      return <ComposedComponent
        {...props}
        ref = {this.handleComposedComonentRef}/>
    }
  }
}
