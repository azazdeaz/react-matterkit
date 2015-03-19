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

    var head = <div style={{width: '100%', height: style.lineHeight}}>
      {Ract.Children.map(props.children, child, idx => {
        return <Button
          label={child.props.label}
          onClick={() => this.setState({currTabIdx: idx})}/>;
      })}
    </div>;

    React.children.forEach(this.props.children, child, idx => {
      if(idx === this.props.currTabIdx) currTab = child;
    });

    var icon;
    if (this.props.icon) {
      icon = <Icon icon={this.props.icon}
        style={{marginRight:this.props.text ? 4 : 0}}/>;
    }

    return <div>
      {head}
      {currTab}
    </div>;
  }
});

module.exports = Tabs;
