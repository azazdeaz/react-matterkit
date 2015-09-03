var React = require('react')

var ClickAway = React.createClass({
  propTypes: {
    children: React.PropTypes.element.isRequired,
    onClickAway: React.PropTypes.func,
  },

  componentDidMount: function() {
    this.__handleClickAway = function (e) {
      var node = React.findDOMNode(this)
      if (!node.contains(e.target) && this.props.onClickAway) {
        this.props.onClickAway()
      }
    }.bind(this)

    document.addEventListener('click', this.__handleClickAway)
  },

  componentWillUnmount: function() {
    document.removeEventListener('click', this.__handleClickAway)
  },

  render: function() {
    return this.props.children
  }
})

module.exports = ClickAway
