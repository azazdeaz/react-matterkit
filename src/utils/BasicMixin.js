import defaultStyles from '../defaultStyles';

export default {
  getBasics() {

    return {
      id: this.props.id,
      className: this.props.className,
    };
  },

  getStyle(name, mod, style) {

    var styles = this.context.styles || defaultStyles.get();
    return styles.get(name, mod, style);
  }
};
