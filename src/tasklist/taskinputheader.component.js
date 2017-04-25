
(function(){
  'use strict';
	
  angular.module('TaskList')
  .component('taskInputHeader', {
  templateUrl: 'src/tasklist/templates/user-input.template.html',
	controller: InputTaskComponentController,
	bindings: {
    addMe: '=', //2-directional,
	  onAdd: '&',
	  onCleanTask: '&'
	  } 
  });
  
  //Component Controller - Welcome
  InputTaskComponentController.$inject = ['$rootScope', '$element'];
  function InputTaskComponentController($rootScope, $element){
	  var $ctrl = this;
	  $ctrl.focusOn = true;

    $ctrl.add = function(){
      $ctrl.onAdd();
    };
	
	  //InputController (TaskService) function to clear the Input Field and Reset editIndex
	  $ctrl.cleanTask = function(){
	    $ctrl.onCleanTask();
	  }

    $ctrl.$doCheck = function(){
	    if($ctrl.focusOn){
		    var elem = $element.find('textarea');
		    elem.focus();
	    }
	  };

  }
	
})();
