import React from 'react';
import assign from 'lodash/object/assign';
import Radium from 'radium';
import pureRender from 'pure-render-decorator';
import MatterBasics from '../utils/MatterBasics';

@Radium.Enhancer
@pureRender
@MatterBasics
export default class ListItem extends React.Component {

  constructor(props) {
    super(props);

    this.state = {selected: false};
  }

  render() {

    var {mod, style, selected, label, children, value} = this.props;

    mod = assign({selected}, mod);
    value = value || label;
    label = label || children || value;

    return <div
      {...this.getBasics()}
      style={this.getStyle('listItem', mod, style)}
      onClick={() => {
        if (this.props.onClick) {
          this.props.onClick(value);
        }
      }}>
      {label}
    </div>;
  }
}
