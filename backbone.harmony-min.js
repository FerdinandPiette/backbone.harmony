/**
* Backbone Harmony
* Version 0.1.2
*
* https://github.com/FerdinandPiette/backbone.harmony
*/
(function(c,a){"undefined"!==typeof exports?a(c,exports,require("backbone")):"function"===typeof define&&define.d?define(["backbone"],function(d){return a(c,d||c.c)}):a(c,Backbone)})(this,function(c,a){a.a.prototype.b=function(b){return b in this.attributes?!0:!1};var d={get:function(b,a){return b.b(a)?b.get(a):b[a]},set:function(b,a,c,d){b.b(a)?(b={},b[a]=c,d.set(b)):b[a]=c;return!0}},f={e:function(a,c){var e=Object.create(a.prototype);a.apply(e,c);return new Proxy(e,d)}},g=a.a.extend;a.a.extend=function(){var a=g.apply(this,arguments);return new Proxy(a,f)};a.a=a.a.extend();return a});
