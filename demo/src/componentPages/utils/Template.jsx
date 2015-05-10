var React = require('react');
var {Tabs} = require('../../../../');
var Playground = require('component-playground');
var marked = require('marked');
var Prop = require('./Prop.jsx');
var has = require('lodash/object/has');
var scope = require('../../scope');

var Radium = require('radium');

var Template = React.createClass({
  contextTypes: {
    router: React.PropTypes.func,
  },
  getDefaultProps() {
      return {
        codes: ['<Button label="button"/>;'],
        description: '',
        title: 'Title',
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

    var { codes } = this.props;

    return codes.map(code => {

      var CCC = React.createClass(Radium.wrap({propTypes: {
        codeText: React.PropTypes.string.isRequired,
        scope: React.PropTypes.object.isRequired,
        collapsableCode: React.PropTypes.bool,
        docClass: React.PropTypes.renderable,
        propDescriptionMap: React.PropTypes.string,
        theme: React.PropTypes.string,
        noRender: React.PropTypes.bool,
        es6Console: React.PropTypes.bool
      }, render() {return <div/>;}}));

      return <Playground
        codeText = {code}
        scope = {scope}
        docClass = {CCC}
        noRender = {true}/>;
    });
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

module.exports = Template;
