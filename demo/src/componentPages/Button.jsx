var React = require('react')
var Template = require('./utils/Template.jsx')
var Matter = require('react-matterkit')

var description = `
label: String`

var demos = [
  {code: `<Label label="i'm da label!"/>`, docClass: Matter.Label},
  {code: `<Input value={32} addonLabel='px' min={0} type='number'/>`, docClass: Matter.Input},
  {code: `<Toggle value={false}/>`, docClass: Matter.Toggle},
  {code: `<Icon icon='github'/>`, docClass: Matter.Icon},
  {code: `<Checkbox value={false}/>`, docClass: Matter.Checkbox},
  {code: `<Button label="button"/>`, docClass: Matter.Button},
  {code: `<Button label="button" mod={{kind: 'colored'}}/>`, docClass: Matter.Button},
  {code: `<Button label="button" icon="github"/>`, docClass: Matter.Button},
  {code: `<Button icon="github"/>`, docClass: Matter.Button},
  {code: `<Panel/>`, docClass: Matter.Panel},
  {code: `<Dropdown options={['foo', 'bar', 'Loooooooooooooooooooooooooooooooong label', 'qux']} label='Dropdown loooooooooooooooooooooooooooooooong' style={{width: 200}}/>`, docClass: Matter.Dropdown},
  {code: `<ItemGroup>
  <Button
    icon='github'
    disabled={true}/>
  <Input placeholder='type here'/>
  <Button label='second'/>
</ItemGroup>`, docClass: Matter.InputGroup},
  {code: `<RefreshValuePropOfInput>
  <MultiTypeInput types={[
    {
      type: 'number',
      addonLabel: 'px',
      prepareExportValue: value => value + 'px',
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
      hints: ['auto', 'inherit'],
    },
  ]}
  value='32'
  chooseType = {value => {
    if (_.isFinite(value) || _.endsWith(value, 'px')) return 0
    else if (_.endsWith(value, '%')) return 1
    else return 2
  }}
  onChange = {value => console.log(value, typeof(value))}/>
</RefreshValuePropOfInput>`, docClass: Matter.ItemGroup},
  {code: `<Tabs>
  <div label='first tab'><p>first tab content</p></div>
  <div label='secound tab' icon='github'><p>secound tab content</p></div>
  <div icon='cog'><h1>third tab content</h1></div>
</Tabs>`, docClass: Matter.Tabs},
  {code: `<Scrollable style={{width: 200, height: 300}}>
  <List items={fakeNames.map(label => ({label}))}/>
</Scrollable>`, docClass: Matter.Scrollable}
]

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
      ]}/>
  },
})
