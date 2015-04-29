var React = require('react');
var { StyleResolverMixin, BrowserStateMixin } = require('radium');
var style = require('../style');
var TabHeader = require('./TabHeader');

var Tabs = React.createClass({

  mixins: [ StyleResolverMixin, BrowserStateMixin ],

  getDefaultProps() {
    return {
      stretchLabels: true,
      defaultTabIdx: 0,
    };
  },

  getInitialState() {
    return {
      currTabIdx: this.props.defaultTabIdx,
    };
  },

  _selectTab(idx) {
    this.setState({currTabIdx: idx});

    if (this.props.onChangeTabIdx) {

      this.props.onChangeTabIdx(idx);
    }
  },

  componentWillReciveProps(nextProps) {
    this.setState({currTabIdx: nextProps.defaultTabIdx});
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
