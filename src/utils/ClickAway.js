var React = require('react')

var ClickAway = React.createClass({
  propTypes: {
    children: React.PropTypes.element.isRequired,
    onClickAway: React.PropTypes.func,
  },

  componentDidMount: function() {
    this.__mountTimeStamp = Date.now()
    this.__handleClickAway = function (e) {
//prevent to catch the same initialiser mouse event when it reaches the document
      if (this.__mountTimeStamp < e.timeStamp) {
        var node = React.findDOMNode(this)
        if (!node.contains(e.target) && this.props.onClickAway) {
          this.props.onClickAway()
        }
      }
    }.bind(this)

    document.addEventListener('mousedown', this.__handleClickAway)
    document.addEventListener('contextmenu', this.__handleClickAway)
  },

  componentWillUnmount: function() {
    document.removeEventListener('mousedown', this.__handleClickAway)
    document.removeEventListener('contextmenu', this.__handleClickAway)
  },

  render: function() {
    return this.props.children
  }
})

module.exports = ClickAway
