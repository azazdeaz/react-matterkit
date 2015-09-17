import React from 'react'
import getTheme from '../theme/getTheme'
import forOwn from 'lodash/object/forOwn'
import pick from 'lodash/object/pick'

export default function (Component) {
  Component.contextTypes = {
    matterkitTheme: React.PropTypes.object,
  }

  Component.prototype.getBasics = function () {
    return pick(
      this.props,
      'id',
      'className',
      'onClick',
      'onMouseEnter',
      'onMouseLeave',
      'onMouseOver',
      'onMouseOut',
      'onMouseDown',
      'onMouseUp',
    )
  }

  Component.prototype.getStyle = function (name, mod, style) {
    var styles = getTheme(this)
    var ret = styles.getStyle(name, mod, style)

    forOwn(ret, (value, key) => {
      var pre = key[0]
      if (pre !== ':' && pre !== '@' && typeof value === 'object') {
        delete ret[key]
      }
    })

    return ret
  }
}
