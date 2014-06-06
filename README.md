# Backbone Harmony v0.1.2

Using ECMAscript6 Proxy to replace Backbone.Model getters and setters !!

## Standard Usage

Include backbone.harmony after having included Backbone.js :

```html
<script type="text/javascript" src="backbone.js"></script>
<script type="text/javascript" src="backbone.harmony.js"></script>
```

Create a new Backbone.Model and define listenable properties like so :

```javascript
var myModel = new Backbone.Model(); 
myModel.listenable('titi', 'toto'); 
myModel.on('change:toto', function(model) {
	console.log('plop : '+model.toto);
}); 
myModel.toto = 42;
myModel.toto = 13;
```

Here is what you get in your terminal :

```bash
plop : 42
plop : 13
```

## With RequireJS

Include RequireJS :

```html
<script data-main="main" src="vendors/require.js"></script>
```

RequireJS configuration : 

```javascript
require.config({
    paths: {
        'jquery': 'vendors/jquery-min',
        'underscore': 'vendors/underscore-min',
        'backboneBase': 'vendors/backbone-min',
        'backbone': '../backbone.harmony'
    },
    shim: {
        'jquery': {
            exports: '$'
        },
        'underscore': {
            exports: '_'
        },
        'backboneBase': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        'backbone': {
			deps: ['backboneBase'],
			exports: 'Backbone'
		}
    }
});
```

You can now define modules and require its as usually :

```javascript
define('MyModel', ['backbone'], function(Backbone) {
    var MyModel = Backbone.Model.extend({
		default: function() {
			return {
				'toto': 42;
			};
		}
    });

    return MyModel;
});
```

```javascript
require(['MyModel'], function(MyModel) {
	var myModel = new MyModel(); 
	myModel.on('change:toto', function(model) {
		console.log('plop : '+model.toto);
	}); 
	myModel.toto = 42;	// No change (initial value was already 42)
	myModel.toto = 13;	// First change
});
```

## Documentation

- **`listenable()`**

Use this method to make one or several properties listenables. All the properties in the `attributes` object of your model are listenables.

For example, `myModel.listenable('titi', 'toto');` creates two new properties with undefined values in myModel.attributes

- **`isListenable()`**

Return `true` if the specified property is listenable.

This method is different from Backbone's `has` method. Event if the property value is `undefined` or `null` but exists in `myModel.attributes` object, `isListenable` will return `true`.

- **getter**

If a property is listenable, you can use the old notation to get the value of the property, or you can access to this property directly.

If the property `toto` is listenable, `myModel.toto` is equivalent to `myModel.get('toto')`

- **setter**

To modify a specific property, you can use the old backbone set method, or you can access directly to that property.

If the property `toto`is listenable, `myModel.toto = 42` is equivalent to `myModel.set({'toto': 42})`
