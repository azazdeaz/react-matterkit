var React = require('react');
var Template = require('./utils/Template.jsx');
var Matter = require('matterkit');

var description = `
label: String`;

var codes = [
  `<Checkbox value={false}/>`,

  '<Button label="button"/>',
  '<Button label="button" kind=\'colored\'/>',
];

module.exports = React.createClass({
  render() {

    return <Template
      title='Button'
      Class={Matter.Button}
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
