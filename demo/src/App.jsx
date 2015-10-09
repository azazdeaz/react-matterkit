import React from 'react'
import {getTheme} from 'react-matterkit'

var App = React.createClass({
  contextTypes: {
    router: React.PropTypes.func,
  },
  render: function () {
    var {router} = this.context

    var theme = getTheme(this)
    var config = theme.getStyle('config')
    var font = theme.getStyle('font')

    var styleCont = merge({}, font, {
      width: 920,
      padding: '0 20px',
      margin: '12px auto',
      display: 'flex',
      color: config.fontColor.normal,
    })

    return (
      <div style={styleCont}>
        <div style={{width: 270}}>
          <List style={{width: 210}}>
            {Object.keys(componentPages).map(name => {

              return <ListItem
                key={name}
                label={name}
                onClick={()=>router.transitionTo(name)}
                selected={router.isActive(name)}/>
            })}
          </List>
        </div>
        <div style={{width: 650}}>
          {this.props.children}
        </div>
      </div>
    )
  }
})
