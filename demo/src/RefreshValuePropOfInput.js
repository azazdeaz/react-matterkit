import React from 'react'

export default class RefreshValuePropOfInput extends React.Component {
  static propTypes = {
    children: React.PropTypes.element.isRequired
  }

  constructor(props) {
    super(props)

    this.state = {}
  }

  handleChange = (value) => {
    this.setState({value})
  }

  render() {
    var {children} = this.props
    var {state} = this
    var input = React.cloneElement(children, {
      value: state.value === undefined ? children.props.value : state.value,
      onChange: (value) => {
        if (children.props.onChange) {
          children.props.onChange(value)
        }
        this.handleChange(value)
      }
    })
    return input
  }
}
