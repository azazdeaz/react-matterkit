var React = require('react');
var Matter = require('../../../');
var Template = require('./Template.jsx');

var description = `#Button
label: String`;

var code = 'return <Button label="button"/>;';

module.exports = React.createClass({
  render() {

    return <Template
      description={description}
      code={code}/>;
  },
});
