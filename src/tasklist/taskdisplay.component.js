
(function(){
  'use strict';
	
  angular.module('TaskList')
  .component('taskDisplay', {
	templateUrl: 'src/tasklist/templates/display.template.html',
	controller: DisplayTasksComponentController,
	bindings: {
	  items: '<',
	  addMe: '=', //2-directional,
	  onRemove: '&',
	  onCheck: '&',
	  onUncheck: '&',
	  onEdit: '&'
	} 
  });
  
//Component Controller - Display
  DisplayTasksComponentController.$inject = ['$rootScope'];
  function DisplayTasksComponentController($rootScope){
	  var $ctrl = this;
	  $ctrl.condition;
	  $ctrl.allView = true; //when viewing all tasks
  
    $ctrl.remove = function(myIndex){
      $ctrl.onRemove({index: myIndex});
      $rootScope.$broadcast('undo:processing', {on: true});
    };	
	
	  $ctrl.edit = function(myIndex){
      $ctrl.onEdit({index: myIndex});
    };	
	
	  $ctrl.check = function(myIndex){
      $ctrl.onCheck({index: myIndex});
	    $rootScope.$broadcast('undo:processing', {on: false});
    };	
	  $ctrl.uncheck = function(myIndex){
      $ctrl.onUncheck({index: myIndex});
	    $rootScope.$broadcast('undo:processing', {on: false});
    };
	
	  //Display Listeners:
	  var completeViewListener = $rootScope.$on('complete:processing', function (event, data) {
		  $ctrl.condition = data.condition;
    });
	  var incompleteViewListener = $rootScope.$on('incomplete:processing', function (event, data) {
		  $ctrl.condition = data.condition;
    });
	  var allViewListener = $rootScope.$on('all:processing', function (event, data) {
		  $ctrl.condition = data.condition;
    });
	
	  //Search Listener:
	  var searchButtonListener = $rootScope.$on('search:processing', function (event, data) {
      if (data.searchTerm) {
		    $ctrl.searchFilter = {taskFormatted: data.searchTerm};
      }
	    else{
		    $ctrl.searchFilter = {taskFormatted: ""}; 
	    }
    });

	  //Destroy Listeners
    $ctrl.$onDestroy = function () {
	    //View Listeners	
	    completeViewListener();
	    incompleteViewListener();
	    allViewListener();
	    //Search Listener
	    searchButtonListener();
    };
	
	  $ctrl.$doCheck = function(){
	    if($ctrl.items.length != 0 && $ctrl.allView){
		    $rootScope.$broadcast('clear:processing', {on: true}); //when items are not 0 and viewing all items
	    }
	    else{
		    $rootScope.$broadcast('clear:processing', {on: false});
	    }
	  };
  }
	
})();

