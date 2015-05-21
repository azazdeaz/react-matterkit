var React = require('react');
var Playground = require('component-playground');
var marked = require('marked');
var scope = require('../../scope');

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
    // if (props instanceof Array) {
    //
    //   return props.map(prop => {
    //     return <Prop {...prop} key={prop.name}/>;
    //   });
    // }
    // else {
    //   return Object.keys(props).map(groupName => {
    //
    //     return <div>
    //       <h3>{groupName}</h3>
    //       {this.renderProps(props[groupName])}
    //     </div>;
    //   });
    // }
  },
  renderCode() {

    var { codes, Class } = this.props;

    return codes.map((code, idx) => {

      return <div style = {{marginBottom: 12}}>
        <Playground
          codeText = {code}
          scope = {scope}
          docClass = {Class}
          es6Console = {false}
          noRender = {true}/>
      </div>;
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
