import React from 'react';;
import Icon from '../Icon';
import Label from '../Label';
import Toolbar from '../Toolbar';
import ToolbarGroup from '../ToolbarGroup';
import Radium from 'radium';
import pureRender from 'pure-render-decorator';
import MatterBasics from '../../utils/MatterBasics';;

@Radium.Enhancer
@pureRender
@MatterBasics
export default class AccordionTab extends React.Component {

  constructor(props) {
    super(props);

    this.state = {opened: true};
  }

  onClick() {
    this.setState({opened: !this.state.opened});
  },
  render: function () {

    // var sBase = {};
    // if (this.state.opened) sBase.backgroundColor = style.grey.active;
    // else if (this.state.hover) sBase.backgroundColor = style.grey.hover;
    // else sBase.backgroundColor = style.grey.normal;

    var sHead = {height: style.lineHeight};

    var content = this.state.opened ? <div>{this.props.children}</div> : '';

    return <div
      {...this.getBrowserStateEvents()}
      style={this.buildStyles(style.accordionTab, {opened: this.state.opened})}
      onMouseEnter={() => this.setState({hover: true})}
      onMouseLeave={() => this.setState({hover: false})}
      onMouseDown={() => this.setState({down: true})}
      onMouseUp={() => this.setState({down: false})}>

      <Toolbar onClick={this.onClick}>
        <ToolbarGroup flex='1'>
          <Label>{this.props.label}</Label>
        </ToolbarGroup>
          <Icon
            icon={this.state.opened ?  'chevron-down' : 'chevron-up'}
            style={{color: style.palette.grey4, width: 21}}/>
      </Toolbar>
      {content}
    </div>;
  },
});

module.exports = AccordionTab;
