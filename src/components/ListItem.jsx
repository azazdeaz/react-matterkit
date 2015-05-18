import React from 'react';
import Radium from 'radium';
import assign from 'lodash/object/assign';
import has from 'lodash/object/has';
import assign from 'lodash/object/assign';
import Radium from 'radium';
import pureRender from 'pure-render-decorator';
import MatterBasics from '../utils/MatterBasics';

@Radium.Enhancer
@pureRender
@MatterBasics
var ListItem = React.createClass(Radium.wrap({

  getDefaultProps() {
    return {selected: false};
  },

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
}));

module.exports = ListItem;
