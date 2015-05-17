var React = require('react');
var Matter = require('matterkit');
var merge = require('lodash/object/merge');

module.exports = merge({}, Matter, {Matter, React});
