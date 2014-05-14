/**
* Backbone Harmony
* Version 0.1.1
*
* https://github.com/FerdinandPiette/backbone.harmony
*/
(function(c,a){"undefined"!==typeof exports?a(c,exports,require("backbone")):"function"===typeof define&&define.d?define(["backbone"],function(d){return a(c,d||c.c)}):a(c,Backbone)})(this,function(c,a){a.a.prototype.b=function(b){return b in this.attributes?!0:!1};var d={get:function(b,a){return b.b(a)?b.get(a):b[a]},set:function(b,a,c,d){b.b(a)?(b={},b[a]=c,d.set(b)):b[a]=c;return!0}},e={e:function(a,c){var e=Object.create(a.prototype);a.apply(e,c);return new Proxy(e,d)}};a.a=new Proxy(a.a,e);var f=a.a.extend;a.a.extend=function(){var a=f.apply(this,arguments);return new Proxy(a,e)};return a});
