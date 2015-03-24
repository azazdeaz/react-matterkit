var React = require('react');
var Matter = require('../../../');
var Template = require('./Template.jsx');

var description = `#ButtonGroup
label: String`;

var code = `return <ButtonGroup>
  <Button label='first'/>
  <Button label='secound'/>
  <Button label='third' kind='colored'/>
  <Button label='fourth'/>
</ButtonGroup>;`;

module.exports = React.createClass({
  render() {

    return <Template
      description={description}
      code={code}/>;
  },
});
