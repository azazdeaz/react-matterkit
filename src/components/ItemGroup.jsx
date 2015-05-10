var React = require('react/addons');
var BasicMixin = require('../utils/BasicMixin');
var merge = require('lodash/object/merge');
var has = require('lodash/object/has');

var ItemGroup = React.createClass({

  mixins: [BasicMixin],

  render() {

    var childCount = React.Children.count(this.props.children);
    var children = React.Children.map(this.props.children, (child, idx) => {

      var last = idx !== childCount - 1;
      var style = this.getStyle('itemGroupChild', {last}, child.props.style);
      var key = has(child.props, 'key') ? child.props.key : idx;

      return React.addons.cloneWithProps(child, {style, key});
    });

    return <div style={{display: 'flex'}}>
      {children}
    </div>;
  }
});

module.exports = ItemGroup;
