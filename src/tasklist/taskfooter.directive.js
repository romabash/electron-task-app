
(function(){
  'use strict';
	
  angular.module('TaskList')
  .directive('taskFooter', TaskFooter); //declare directive with camelCase
	
  //Directive
	function TaskFooter(){
	  var ddo = {
		  templateUrl: 'src/tasklist/templates/footer.template.html'
	  };
	  return ddo;
	}
})();