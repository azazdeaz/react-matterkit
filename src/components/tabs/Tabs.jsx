var React = require('react');
var { StyleResolverMixin, BrowserStateMixin } = require('radium');
var style = require('../style');
var TabEar = require('./TabEar');

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

    return <div style={style.tabBase}>
      {head}
      <div style={style.tabCont}>
        <div style={style.tabContNest}>
          {currTab}
        </div>
      </div>
    </div>;
  }
});

module.exports = Tabs;
