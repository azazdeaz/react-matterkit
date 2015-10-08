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
import Scrollable from './scrollable/Scrollable'

function renderItems({options, onChange, collapse}) {
  return <Scrollable>
    <div>
      {options.map((option, idx) => {

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

            collapse()
          }}/>
      })}
    </div>
  </Scrollable>
}

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
    renderContent: renderItems
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

  render() {
    const {value, options, onChange, renderContent} = this.props
    let {label, mod, style} = this.props
    const {open} = this.state
    const {lineHeight} = this.getStyle('config')
    const collapse = () => this.setState({open: false})

    if (label === undefined) {
      let currentOption = find(options, {value})
      label = currentOption && currentOption.label
    }

    mod = {...mod, open}

    if (open) {
      style = assign({
        height: lineHeight * (this.props.options.length + 1),
      }, style)
    }

    return <ClickAway onClickAway={this.handleClickAway}>
      <div
        {...this.getBasics()}
        style={this.getStyle('dropdown', mod, {maxHeight: 246, ...style})}>

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

        {open && renderContent({options, onChange, collapse})}
      </div>
    </ClickAway>
  }
}
