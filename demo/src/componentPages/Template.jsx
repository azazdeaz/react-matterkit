var React = require('react');
var Matter = require('../../../');
var LiveEditor = require('./react-live-edit/live-editor.jsx');
var marked = require('marked');

module.exports = React.createClass({
  getDefaultProps() {
      return {
        code: 'return <Matter.Button label="button"/>;',
        description: '#Title',
      };
  },
  render() {

    var rawMarkup = marked(this.props.description);

    return <div>
      <span dangerouslySetInnerHTML={{__html: rawMarkup}} />
      <LiveEditor codeText={this.props.code}/>
    </div>;
  },
});
