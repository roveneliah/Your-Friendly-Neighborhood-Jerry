const { compose, map, either, contains } = require('ramda');

exports.printPass = (x) => { console.log(x); return x; }
exports.head = (arr) => arr ? arr[0] : arr
exports.prop = (name) => (o) => o[name] // get obj[name]
exports.mapProp = (name) => (f) => (o) => ({ ...o, [name]: f(o[name])})
exports.drop = (propName) => (o) => ({ ...o, [propName]: undefined});
exports.len = (x) => (x ? x.length : 0);
exports.pick = (props) => (o) => props.reduce((acc, p) => ({ ...acc, [p]: o[p]}), {})
exports.nestedMapProp = (prop1) => (prop2) => (f) => (o) => ({
  ...o,
  [prop1]: f(o[prop1][prop2])
})

exports.bold = (x) => x ? `**${x}**`: x

exports.map = map;
exports.compose = compose;
exports.either = either;
exports.contains = contains;