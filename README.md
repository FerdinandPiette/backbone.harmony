# Backbone Harmony v0.1.0

Using ECMAscript6 Proxy to replace Backbone.Model getter and setter !!

## Usage

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

Here is what you get in the terminal :

```bash
plop : 42
plop : 13
```

# With RequireJS

Include RequireJS :

```html
<script type="text/javascript" src="lib/require.js"></script>
```

RequireJS config: 

```javascript
require.config({
    paths: {
        'jquery': 'vendors/jquery-min',
        'underscore': 'vendors/underscore-min',
        'backboneBase': 'vendors/backbone-min',
        'backbone': '../src/backbone.harmony-min'
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

You can now define module and require its as usualy :

```javascript
define('MyModel', ['backbone'], function(Backbone) {
    var MyModel = Backbone.Model.extend({
		default: function() {
			return {
				'toto': 42;
			};
		},
        initialize: function() {

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
	myModel.toto = 42;
	myModel.toto = 13;
});
```

## Documentation

- **`listenable()`**

Use this method to make one or several properties listenables. All the properties in the `attributes` object of your model are listenables.

- **`isListenable()`**

Return `true` if the specified property is listenable (even if its value is null or undefined).

- **getter**

If a property is listenable, you can use the old notation to get the value of the property, or you can access to this property directly.
`myModel.get('toto')`
`myModel.toto`

- ** setter**

To modify a specific property, you can use the old backbone set method, or you can acces directly to that property.
`myModel.set({'toto': 42})`
`myModel.toto = 42`
