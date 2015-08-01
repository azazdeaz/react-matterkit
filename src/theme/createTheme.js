import Theme from 'react-theme'
import forOwn from 'lodash/object/forOwn'
import * as sourceList from './sourceList'

export default function createTheme() {
  const theme = new Theme()

  forOwn(sourceList, (styleSrc, name) => {
    theme.setSource(name, styleSrc)
  })

  return theme
}
