
require('./index.html') //for the webpack build

var React = require('react')
var Matter = require('react-matterkit')
var {List, ListItem, getTheme} = Matter
var merge = require('lodash/object/merge')
var kebabCase = require('lodash/string/kebabCase')
var RefreshValuePropOfInput = require('./RefreshValuePropOfInput')

var Router = require('react-router')

var DefaultRoute = Router.DefaultRoute
var Link = Router.Link
var Route = Router.Route
var RouteHandler = Router.RouteHandler
var Redirect = Router.Redirect

global.fakeNames = `Yadira Smith,Meggie Wolf PhD,Hermina Trantow,Mrs. Gladys Heathcote,Mekhi Mann,Maida Veum,Makenzie Abshire,Loyal Raynor,Brisa Okuneva,Mariela McKenzie,Elise Auer,Eleonore Sipes,Libbie Labadie,Darrel Toy,Rylee McLaughlin,Kara Schiller,Sophie Rogahn,Alivia Huels,Brennon VonRueden,Efren Ankunding,Queenie Waters,Myrtis Kris II,Vaughn Nolan,Terrence Emard,Ahmed Vandervort,Cassandre Schmitt DDS,Walter Goodwin Jr.,Mattie Carroll,Mr. Cortney Gulgowski,Waino Schumm,Mr. Mark Gleason,Hailee Parker,Mathias Gottlieb Sr.,Santino Greenholt I,Ms. Archibald Tromp,Matilda Padberg,Domingo Marks,Lonny Ernser,Nicolette Douglas,Gavin Prosacco,Irving Abshire,Meaghan O'Kon,Israel Prohaska,Ms. Carmella Lemke,Marta Moore IV,Kim Daniel,Rafael Dare,Ettie Runolfsson,Nils Mayert,Dawson Lind,Deron Larkin,Barrett Walter,Reece Ziemann,Vella Waelchi,Dewitt Thompson,D'angelo Davis,Edgar Kassulke,Daisy Senger,Michele Homenick IV,Amelie Halvorson DDS,Pattie Davis,Marisa Dooley,Arlene Bergstrom,Adah Konopelski,Eleonore Beahan,Maya Schultz,Osbaldo Jaskolski,Elenora Greenholt,Ambrose Runolfsdottir,Sammy Fritsch,Bettye Bogan,Lilly Block,Lila Roberts,Marion Ferry,Leon Mills,Ladarius Hand,Estell Bernhard I,Dr. Shany Kirlin,Janet Reynolds,Lyric Hilll,Maude Fritsch,Fredrick McLaughlin,Natalie Dooley,Adrien Champlin,Kenyon Boyer,Mariela Rice,Kirsten Howell III,Miss Kasey Dickinson,Salvador Abbott,Albin McClure,Ms. Cole Dare,Odell Herzog,Janessa O'Conner,Vivien Schaefer,Natalie Hagenes,King Hahn,Shanny Jaskolski,Nyah Quitzon,Joan Brekke,Guy Windler,Tess Hackett,Roman Strosin,Kobe Fisher V,Miss Leopold Kuphal,Ona Larkin,Jensen Schulist,Eldred Thiel,Dock Miller,Kira Medhurst,Molly DuBuque IV,Amalia Bernier,Murray Ratke,Brooklyn Funk,Deborah Hoeger,Mrs. Pietro Stanton,Alene Robel,Montana Parker,Destany Runte,Antonina Blick III,Chelsea Wisozk,Allie White,Roxane Ankunding,Laurine Olson`.split(',')


var componentPages = {
  Tests: require('./componentPages/Button.jsx'),
  // Checkbox: require('./componentPages/Checkbox.jsx'),
  // ColorInput: require('./componentPages/ColorInput.jsx'),
  // Icon: require('./componentPages/Icon.jsx'),
  // Input: require('./componentPages/Input.jsx'),
  // ItemGroup: require('./componentPages/ItemGroup.jsx'),
  // MultiTypeInput: require('./componentPages/MultiTypeInput.jsx'),
  // Toggle: require('./componentPages/Toggle.jsx'),
}

global.Matter = Matter
global.React = React

merge(global, Matter)
global.RefreshValuePropOfInput = RefreshValuePropOfInput





var App = React.createClass({
  contextTypes: {
    router: React.PropTypes.func,
  },
  render: function () {
    var {router} = this.context

    var theme = getTheme(this)
    var config = theme.getStyle('config')
    var font = theme.getStyle('font')

    var styleCont = merge({}, font, {
      width: 920,
      padding: '0 20px',
      margin: '12px auto',
      display: 'flex',
      color: config.fontColor.normal,
    })

    return (
      <div style={styleCont}>
        <div style={{width: 270}}>
          <List style={{width: 210}}>
            {Object.keys(componentPages).map(name => {

              return <ListItem
                key={name}
                label={name}
                onClick={()=>router.transitionTo(name)}
                selected={router.isActive(name)}/>
            })}
          </List>
        </div>
        <div style={{width: 650}}>
          <RouteHandler/>
        </div>
      </div>
    )
  }
})

var routes = (
  <Route handler={App}>
    {Object.keys(componentPages).map(name => {

      return <Route
        key={name}
        name={name}
        path={kebabCase(name)}
        handler={componentPages[name]}/>
    })}
    <Redirect from='' to='Tests' />
  </Route>
)

//
// Router.run(routes, function (Handler) {
//   React.render(<Handler/>, document.querySelector('#react-mount'))
// })
import ColorCircle from '../../src/utils/ColorCircle'
React.render(<div><ColorCircle onChange={c=>console.log(c)}/></div>, document.querySelector('#react-mount'))
