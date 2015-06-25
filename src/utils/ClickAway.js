import React from 'react'

export default function (Component) {

  var {componentDidMount, componentWillUnmount} = Component.prototype

  Component.prototype.componentDidMount = function () {
    if (componentDidMount) {
      componentDidMount.call(this)
    }

    this.__handleClickAway = (e) => {

      if (this.state.open) {

        var node = React.findDOMNode(this)
        if (!node.contains(e.target)) {

          this.handleClickAway()
        }
      }
    }

    document.addEventListener('click', this.__handleClickAway)
  }

  Component.prototype.componentWillUnmount = function () {
    if (componentWillUnmount) {
      componentWillUnmount.call(this)
    }

    document.removeEventListener('click', this.__handleClickAway)
  }
}
