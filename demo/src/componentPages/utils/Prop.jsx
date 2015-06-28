var React = require('react')
var {style} = require('../../../../')
var LiveEditor = require('./react-live-edit/live-editor.jsx')
var marked = require('marked')

module.exports = React.createClass({
  getDefaultProps() {
      return {
        name: '',
        type: '',
        value: '',
        description: '',
      }
  },
  render() {

    var rawMarkup = marked(this.props.description)

    var sName = {
      fontWeight: 500,
    }
    var sType = {
      color: style.palette.blue,
    }
    var sValue = {
      margin: 12,
    }
    var sDescription = {
      marginTop: 21,
    }

    return <div style={{display: 'flex'}}>
      <div style={{minWidth: 130}}>
        <span style={sName}>{this.props.name}</span>
      </div>
      <div>
        <div>
          <span style={sType}>{this.props.type}</span>
          <span style={sValue}>{this.props.value}</span>
        </div>
        <div style={sDescription}>
          <span>{this.props.description}</span>
        </div>
      </div>
    </div>
  },
})
