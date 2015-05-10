import merge from 'lodash/object/merge';
import forIn from 'lodash/object/forIn';
// import bulk from 'bulk-require';
var bulk = require('bulk-require');
var sources = bulk(__dirname, 'sources/*.js').sources;
console.log(sources);

export default class Style {

  constructor() {

    this.src = sources;
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
