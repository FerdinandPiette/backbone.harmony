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
	var myModel = new MyModel(); 
	myModel.on('change:toto', function(model) {
		// Equivalent to :
		// $('#logger').append('<li>New value : '+model.get('toto')+'</li>');
		$('#logger').append('<li>New value : '+model.toto+'</li>');
	}); 

	$('#update').click(function() {
		// Equivalent to : 
		// myModel.set({toto: $('#data').val()});
		myModel.toto = $('#data').val();
	}); 

	// Equivalent to :
	// $('#logger').append('<li>Initial value : '+model.get('toto')+'</li>');
	$('#logger').append('<li>Initial value : '+myModel.toto+'</li>');
});
