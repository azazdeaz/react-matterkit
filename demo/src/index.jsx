var React = require('react');
var Matter = require('../../');

var Router = require('react-router');

var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;


var routes = {
  Button: require('./routes/Button.jsx'),
};

global.Matter = Matter;
global.React = React;

console.log('routes', routes);

var App = React.createClass({
  render: function () {
    return (
      <div>
        {Object.keys(routes).map((key) => {
          var Comp = routes[key];
          return <Comp key={key}/>;
        })}
      </div>
    );
  }
});

React.render(<App/>, document.body);


//
//
//
// var App = React.createClass({
//   render: function () {
//     return (
//       <div>
//         <RouteHandler/>
//       </div>
//     );
//   }
// });
//
// var routes = (
//   <Route name="app" path="/" handler={App}>
//     <Route name="inbox" handler={Inbox}/>
//     <Route name="calendar" handler={Calendar}/>
//     <DefaultRoute handler={Dashboard}/>
//   </Route>
// );
//
// Router.run(routes, function (Handler) {
//   React.render(<Handler/>, document.body);
// });
