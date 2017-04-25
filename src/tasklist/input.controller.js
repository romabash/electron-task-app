
(function(){
	'use strict';
	
	angular.module('TaskList')
	.controller('InputController', InputController);
	
	InputController.$inject = ['TaskService'];
	function InputController(TaskService){
	 
	  var input = this;
	 
    input.items = TaskService.getItems(); //getting items from TaskService
    input.addMe = TaskService.getAddMe(); //new task from User input
    
    input.addItem = function(){
      TaskService.addItem(input.addMe);
    };
			
	  //Service function to clear the Input Field and Reset editIndex
	  input.cleanTask = function(){
	    TaskService.cleanTask();
	  };
	  
	}
	
})();