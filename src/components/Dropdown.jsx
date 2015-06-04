import React from 'react';
import has from 'lodash/object/has';
import assign from 'lodash/object/assign';
import Radium from 'radium';
import pureRender from 'pure-render-decorator';
import MatterBasics from '../utils/MatterBasics';
import ClickAway from '../utils/ClickAway';

import Icon from './Icon';
import ListItem from './ListItem';

@Radium.Enhancer
@pureRender
@ClickAway
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

  handleClickHead = () => {
    this.setState({open: !this.state.open});
  }

  handleClickAway = () => {
    this.setState({open: false});
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
          onClick={() => {

            if (this.props.onChange) {
              this.props.onChange(value);
            }

            if (option.onClick) {
              option.onClick(value);
            }

            this.setState({open: false});
          }}/>;
      });
    }
  }

  render() {
    var {mod, style, value, label} = this.props;
    var {open} = this.state;
    var {lineHeight} = this.getStyle('config');

    if (label === undefined) label = value;

    mod = assign({open}, mod);

    if (open) {
      style = assign({
        height: lineHeight * (this.props.options.length + 1),
      }, style);
    }

    return <div
      {...this.getBasics()}
      style={this.getStyle('dropdown', mod, style)}>

      <div
        style={{padding: '0 8px', display: 'flex'}}
        onClick={this.handleClickHead}>

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
