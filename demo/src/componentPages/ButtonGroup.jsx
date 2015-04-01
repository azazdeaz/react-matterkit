var React = require('react');
var Template = require('./utils/Template.jsx');

var description = `
label: String`;

var codes = [
`<ButtonGroup>
  <Button label='first'/>
  <Button label='second'/>
  <Button label='third' kind='colored'/>
  <Button label='fourth'/>
</ButtonGroup>`,

`<ButtonGroup>
  <Button
  	icon='github'
    disabled={true}/>
  <Input placeholder='type here'/>
  <Button label='second'/>
</ButtonGroup>`,

`<Input>
  <Button label='second'/>
</Input>`
];

module.exports = React.createClass({
  render() {

    return <Template
      title='ButtonGroup'
      description={description}
      codes={codes}/>;
  },
});
