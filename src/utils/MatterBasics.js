import defaultStyles from '../defaultStyles';

export default function (Component) {

  Component.prototype.getBasics = function () {
    return {
      id: this.props.id,
      className: this.props.className,
    };
  };

  Component.prototype.getStyle = function (name, mod, style) {
    var styles = this.context.styles || defaultStyles.get();
    return styles.get(name, mod, style);
  };
};
