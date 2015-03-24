var React = require('react');
var {Tabs} = require('../../../../');
var LiveEditor = require('./react-live-edit/live-editor.jsx');
var marked = require('marked');
var Prop = require('./Prop.jsx');
var has = require('lodash.has');

module.exports = React.createClass({
  getDefaultProps() {
      return {
        code: 'return <Matter.Button label="button"/>;',
        description: '',
        title: 'Title',
        props: [],
      };
  },
  renderProps(props) {

    if (props instanceof Array) {

      return props.map(prop => {
        return <Prop {...prop} key={prop.name}/>;
      });
    }
    else {
      return Object.keys(props).map(groupName => {

        return <div>
          <h3>{groupName}</h3>
          {this.renderProps(props[groupName])}
        </div>;
      });
    }
  },
  renderCode() {

    var { code } = this.props;

    if (code instanceof Array) {

      return <Tabs>
        {code.map((c, idx) => {

          if (typeof(c) === 'string') {
            c = {code: c};
          }

          if (!has(c, 'label')) {
            c.label = idx;
          }

          return <div label={c.label} key={c.label}>
            <LiveEditor codeText={c.code}/>
          </div>;
        })}
      </Tabs>;
    }
    else {
      return <LiveEditor codeText={code}/>;
    }
  },
  render() {

    var rawMarkup = marked(this.props.description);

    return <div>

      <h1 style={{fontWeight: 400}}>{this.props.title}</h1>

      {this.renderCode()}

      <span dangerouslySetInnerHTML={{__html: rawMarkup}} />

      {this.renderProps(this.props.props)}

      {this.props.children}
    </div>;
  },
});
