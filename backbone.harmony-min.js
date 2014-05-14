/**
* Backbone Harmony
* Version 0.1.0
*
* https://github.com/FerdinandPiette/backbone.harmony
*/
!function(e,t){"undefined"!=typeof exports?t(e,exports,require("backbone")):"function"==typeof define&&define.amd?define(["backbone"],function(n){return t(e,n||e.Backbone)}):t(e,Backbone)}(this,function(e,t){"use strict";t.Model.prototype.listenable=function(){var e=Array.prototype.slice.call(arguments);return e.forEach(function(e){e in this.attributes||(this.attributes[e]=void 0)}.bind(this)),this},t.Model.prototype.isListenable=function(e){return e in this.attributes?!0:!1};var n={get:function(e,t){return e.isListenable(t)?e.get(t):e[t]},set:function(e,t,n,r){if(e.isListenable(t)){var i={};i[t]=n,r.set(i)}else e[t]=n;return!0}},r={construct:function(e,t){var r=Object.create(e.prototype);return e.apply(r,t),new Proxy(r,n)}};t.Model=new Proxy(t.Model,r);var i=t.Model.extend;return t.Model.extend=function(){var e=i.apply(this,arguments);return new Proxy(e,r)},t});
