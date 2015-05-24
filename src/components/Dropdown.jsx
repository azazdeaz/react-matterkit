import React from 'react';
import has from 'lodash/object/has';
import assign from 'lodash/object/assign';
import Radium from 'radium';
import pureRender from 'pure-render-decorator';
import MatterBasics from '../utils/MatterBasics';

import Icon from './Icon';
import ListItem from './ListItem';

@Radium.Enhancer
@pureRender
@MatterBasics
export default class Dropdown extends React.Component {

  static propTypes = {

  }

  static defaultProps = {
    options: [],
  }

  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };
  }

  handleFocus = () => {
    this.setState({open: true});
    // setTimeout(() => {//!hack
      var node = React.findDOMNode(this.refs.head);
      node.addEventListener('mousedown', this.handleCloseClick);
    // });
  }

  handleBlur = () => {
    this.setState({open: false});
    var node = React.findDOMNode(this.refs.head);
    node.removeEventListener('mousedown', this.handleCloseClick);
  }

  handleCloseClick = () => {
    React.findDOMNode(this).blur();
  }

  renderItems() {

    if (this.state.open) {

      return this.props.options.map(option => {

        if (typeof option === 'string') {
          option = {label: option};
        }

        var value = has(option, 'value') ? option.value : option.label;

        return <ListItem
          key={option.label}
          label={option.label}
          onClick={()=>{

            if (this.props.onChange) {
              this.props.onChange(value);
            }

            if (option.onClick) {
              option.onClick(value);
            }

            React.findDOMNode(this).blur();
          }}/>;
      });
    }
  }

  render() {
    var {mod, style, value, label} = this.props;
    var {open} = this.state;
    var {itemHeight} = this.getStyle('config');

    if (label === undefined) label = value;

    mod = assign({open}, mod);

    if (open) {
      style = assign({
        height: itemHeight * (this.props.options.length + 1),
      }, style);
    }

    return <div
      {...this.getBasics()}
      style={this.getStyle('dropdown', mod, style)}
      ref="head"
      tabIndex = "0"
      onBlur = {this.handleBlur}
      onFocus = {this.handleFocus}>

      <div style={{padding: '0 8px', display: 'flex'}}>
        <span style={{flex: 1}}>
          {label}
        </span>
        <Icon
          style={{marginLeft: 4}}
          icon={open ? 'chevron-up' : 'chevron-down'}/>
      </div>

      {this.renderItems()}
    </div>;
  }
}
