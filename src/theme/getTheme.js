import defaultTheme from './defaultTheme'

export default function getTheme(component) {
  return (component && component.context.matterkitTheme) || defaultTheme.get()
}
