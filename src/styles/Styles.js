import merge from 'lodash/object/merge';
import assign from 'lodash/object/assign';
import forOwn from 'lodash/object/forOwn';
import cloneDeep from 'lodash/lang/cloneDeep';
var sources = require.context('./sources', false, /^\.\/.*\.js$/);

export default class Style {

  constructor(src) {

    this.src = src || {};

    sources.keys().forEach(fileName => {
      var name = /(\w+)\.js$/.exec(fileName)[1];
      this.addSource(name, sources(fileName));
    });
  }

  clone() {

    return new Style(cloneDeep(this.src));
  }

  addSource(name, source) {

    this.src[name] = source;
  }

  extendSource(name, source) {

    var oriSource = this.src[name];

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

      delete styleSrc.mixins;
    }

    var ret = this.resolveMod(styleSrc, mod);
    return (assign(ret, additionalStyle));
  }

  resolveMod(styleSrc, mod) {

    forOwn(mod, (value, key) => {

      if (styleSrc[key]) {

        var modStyleSrc = styleSrc[key];

        if (typeof value === 'boolean') {

          if (value) {

            let modStyle = this.resolveMod(modStyleSrc, mod);
            assign(styleSrc, modStyle);
          }
        }
        else if (typeof value === 'string') {

          if (modStyleSrc[value]) {

            let modStyle = this.resolveMod(modStyleSrc[value], mod);
            assign(styleSrc, modStyle);
          }
        }
      }
    });

    return styleSrc;
  }
}
