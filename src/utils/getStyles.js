import defaultStyles from '../defaultStyles';

export default function getStyles(component) {

  return component.context.matterStyles || defaultStyles.get();
}
