import Theme from 'react-theme'
import forOwn from 'lodash/object/forOwn'
import * as sourceList from './sourceList'

export default class Styles extends Theme {
  constructor(src) {
    super(src || {})

    forOwn(sourceList, (styleSrc, name) => {
      this.setSource(name, styleSrc)
    })
  }
}
