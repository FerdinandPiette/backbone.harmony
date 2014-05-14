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

require(['MyModel'], function(MyModel) {
	myModel = new MyModel(); 
	myModel.on('change:toto', function(model) {
		$('#logger').append('<li>New value : '+model.toto+'</li>');
	}); 

	$('#update').click(function() {
		myModel.toto = $('#data').val();
	}); 

	$('#logger').append('<li>Initial value : '+myModel.toto+'</li>');
});
