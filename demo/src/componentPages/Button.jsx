var React = require('react');
var Template = require('./utils/Template.jsx');
var Matter = require('matterkit');

var description = `
label: String`;

var demos = [
  {code: `<Toggle value={false}/>`, docClass: Matter.Toggle},
  {code: `<Checkbox value={false}/>`, docClass: Matter.Checkbox},
  {code: `<Button label="button"/>`, docClass: Matter.Button},
  {code: `<Button label="button" kind='colored'/>`, docClass: Matter.Button},
];

module.exports = React.createClass({
  render() {

    return <Template
      title='Button'
      Class={Matter.Button}
      description={description}
      demos={demos}
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
