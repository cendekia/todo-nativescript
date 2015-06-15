// todo.js
var modelModule = require( "./todoData" );
var data = modelModule.data;

function onPageLoaded(args) {
    var page = args.object;
    page.bindingContext = data;
}

exports.onPageLoaded = onPageLoaded;
