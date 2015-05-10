var React = require('react/addons');
var Radium = require('radium');
var ListItem = require('./ListItem');
var style = require('./style');
var has = require('lodash/object/has');
var BasicMixin = require('../utils/BasicMixin');

var List = React.createClass(Radium.wrap({

  mixins: [ BasicMixin],

  render() {

    var {mod, style, items} = this.props;
    var children;

    if (items) {

      children = items.map((item, idx) => {

        if (typeof(item) === 'string') {
            item = {label: item};
        }

        return <ListItem
          {...item}
          key={has(item, 'key') ? item.key : idx}/>;
      });
    }
    else {
      children = React.Children.map(this.props.children, (child, idx) => {

        if (has(child.props, 'key')) {
          return child;
        }
        else {
          return React.addons.cloneWithProps(child, {key: idx});
        }
      });
    }

    return <div
      {...this.getBasics()}
      style={this.getStyle('list', mod, style)}>

      {children}
    </div>;
  }
}));

module.exports = List;
