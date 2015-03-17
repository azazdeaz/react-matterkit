var style = require('./style');
var assign = require('lodash');
var React = require('react');
var List = require('./List');
var _ = require('lodash');


var DropdownMenu = React.createClass({

  getInitialState() {
    return {show: false, style: {}};
  },
  show() {

    var domNode = this.getDOMNode(),
      parent = domNode.parentNode,
      br = parent.getBoundingClientRect();

    this.setState({
      show: !this.state.show,
      style: {
        left: br.left,
        top: br.top + br.height,
      }
    });
  },
  hide() {
    clearTimeout(this._showSetT);
    this.setState({show: false});
  },
  onSelect(e) {
    if (this.props.onSelect) this.props.onSelect(e);
    this.hide();
  },
  componentDidMount() {

    var parent = this.getDOMNode().parentNode;
    parent.addEventListener('click', this.show);
  },
  render () {

    if (!this.state.show) return <div style={{display:'none'}}/>;

    var style = _.defaults({position: 'fixed'}, this.state.style);

    return <div style={style}>
        <List {...this.props} onSelect={this.onSelect}/>
      </div>;
  }
});

module.exports = DropdownMenu;
