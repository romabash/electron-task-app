
(function(){
  'use strict';
	
  angular.module('TaskList')
  .component('taskHeader', {
    templateUrl: 'src/tasklist/templates/header.template.html',
	  controller: HeaderTaskComponentController,
	  bindings: {
	    items: '<',
	    onUndo: '&',
	    onClear: '&',
			onCleanTask: '&'
	  } 
  });
  
  //Component Controller - Welcome
  HeaderTaskComponentController.$inject = ['$rootScope', '$element'];
  function HeaderTaskComponentController($rootScope, $element){
	  var $ctrl = this;
	  $ctrl.show = false; //sub-menu not shown
	  $ctrl.showSearch = false;
	  $ctrl.searchTerm = "";
	  $ctrl.showClear2 = true;
	
	  $ctrl.showMenu = function(){
	    $ctrl.show = !$ctrl.show; //sub-menu shown
	  };
	
	  $ctrl.undo = function(){
      $ctrl.onUndo();
      //Turn off broadcast 
      $rootScope.$broadcast('undo:processing', {on: false});
    };
	
    $ctrl.clear = function(){
      $ctrl.onClear();
      //broadcast to display Undo when item is removed
      $rootScope.$broadcast('undo:processing', {on: true});
    };
	
	  $ctrl.displayAll = function(){
	    $rootScope.$broadcast('search:processing', {searchTerm: ""});
	    var condition = "";
	    $rootScope.$broadcast('all:processing', {condition: condition}); 
	    $ctrl.showClear2 = true;
    };
	  $ctrl.displayComplete = function(){
	    var condition = {done: true}
	    $rootScope.$broadcast('complete:processing', {condition: condition}); 
	    $ctrl.showClear2 = false;
    };
	  $ctrl.displayIncomplete = function(){
	    var condition = {done: false}
	    $rootScope.$broadcast('incomplete:processing', {condition: condition}); 
	    $ctrl.showClear2 = false;
    };

	  $ctrl.startSearch = function(){
	    $ctrl.showSearch = !$ctrl.showSearch;
	    var condition = "";
	    $rootScope.$broadcast('all:processing', {condition: condition}); 
	    $rootScope.$broadcast('search:processing', {searchTerm: ""});
	    $ctrl.searchTerm = "";
	  };
	
  	$ctrl.search = function(){
	    if($ctrl.searchTerm){
		    $rootScope.$broadcast('search:processing', {searchTerm: $ctrl.searchTerm}); 
	    }
	    $ctrl.searchTerm = "";
	  };
	
	  $ctrl.resetSearch = function(){
	    var condition = "";
	    $rootScope.$broadcast('all:processing', {condition: condition}); 
	    $rootScope.$broadcast('search:processing', {searchTerm: ""});
	    $ctrl.searchTerm = "";
	  };
		
		$ctrl.cleanTask = function(){
	    $ctrl.onCleanTask();
	  }
	
	  //$rootScope Listeners for UNDO Button
	  var undoButtonListener = $rootScope.$on('undo:processing', function (event, data) {
	    if (data.on) {
        $ctrl.showUndo = true;
      }
      else {
        $ctrl.showUndo = false;
      }
    });

    $ctrl.$onDestroy = function () {
      undoButtonListener();
    };
	
	  //Hiding Clear Option if there are no items
	  $ctrl.$doCheck = function(){
	    if($ctrl.items.length != 0){
		    $ctrl.showClear = true;
	    }
	    else{
		    $ctrl.showClear = false;
	    }
	  
	    if($ctrl.searchTerm){
	    	$rootScope.$broadcast('search:processing', {searchTerm: $ctrl.searchTerm}); 
	    }
			else{
		    $rootScope.$broadcast('search:processing', {searchTerm: ""});
	    }
	  
	    if($ctrl.showSearch){
		    var elem = $element.find('#userSearch');
		    elem.focus();
	    }
	  };
	
  }
	
})();
