var React = require('react');
var {Tabs} = require('../../../../');
var LiveEditor = require('./react-live-edit/live-editor.jsx');
var marked = require('marked');
var Prop = require('./Prop.jsx');
var has = require('lodash.has');

module.exports = React.createClass({
  contextTypes: {
    router: React.PropTypes.func,
  },
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
  componentWillReceiveProps(props) {
    console.log('componentWillReceiveProps', props);
  },
  renderCode() {

    var { codes } = this.props;

    if (true) {
      return codes.map((code, idx) => {
        return <LiveEditor codeText={code} key={idx}/>;
      });
    }
    else {
      let { router } = this.context;

      return <Tabs
        stretchLabels={false}
      defaultTab={parseInt(router.getCurrentParams().ex || 0)}
        onChangeSelectedTab={idx => {
          console.log('getCurrentRoutes', router.getCurrentRoutes());
          console.log('getCurrentParams', router.getCurrentParams());
            // console.log('getRoutes', router.getRoutes());
            // console.log('getParams', router.getParams());
          var routes = router.getCurrentRoutes();
          var name = routes[routes.length-1].name;
          console.log(name, {ex: idx});
          router.transitionTo(name, {ex: idx});
        }}>
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
