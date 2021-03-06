var React = require('react')
var Template = require('./utils/Template.jsx')

var description = `
label: String`

var codes = [
  `<Checkbox/>`
]

module.exports = React.createClass({
  render() {

    return <Template
      title='Checkbox'
      description={description}
      codes={codes}
      props={[
        {
          name: 'label',
          type: 'string',
          value: 'default: empty string',
          description: 'the label of the button'
        }
      ]}/>
  },
})
