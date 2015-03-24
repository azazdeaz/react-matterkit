var React = require('react');
var Template = require('./utils/Template.jsx');

var description = `
label: String`;

var code = [
  'return <Button label="button"/>;',
  'return <Button label="button" kind=\'colored\'/>;',
];

module.exports = React.createClass({
  render() {

    return <Template
      title='Button'
      description={description}
      code={code}
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
