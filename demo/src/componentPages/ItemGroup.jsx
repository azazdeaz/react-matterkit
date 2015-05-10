var React = require('react');
var Template = require('./utils/Template.jsx');

var description = `
label: String`;

var codes = [
`<ItemGroup>
  <Button label='first'/>
  <Button label='second'/>
  <Button label='third' kind='colored'/>
  <Button label='fourth'/>
</ItemGroup>`,

`<ItemGroup>
  <Button
  	icon='github'
    disabled={true}/>
  <Input placeholder='type here'/>
  <Button label='second'/>
</ItemGroup>`,
];

module.exports = React.createClass({
  render() {

    return <Template
      title='ItemGroup'
      description={description}
      codes={codes}/>;
  },
});
