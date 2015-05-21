import merge from 'lodash/object/merge';
import forIn from 'lodash/object/forIn';
import cloneDeep from 'lodash/lang/cloneDeep';
var sources = require.context('./sources', false, /^\.\/.*\.js$/);
console.log(sources.keys());

export default class Style {

  constructor(src) {

    this.src = src || {};

    sources.keys().forEach(fileName => {
      var name = /(\w+)\.js$/.exec(fileName)[1];
      this.addSource(name, sources(fileName));
    });
  }

  clone() {
    
    return new Style(cloceDeep(this.src));
  }

  addSource(name, source) {

    this.src[name] = source;
  }

  extendSource(name, source) {

    var oriSource = this.src[key];

    if (oriSource) {

      this.addSource(name, (...args) => {

        return merge(source(...args), oriSource(...args));
      });
    }
    else {
      this.addSource(name, source);
    }
  }

  get(name, mod, additionalStyle) {

    var styleSrc = this.src[name];

    if (process.env.NODE_ENV !== 'production') {
      if (!styleSrc) {
        throw Error(`Can't find style source for "${name}"`);
      }
    }

    styleSrc = styleSrc(this, mod);

    if (styleSrc.mixins) {

      styleSrc.mixins.slice().forEach(mixinName => {

        merge(styleSrc, this.get(mixinName, mod));
      });
    }

    return this.resolveMod(styleSrc, mod);
  }

  resolveMod(styleSrc, mod) {

    forIn(mod, (value, key) => {

      if (styleSrc[key]) {

        if (typeof(value) === 'boolean') {

          if (value) {

            let modStyle = this.resolveMod(styleSrc[key]);
            merge(styleSrc, modStyle);
          }
        }
        else if (typeof(value) === 'string') {

          if (styleSrc[key][value]) {

            let modStyle = this.resolveMod(styleSrc[key][value]);
            merge(styleSrc, modStyle);
          }
        }
      }
    });

    return styleSrc;
  }
}
