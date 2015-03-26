var React = require('react');
var { StyleResolverMixin, BrowserStateMixin } = require('radium');
var style = require('../style');
var TabLabel = require('./TabLabel');
var TabLabel = require('./TabLabel');

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
      currTabIdx: 0,
    };
  },

  _selectTab(idx) {
    this.setState({currTabIdx: idx});

    if (this.props.onChangeSelectedTab) {

      this.props.onChangeSelectedTab(idx);
    }
  },

  componentWillMount(nextProps) {
console.log('componentWillMount,this.props', this.props)
    this.setState({currTabIdx: this.props.defaultTab});
  },

  componentWillReciveProps(nextProps) {
console.log('componentWillReciveProps,nextProps', nextProps)
    this.setState({currTabIdx: nextProps.defaultTab});
  },

  render() {

    var currTab;

    var sTabLabel = {};
    if (this.props.stretchLabels) {
      sTabLabel.flex = 1;
    }

    var childCount = React.Children.count(this.props.children);

    var head = <div
      style={this.buildStyles(style.tabHeader, {
        stretchLabels: this.props.stretchLabels,
      })}>
      {React.Children.map(this.props.children, (child, idx) => {


        return <TabLabel
          style={sTabLabel}
          first={idx === 0}
          last={idx === childCount - 1}
          selected={this.state.currTabIdx === idx}
          label={child.props.label}
          onClick={() => this._selectTab(idx)}/>;
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
        {currTab}
      </div>
    </div>;
  }
});

module.exports = Tabs;
