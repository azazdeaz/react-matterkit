var React = require('react');
var Matter = require('../../lib/index');
var merge = require('lodash/object/merge');

module.exports = merge({}, Matter, {Matter, React});
