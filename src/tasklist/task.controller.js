
(function(){
  'use strict';

  angular.module('TaskList')
  .controller('TaskCtrl', TaskCtrl);
  
  
  //Controller
  TaskCtrl.$inject = ['TaskService'];
  function TaskCtrl(TaskService){
    var list = this;
	  
    list.items = TaskService.getItems(); //getting items from TaskService
    list.addMe = TaskService.getAddMe(); //new task from User input
	
	  list.edit = function(itemIndex){
	    TaskService.edit(itemIndex);
	  };
	
	  list.checkItem = function (itemIndex){
      TaskService.checkItem(itemIndex); 
    };
	
	  list.unCheckItem = function (itemIndex){
      TaskService.unCheckItem(itemIndex); 
    };
    
    list.removeItem = function (itemIndex){
      TaskService.removeItem(itemIndex); 
      list.addMe = "";
    };
    
    list.clear = function(){
      TaskService.clear();
      list.addMe = "";
    };
    
    list.undo = function(){
      TaskService.undo();
      list.items = TaskService.getItems(); //reinitialize items 
    };
		
	  //Service function to clear the Input Field and Reset editIndex
	  list.cleanTask = function(){
	    TaskService.cleanTask();
	  };
		
  }
	
})();