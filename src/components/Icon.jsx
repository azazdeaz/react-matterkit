import React from 'react';
import Radium from 'radium';
import pureRender from 'pure-render-decorator';
import MatterBasics from '../utils/MatterBasics';

@Radium.Enhancer
@pureRender
@MatterBasics
export default class Icon extends React.Component {

  static propTypes = {
  }

  static defaultProps = {

  }

  constructor(props) {
    super(props);
  }

  render: function () {
    return <i className = {`fa fa-${this.props.icon}`}
      style = {_.assign({
        lineHeight: this.props.lineHeight || style.itemHeightPX,
        width: '12px',
        textAlign: 'center'
      }, this.props.style)}
      onClick = {this.props.onClick}
    ></i>;
  },
});

module.exports = Icon;
