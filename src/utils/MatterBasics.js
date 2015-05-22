import defaultStyles from '../defaultStyles';
import forOwn from 'lodash/object/forOwn';

export default function (Component) {

  Component.prototype.getBasics = function () {
    return {
      id: this.props.id,
      className: this.props.className,
    };
  };

  Component.prototype.getStyle = function (name, mod, style) {
    var styles = this.context.styles || defaultStyles.get();
    var ret = styles.get(name, mod, style);

    forOwn(ret, (value, key) => {
      if (typeof value === 'object') delete ret[key];
    });

    return ret;
  };
}
