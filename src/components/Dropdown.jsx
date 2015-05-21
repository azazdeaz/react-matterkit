import React from 'react';
import Input from './Input';
import Icon from './Icon';
import ListItem from './ListItem';
import has from 'lodash/object/has';

import Radium from 'radium';
import pureRender from 'pure-render-decorator';
import MatterBasics from '../utils/MatterBasics';

@Radium.Enhancer
@pureRender
@MatterBasics
export default class Dropdown extends React.Component {

  static propTypes = {

  }

  static defaultProps = {

  }

  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };
  }

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

      {this.props.options.map(option => {

        if (typeof(option) === 'string') {
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

            this.getDOMNode().blur();
          }}/>;
      })}
    </div>;
  }
}
