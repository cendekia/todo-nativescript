// todo.js
var todoData = require( "./todoData" );

exports.load = function(args){
	args.object.bindingContext = todoData;
}
