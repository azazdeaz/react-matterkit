module.exports = global.Matter = {
  style: require('./components/style'),

  utils: {
    CustomDrag: require('./utils/CustomDrag'),
  },

  Accordion: require('./components/accordion/Accordion'),
  AccordionTab: require('./components/accordion/AccordionTab'),
  // Base: require('./components/Base'),
  Button: require('./components/Button'),
  ButtonGroup: require('./components/ButtonGroup'),
  Checkbox: require('./components/Checkbox'),
  Dropdown: require('./components/Dropdown'),
  DropdownMenu: require('./components/DropdownMenu'),
  Icon: require('./components/Icon'),
  Input: require('./components/Input'),
  Label: require('./components/Label'),
  List: require('./components/List'),
  ListItem: require('./components/ListItem'),
  MultiTypeInput: require('./components/MultiTypeInput'),
  Panel: require('./components/Panel'),
  Slider: require('./components/Slider'),
  Tabs: require('./components/tabs/Tabs'),
  Toggle: require('./components/Toggle'),
  Toolbar: require('./components/Toolbar'),
  ToolbarGroup: require('./components/ToolbarGroup'),
  Tooltip: require('./components/Tooltip'),
};
