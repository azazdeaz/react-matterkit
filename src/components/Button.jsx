var React = require('react/addons');
var {PureRenderMixin} = React;
var Radium = require('radium');
var assign = require('lodash/object/assign');
var Icon = require('./Icon');
var MatterBasics = require('../utils/MatterBasics');

@Radium.Enhancer
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

  constructor(props) {

    super(props);
  }

  componentWillUnmount() {
    console.log('btn componentWillUnmount')
  }

  render() {

    var {mod, style, icon, onClick, label, disabled} = this.props;

    mod = assign({disabled}, mod);

    if (icon) {
      icon = <Icon icon={this.props.icon}
        style={{marginRight:this.props.text ? 4 : 0}}/>;
    }

    return <div
      {...this.getBasics()}
      style={this.getStyle('button', mod, style)}
      onClick={onClick}>

      {icon}
      {label}
    </div>;
  }
};
