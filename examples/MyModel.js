define('MyModel', ['backbone'], function(Backbone) {
    var MyModel = Backbone.Model.extend({
		defaults: function() {
			return {
				'toto': 42
			};
		}
    });

    return MyModel;
});
