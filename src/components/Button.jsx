import React from 'react';
import assign from 'lodash/object/assign';
import Icon from './Icon';
import Radium from 'radium';
import pureRender from 'pure-render-decorator';
import MatterBasics from '../utils/MatterBasics';

@Radium.Enhancer
@pureRender
@MatterBasics
export default class Button extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      toggled: false,
    };
  }

  static propTypes = {
    label: React.PropTypes.string,
    disabled: React.PropTypes.bool,
  }

  static defaultProps = {
    label: '',
    disabled: false,
    mod: {
      kind: 'normal',
    }
  }

  render() {

    var {mod, style, icon, onClick, label, disabled} = this.props;

    mod = assign({disabled}, mod);

    if (typeof icon === 'string') {
      icon = {icon};
    }

    if (icon) {
      icon = <Icon {...icon} style={{marginRight: this.props.text ? 4 : 0}}/>;
    }

    return <div
      {...this.getBasics()}
      style={this.getStyle('button', mod, style)}
      onClick={onClick}>

      {icon}
      {label}
    </div>;
  }
}
