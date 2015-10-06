import React, {PropTypes} from 'react'
import find from 'lodash/collection/find'
import assign from 'lodash/object/assign'
import Radium from 'radium'
import pureRender from 'pure-render-decorator'
import MatterBasics from '../utils/MatterBasics'
import ClickAway from '../utils/ClickAway'

import Icon from './Icon'
import ListItem from './ListItem'
import Label from './Label'

@Radium
@pureRender
@MatterBasics
export default class Dropdown extends React.Component {
  static propTypes = {
    options: PropTypes.arrayOf(PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        value: PropTypes.any,
      })
    ])),
    renderContent: PropTypes.func
  }

  static defaultProps = {
    options: [],
    renderContent: this.renderContent
  }

  constructor(props) {
    super(props)

    this.state = {
      open: false,
    }
  }

  handleClickHead = () => {
    this.setState({open: !this.state.open})
  }

  handleClickAway = () => {
    if (this.state.open) {
      this.setState({open: false})
    }
  }

  renderItems({options, onChange}) {
    return options.map((option, idx) => {

      if (typeof option === 'string') {
        option = {label: option, value: option}
      }

      return <ListItem
        key={idx}
        label={option.label}
        value={option.value}
        onClick={() => {
          if (onChange) {
            onChange(option.value)
          }

          if (option.onClick) {
            option.onClick(option.value)
          }

          this.setState({open: false})
        }}/>
    })
  }

  render() {
    var {mod, style, value, label, options, onChange} = this.props
    var {open} = this.state
    var {lineHeight} = this.getStyle('config')

    if (label === undefined) {
      let currentOption = find(options, 'value', value)
      label = currentOption && currentOption.label
    }

    mod = assign({open}, mod)

    if (open) {
      style = assign({
        height: lineHeight * (this.props.options.length + 1),
      }, style)
    }

    return <ClickAway onClickAway={this.handleClickAway}>
      <div
        {...this.getBasics()}
        style={this.getStyle('dropdown', mod, style)}>

        <div
          style={{paddingLeft: 8, paddingRight: 8, display: 'flex'}}
          onClick={this.handleClickHead}>

          <Label style={{flex: 1}}>
            {label}
          </Label>
          <Icon
            style={{marginLeft: 4}}
            icon={open ? 'chevron-up' : 'chevron-down'}/>
        </div>

        {open && renderContent({options, onChange})}
      </div>
    </ClickAway>
  }
}
