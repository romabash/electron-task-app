
(function(){
  'use strict';
	
  angular.module('TaskList')
  .service('TaskService', TaskService);
  
  //Service - TaskService
  TaskService.$inject = ['StorageService'];
  function TaskService(StorageService){
    var service = this;
    var items = StorageService.load("allTasks");
    var temp = StorageService.load("allTasks");  //holds temporally LocalStorage data
	  var editIndex = false;
	
	  var addMe = "";
    
    service.addItem = function(task){
	    //check to see if task is already in the list
      if(!task){
        return; //if no input
      }
      else if(editIndex === false){
		    var time = new Date().toLocaleString();
        items.push({task: task, taskFormatted: task.replace(/\s+/g, " "), done: false, time: time});
        StorageService.save("allTasks", items); //saves new task into LocalStorage
        temp = StorageService.load("allTasks"); //assign new LocalStorage data 
      }
	    else if(editIndex !== false){
		    items[editIndex].task = task;
		    items[editIndex].taskFormatted = task.replace(/\s+/g, " "); 
        //items.push({task: task, done: false});
        StorageService.save("allTasks", items); //saves new task into LocalStorage
        temp = StorageService.load("allTasks"); //assign new LocalStorage data 
      }
	    editIndex = false;
	    addMe = "";
    };
	
	  //Empties the Input Field and Reset editIndex
	  service.cleanTask = function(){
	    addMe = "";
	    editIndex = false;
	  };
	
	  service.edit = function(itemIndex){
	    editIndex = itemIndex;
	    addMe = items[itemIndex].task;
	  };
	
	  service.checkItem = function(itemIndex){
	    items[itemIndex].done = true;
	    StorageService.save("allTasks", items); //saves checked task into LocalStorage
      temp = StorageService.load("allTasks"); //assign new LocalStorage data with checked allTasks
    };
	
    service.unCheckItem = function(itemIndex){
	    items[itemIndex].done = false;
	    StorageService.save("allTasks", items); //saves checked task into LocalStorage
      temp = StorageService.load("allTasks"); //assign new LocalStorage data with checked allTasks
    };
    
    service.removeItem = function(itemIndex){
      temp = StorageService.load("allTasks"); //assign LocalStorage data before deleting a task
      items.splice(itemIndex,1); 
      StorageService.save("allTasks", items); //after deleting, save to LocalStorage
    };
    
    service.clear = function(){
      temp = StorageService.load("allTasks"); //assign LocalStorage data before clearing all allTasks
      items.splice(0,items.length);
      StorageService.save("allTasks", items); //after clearing all allTasks, save to LocalStorage
    };
    
    service.undo = function(){		
      items = temp;  //assign items to the previous data stored in temp
      StorageService.save("allTasks", items); //save to LocalStorage to update
    };
    
    service.getItems = function(){
      return items; 
    };
	
	  service.getAddMe = function(){
	    return addMe; 
	  };
	
  }
	
})();

