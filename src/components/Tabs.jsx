var React = require('react');
var { StyleResolverMixin, BrowserStateMixin } = require('radium');
var _ = require('lodash');
var style = require('./style');
var Button = require('./Button');

var Tabs = React.createClass({

  mixins: [ StyleResolverMixin, BrowserStateMixin ],

  getInitialState() {
    return {
      currTabIdx: 0,
    };
  },

  render() {

    var currTab;

    var head = <div style={style.tabHeader}>
      {React.Children.map(this.props.children, (child, idx) => {
        return <TabEar
          selected={this.state.currTabIdx === idx}
          label={child.props.label}
          onClick={() => this.setState({currTabIdx: idx})}/>;
      })}
    </div>;

    React.Children.forEach(this.props.children, (child, idx) => {

      if(this.state.currTabIdx === idx) {

        currTab = child;
      }
    });

    return <div style={style.panel}>
      {head}
      {currTab}
    </div>;
  }
});

var TabEar = React.createClass({
  getDefaultProps() {
    return {
      selected: false,
    };
  },

  willReciveProps(nextProps) {

  },

  render() {
    return <Button {...this.props} style={style.tabEar}/>;
  }
});

module.exports = Tabs;
