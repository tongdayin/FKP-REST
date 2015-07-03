var url = require('url');
var path = require('path')
var domain = require('domain');
var extend = require('extend');
var parse = require('co-body');
var lodash = require('lodash');

//libs
var getObjType = function(object){
    return Object.prototype.toString.call(object).match(/^\[object\s(.*)\]$/)[1];
}

var clone = function(target){
    var t = getObjType(target);
    return t === 'Object' ? extend(true, {}, target) : t === 'Array' ? extend(true, [], target) : target;
}

var clog = function(msg){
    console.log('-----------------------');
    console.log('-----------------------');
    console.log('-----------------------');
    console.log(msg);
}

var elog = function(msg){
    console.log('============');
    console.log('============');
    console.log(msg);
}

var wlog = function(msg){
    console.log('+++++++++++');
    console.log('+++++++++++');
    console.log(msg);
}

module.exports = {
    getObjType: getObjType,
    clone: clone,
    clog: clog,
    elog: elog,
    wlog: wlog,
    $extend: extend,
    $url: url,
    $path: path,
    $domain: domain,
    $parse: parse,
    $lodash: lodash

}
