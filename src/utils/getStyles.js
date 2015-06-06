import defaultStyles from '../defaultStyles';

export default function getStyles(component) {

  // return (component && component.context.matterStyles) || defaultStyles.get();
  //use this.until React@0.14.0
  return global.__MATTER_STYLE__ || defaultStyles.get();
}
