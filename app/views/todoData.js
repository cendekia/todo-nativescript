// todoData.js
var observableModule = require( "data/observable" ),
observableArrayModule = require( "data/observable-array" ),
dialogs = require("ui/dialogs"),
localSettings = require("application-settings"),
Todo = require( "../shared/models/Todo" ),
defaultValues = [
    new Todo( "Wake up" ),
    new Todo( "Coding TODO app with NativeScript" ),
    new Todo( "Publish on blog" ),
    new Todo( "Eat then Sleep" )
],
data = new observableModule.Observable();

var todoLists = localSettings.getString('todoLists');

if(typeof todoList == "undefined"){
	localSettings.setString('todoLists', JSON.stringify(defaultValues));
}

data.set( "todos", new observableArrayModule.ObservableArray(JSON.parse(todoLists)));

data.promptTodo = function(args) {
  dialogs.prompt({
	  title: "Add Todo",
	  message: "Enter your todo name:",
	  okButtonText: "Add",
	  cancelButtonText: "Cancel",
	  defaultText: "",
	  inputType: dialogs.inputType.text
	}).then(function (promptResult) {
    if (promptResult.result) {
    		defaultValues = JSON.parse(todoLists);
    		var newTodo = new Todo(promptResult.text);
        defaultValues.push(newTodo);

        localSettings.setString('todoLists', JSON.stringify(defaultValues));
        todoLists = localSettings.getString('todoLists');
        
        data.set( "todos", new observableArrayModule.ObservableArray(JSON.parse(todoLists)));
    }
  });
};

data.todoListTap = function(args){
	var actionBtns = ["Done", "Edit", "Delete"];
	
	todoLists = localSettings.getString('todoLists');
	defaultValues = JSON.parse(todoLists);
	
	var currentList = defaultValues[args.index];
	
	if(currentList.complete){
		actionBtns = ["Undone", "Edit", "Delete"];
	}

	dialogs.action({
	  message: "Update Your TODO status:",
	  cancelButtonText: "Close",
	  actions: actionBtns
	}).then(function (result) {
	  if(result=='Delete'){
	  	dialogs.confirm({
			  title: currentList.name,
			  message: "Are you sure want to delete it?",
			  okButtonText: "Yes",
			  cancelButtonText: "Cancel",
			}).then(function (res) {
			  if(res){
			  	defaultValues.splice(args.index,1);
			  	localSettings.setString('todoLists', JSON.stringify(defaultValues));
			    todoLists = localSettings.getString('todoLists');
			    data.set( "todos", new observableArrayModule.ObservableArray(JSON.parse(todoLists)));
			  }
			})
	  }else if(result == 'Edit'){
	  	dialogs.prompt({
			  title: "Edit",
			  message: "Todo edit form:",
			  okButtonText: "Update",
			  cancelButtonText: "Cancel",
			  defaultText: currentList.name,
			  inputType: dialogs.inputType.text
			}).then(function (promptResult){
	  		if (promptResult.result) {
	  			defaultValues[args.index].name = promptResult.text;
	  			localSettings.setString('todoLists', JSON.stringify(defaultValues));
			    todoLists = localSettings.getString('todoLists');
			    data.set( "todos", new observableArrayModule.ObservableArray(JSON.parse(todoLists)));
	  		}
	  	})
	  }else if(result == 'Done'){
	  	dialogs.confirm({
			  title: currentList.name,
			  message: "Are you sure this todo is done?",
			  okButtonText: "Yes",
			  cancelButtonText: "Cancel",
			}).then(function (res) {
			  if(res){
			  	defaultValues[args.index].complete = true;
			  	localSettings.setString('todoLists', JSON.stringify(defaultValues));
			    todoLists = localSettings.getString('todoLists');
			    data.set( "todos", new observableArrayModule.ObservableArray(JSON.parse(todoLists)));
			  }
			});
	  }else if(result == 'Undone'){
	  	dialogs.confirm({
			  title: currentList.name,
			  message: "This todo ain't done yet?",
			  okButtonText: "Yep",
			  cancelButtonText: "Cancel",
			}).then(function (res) {
			  if(res){
			  	defaultValues[args.index].complete = false;
			  	localSettings.setString('todoLists', JSON.stringify(defaultValues));
			    todoLists = localSettings.getString('todoLists');
			    data.set( "todos", new observableArrayModule.ObservableArray(JSON.parse(todoLists)));
			  }
			});
	  }

	  // this for debugging purpose
	  // data.set("logs", result+'#'+args.index+'#'+todoLists);
	});
};

exports.data = data;