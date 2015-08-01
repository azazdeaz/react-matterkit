import createTheme from './createTheme'

var defaultTheme = createTheme()

export default {
  set: nextTheme => defaultTheme = nextTheme,
  get: () => defaultTheme,
}
