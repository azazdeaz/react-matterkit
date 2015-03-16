var React = require('react');
var ListItem = require('./ListItem.jsx');
var style = require('./style');

var List = React.createClass({

  onClickItem(item) {
    if (this.props.onSelect) {
      this.props.onSelect(item);
    }
  },
  render() {
    return <div style={style.list}>
        {this.props.items.map(item => <ListItem
          {...item}
          onClick={() => this.onClickItem(item)}/>)}
      </div>;
  }
});

module.exports = List;
