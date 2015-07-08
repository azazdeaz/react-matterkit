import React from 'react'
import createDragger from './createDragger'

export default options => {
  return ComposedComponent => class CustomDrag extends React.Component {
    constructor(props) {
      super(props)

      this.connectReference = component => {
        console.log('connectReference', component)
        if (component) {
          this.dragger = createDragger(React.findDOMNode(component), options)
        }
        else {
          this.dragger.dispose()
        }
      }
    }

    handleChildRef = (component) => {
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
            [refName]: this.connectReference
          }

          return <ComposedComponent
            {...props}
            ref = {this.handleChildRef}/>
        }
  }
}
