module.exports = global.Matter = {
  style: require('./components/style'),

  utils: {
    CustomDrag: require('./utils/CustomDrag'),
  },

  Base: require('./components/Base'),
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
  NumberInput: require('./components/NumberInput'),
  Slider: require('./components/Slider'),
  StringInput: require('./components/StringInput'),
  Tabs: require('./components/tabs/Tabs'),
  Toolbar: require('./components/Toolbar'),
  ToolbarGroup: require('./components/ToolbarGroup'),
  Tooltip: require('./components/Tooltip'),
  Accordion: require('./components/accordion/Accordion'),
  AccordionTab: require('./components/accordion/AccordionTab'),
};
