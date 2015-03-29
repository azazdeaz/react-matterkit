var React = require('react');
var { StyleResolverMixin, BrowserStateMixin } = require('radium');
var style = require('../style');
var TabHeader = require('./TabHeader');

var Tabs = React.createClass({

  mixins: [ StyleResolverMixin, BrowserStateMixin ],

  getDefaultProps() {
    return {
      stretchLabels: true,
      defaultTab: 0,
    };
  },

  getInitialState() {
    return {
      currTabIdx: 123,
    };
  },

  _selectTab(idx) {
    this.setState({currTabIdx: idx});

    if (this.props.onChangeSelectedTab) {

      this.props.onChangeSelectedTab(idx);
    }
  },

  componentWillMount() {
    this.setState({currTabIdx: this.props.defaultTab});
  },

  componentWillReciveProps(nextProps) {
    this.setState({currTabIdx: nextProps.defaultTab});
  },

  render() {

    var currTab;


    React.Children.forEach(this.props.children, (child, idx) => {

      if(this.state.currTabIdx === idx) {

        currTab = child;
      }
    });

    return <div style={this.buildStyles(style.tabBase)}>
      <TabHeader
        currTabIdx = {this.state.currTabIdx}
        onSelectTab = {idx => this._selectTab(idx)}
        children = {this.props.children}
        stretchLabels = {this.props.stretchLabels}/>
      <div style={style.tabCont}>
        {currTab}
      </div>
    </div>;
  }
});

module.exports = Tabs;
