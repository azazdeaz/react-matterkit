var React = require('react');
var { StyleResolverMixin, BrowserStateMixin } = require('radium');
var style = require('../style');
var TabLabel = require('./TabLabel');

var TabHeader = React.createClass({

  mixins: [ StyleResolverMixin, BrowserStateMixin ],

  getDefaultProps() {
    return {
      stretchLabels: true,
    };
  },

  render() {

    var childCount = React.Children.count(this.props.children);

    return <div
      style={this.buildStyles(style.tabHeader)}>

      {React.Children.map(this.props.children, (child, idx) => {

        return <TabLabel
          stretch = {this.props.stretchLabels}
          first = {idx === 0}
          last = {idx === childCount - 1}
          selected = {this.props.currTabIdx === idx}
          label = {child.props.label}
          onSelect = {() => this.props.onSelectTab(idx)}/>;
      })}
    </div>;
  }
});

module.exports = TabHeader;
