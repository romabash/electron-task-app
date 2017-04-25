

(function(){
  'use strict';
	
  angular.module('TaskList')
  .component('addSign', {
    templateUrl: 'src/tasklist/templates/add-sign.template.html',
	  controller: AddSignComponentController,
	  bindings: {
	  items: '<',
	  } 
  });
  
  //Component Controller - Welcome
  AddSignComponentController.$inject = ['$rootScope'];
  function AddSignComponentController($rootScope){
  var $ctrl = this;

  }
	
})();