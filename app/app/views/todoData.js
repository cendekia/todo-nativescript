// todoData.js
var observableModule = require( "data/observable" ),
observableArray = require( "data/observable-array" ),
Todo = require( "../shared/models/Todo" ),
data = new observableModule.Observable();

data.set( "todos", new observableArray.ObservableArray([
    new Todo( "Wake up" ),
    new Todo( "Coding TODO app with NativeScript" ),
    new Todo( "Publish on blog" ),
    new Todo( "Eat then Sleep" )
]));

module.exports = data;