import Styles from './styles/Styles'

var defaultStyles = new Styles()

export default {
  set: nextStyles => defaultStyles = nextStyles,
  get: () => defaultStyles,
}
