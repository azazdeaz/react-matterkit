var React = require('react');
var Template = require('./utils/Template.jsx');

var description = `
label: String`;

var codes = [
  '<Button label="button"/>',
  '<Button label="button" kind=\'colored\'/>',
];

module.exports = React.createClass({
  render() {

    return <Template
      title='Button'
      description={description}
      codes={codes}
      props={[
        {
          name: 'label',
          type: 'string',
          value: 'default: empty string',
          description: 'the label of the button'
        }
      ]}/>;
  },
});
