var React = require('react');
var Template = require('./utils/Template.jsx');
var Matter = require('matterkit');

var description = `
label: String`;

var demos = [
  {code: `<Label label="i'm da label!"/>`, docClass: Matter.Label},
  {code: `<Input value={32} addonLabel='px' min={0} type='number'/>`, docClass: Matter.Input},
  {code: `<Toggle value={false}/>`, docClass: Matter.Toggle},
  {code: `<Icon icon='github'/>`, docClass: Matter.Icon},
  {code: `<Checkbox value={false}/>`, docClass: Matter.Checkbox},
  {code: `<Button label="button"/>`, docClass: Matter.Button},
  {code: `<Button label="button" mod={{kind: 'colored'}}/>`, docClass: Matter.Button},
  {code: `<Panel/>`, docClass: Matter.Panel},
  {code: `<Dropdown options={['foo', 'bar', 'qux']} label='Dropdown'/>`, docClass: Matter.Panel},
  {code: `<ItemGroup>
  <Button
    icon='github'
    disabled={true}/>
  <Input placeholder='type here'/>
  <Button label='second'/>
</ItemGroup>`, docClass: Matter.InputGroup},
  {code: `<MultiTypeInput types={[
  {
    type: 'number',
    addonLabel: 'px',
    precision: 0,
  },
  {
    type: 'number',
    addonLabel: '%',
    prepareExportValue: value => value + '%',
    dragSpeed: 0.25,
    precision: 2,
  },
  {
    type: 'string',
    addonIcon: 'quote-right',
    hints: ['auto', 'inherits'],
  },
]}
value='32'
chooseType = {value => {
  if (_.isFinite(value) || _.endsWith(value, 'px')) return 0;
  else if (_.endsWith(value, '%')) return 1;
  else return 2;
}}
onChange = {value => console.log(value, typeof(value))}/>`, docClass: Matter.ItemGroup},
  {code: `<Tabs>
  <div label='first tab'><p>first tab content</p></div>
  <div label='secound tab' icon='github'><p>secound tab content</p></div>
  <div icon='cog'><h1>third tab content</h1></div>
</Tabs>`, docClass: Matter.Tabs},
];

module.exports = React.createClass({
  render() {

    return <Template
      title='Tests'
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
