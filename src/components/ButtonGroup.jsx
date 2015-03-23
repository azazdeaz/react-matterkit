var React = require('react/addons');
var merge = require('lodash.merge');
var has = require('lodash.has');

var ButtonGroup = React.createClass({

  render() {

    var childCount = React.Children.count(this.props.children);
    var children = React.Children.map(this.props.children, (child, idx) => {

      var addStyle = {};

      if (idx !== 0) {

        addStyle.borderTopLeftRadius = 0;
        addStyle.borderBottomLeftRadius = 0;
        addStyle.marginLeft = 0;
        addStyle.borderLeft = 'none';
      }

      if (idx !== childCount-1) {

        addStyle.borderTopRightRadius = 0;
        addStyle.borderBottomRightRadius = 0;
        addStyle.marginRight = 0;
        // addStyle.borderRight = 'none';
      }

      var key = has(child.props, 'key') ? child.props.key : idx;

      return React.addons.cloneWithProps(child, {
          style: merge({}, child.props.style, addStyle),
          key,
        });
    });

    return <div style={{display: 'flex'}}>
      {children}
    </div>;
  }
});

module.exports = ButtonGroup;
