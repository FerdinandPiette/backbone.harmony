/**
* Backbone Harmony
* Version 0.1.2
*
* https://github.com/FerdinandPiette/backbone.harmony
*/
(function(root, factory) {
	if (typeof exports !== 'undefined') {
		// Node/CommonJS
		factory(root, exports, require('backbone'));
	} else if (typeof define === 'function' && define.amd) {
		// AMD. Register as an anonymous module.
		define(['backbone'], function(Backbone) {
			// Use global variables if the locals are undefined.
			return factory(root, Backbone || root.Backbone);
		});
	} else {
		factory(root, Backbone);
	}
}(this, function(root, Backbone) {
	"use strict";

	// Use this method to make a property listenable
	// If a property is listenable, it generate a event when it change
    Backbone.Model.prototype.listenable = function() {
        var args = Array.prototype.slice.call(arguments);
        args.forEach(function(property) {
            if(!(property in this.attributes)) {
                this.attributes[property] = undefined;
            }
        }.bind(this));
        return this;
    };
    
	// Check if a property is listenable
    Backbone.Model.prototype.isListenable = function(property) {
        if(property in this.attributes) {
            return true;
        }
        return false;
    };
    
	// Metaprogramming interface for Backbone.Model's instances getters and setters
    var ModelInstanceMetaProgrammingInterface = {
		// Backbone.Model instance getter
        get: function(object, property) {
            if(object.isListenable(property)) {
                return object.get(property);
            }
            return object[property];
        },
		// Backbone.Model instance setter
        set: function(object, property, value, proxy) {
            if(object.isListenable(property)) {
                var o = {};
                o[property] = value;
                proxy.set(o);
            } else {
                object[property] = value;
            }
            return true;
        }
    };

	// Metaprogramming interface for Backbone.Model new operator
	var ModelMetaProgrammingInterface = {
		// Backbone.Model new operator
	    construct: function(target, args) {
	        var instance = Object.create(target.prototype);
	        target.apply(instance, args);
	        return new Proxy(instance, ModelInstanceMetaProgrammingInterface);
	    }
	};

	// Redefinition of Backbone.Model.extend
	// An instance of a class that inherit from Backbone.Model is a Proxy
	// So we can use the redefined getter and setter
	var oldExtend = Backbone.Model.extend;
	Backbone.Model.extend = function() {
		var child = oldExtend.apply(this, arguments);	
		return new Proxy(child, ModelMetaProgrammingInterface);
	};

	// Backbone.Model is now a Proxy that redefine 'new' operator
	// During 'new' operation, the Backbone.Model instance is wrapped 
	// in a Proxy that redefine getters and setters
    Backbone.Model = Backbone.Model.extend();

    return Backbone;    
}));
