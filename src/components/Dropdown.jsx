var React = require('react');
var Input = require('./Input');
var Icon = require('./Icon');
var ListItem = require('./ListItem');
var style = require('./style');
var _ = require('lodash');
var { StyleResolverMixin, BrowserStateMixin } = require('radium');

var Dropdown = React.createClass({

  mixins: [ StyleResolverMixin, BrowserStateMixin ],

  getInitialState() {
    return {
      open: false,
    };
  },
  onFocus() {
    this.setState({open: true});
    // setTimeout(() => {//!hack
      this.refs.head.getDOMNode().addEventListener('mousedown', this.onCloseClick);
    // });
  },
  onBlur() {
    this.setState({open: false});
    this.refs.head.getDOMNode().removeEventListener('mousedown', this.onCloseClick);
  },
  onCloseClick(e) {
    this.getDOMNode().blur();
  },
  render() {

    var s = this.buildStyles(style.dropdown);
    if (this.state.open) {
      s.height = style.itemHeight * (this.props.options.length + 1);
    }

    return <div
      {...this.getBrowserStateEvents()}
      style={s}
      ref="head"
      tabIndex = "0"
      onBlur = {this.onBlur}
      onFocus = {this.onFocus}
    >
      <div style={{padding: '0 8px', display: 'flex'}}>
        <span style={{flex: 1}}>
          {this.props.value}
        </span>
        <Icon
          style={{marginLeft: 4}}
          lineHeight={style.itemHeightPX}
          icon={this.state.open ? 'chevron-up' : 'chevron-down'}/>
      </div>

      {this.props.options.map(value => {
        return <ListItem
          key={value}
          label={value}
          onClick={()=>{
            this.props.onChange(value);
            this.getDOMNode().blur();
            }}/>;
      })}
    </div>;
  }
});

module.exports = Dropdown;
