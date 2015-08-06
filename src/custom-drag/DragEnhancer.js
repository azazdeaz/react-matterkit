import React from 'react'
import createDragger from './createDragger'
import Monitor from './Monitor'

export default (options, collect) => {
  //TODO warn for missing options
  return ComposedComponent => class CustomDrag extends React.Component {
    constructor(props) {
      super(props)

      this.dragItemRef = dragComponent => {
        //TODO handle custom ref functions
        if (dragComponent) {
          let dragNode = React.findDOMNode(dragComponent)
          this.dragger = createDragger(dragNode, options, this.composedComponent)
        }
        else {
          this.dragger.dispose()
        }
      }
    }

    handleComposedComonentRef = (component) => {
      if (component && component.composedComponent) {
        component = component.composedComponent
      }
      this.composedComponent = component

      if (this.dragger) {
        this.dragger.receiveComponent(component)
      }
    }

    getConnect() {
      return {
        getDragRef: () => this.dragItemRef,
        getFakeDownFunc: () => this.dragger && this.dragger.fakeDown
      }
    }

    getMonitor() {
      return this.dragger ? this.dragger.getMonitor() : new Monitor()
    }

    render() {
      var collectedProps = typeof collect === 'function' ?
        collect(this.getConnect(), this.getMonitor()) :
        {draggerRef: this.dragItemRef}

      return <ComposedComponent
        {...this.props}
        {...collectedProps}
        ref = {this.handleComposedComonentRef}/>
    }
  }
}
