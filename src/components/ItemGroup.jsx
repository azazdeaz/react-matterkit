import React from 'react';
import has from 'lodash/object/has';
import Radium from 'radium';
import pureRender from 'pure-render-decorator';
import MatterBasics from '../utils/MatterBasics';

@Radium.Enhancer
@pureRender
@MatterBasics
export default class ItemGroup extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    var childCount = React.Children.count(this.props.children);
    var children = React.Children.map(this.props.children, (child, idx) => {

      var last = idx !== childCount - 1;
      var style = this.getStyle('itemGroupChild', {last}, child.props.style);
      var key = has(child.props, 'key') ? child.props.key : idx;

      return React.addons.cloneWithProps(child, {style, key});
    });

    return <div style={{display: 'flex'}}>
      {children}
    </div>;
  }
}
