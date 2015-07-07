import React from 'react'
import makeDraggable from './makeDraggable'

export default options => {
  return ComposedComponent => class CustomDrag extends React.Component {
    constructor(props) {
      super(props)

      var dispose

      this.connectReference = component => {
        debugger
        if (component) {
          dispose = makeDraggable(component, options)
        }
        else {
          dispose()
        }
      }
    }

    render() {
      const refName = options.connectReferenceName || 'customDragReference'
      const props = {
        ...this.props,
        [refName]: this.connectReference
      }

      return <ComposedComponent {...props}/>
    }
  }
}
