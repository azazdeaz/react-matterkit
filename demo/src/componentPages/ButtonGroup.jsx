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

`<Input
  value={4}
  addonIcon='github'
  addonBackground='transparent'
  validate={v => parseInt(v) !== 4}
  onChange={v=>console.log(v)}/>`,

`(() => {
var App = React.createClass({
  getInitialState() {
    return {unit: 'px'}
  },
  handleAddonClick() {
    var unit = this.state.unit === 'px' ? '%' : 'px'
    this.setState({unit})
  },
  render() {
    return <Input
      value={44}
      addonLabel={this.state.unit}
      addonOnClick={this.handleAddonClick}/>
  }
});

return <App/>
})()`,
];

module.exports = React.createClass({
  render() {

    return <Template
      title='ButtonGroup'
      description={description}
      codes={codes}/>;
  },
});
