import assign from 'lodash/object/assign';
import React from 'react';
import List from './List';
import Radium from 'radium';
import pureRender from 'pure-render-decorator';
import MatterBasics from '../utils/MatterBasics';

@Radium.Enhancer
@pureRender
@MatterBasics
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
