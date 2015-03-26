var React = require('react');
var { StyleResolverMixin, BrowserStateMixin } = require('radium');
var style = require('../style');
var TabLabel = require('./TabLabel');

var Button = React.createClass({

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
          stretch={this.props.stretchLabels}
          first={idx === 0}
          last={idx === childCount - 1}
          selected={this.state.currTabIdx === idx}
          label={child.props.label}
          onClick={() => this._selectTab(idx)}/>;
      })}
    </div>;
  }
});

module.exports = Button;
