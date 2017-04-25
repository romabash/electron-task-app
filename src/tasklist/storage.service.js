
(function(){
  'use strict';
	
  angular.module('TaskList')
  .service('StorageService', StorageService);

  function StorageService(){
    var service = this;
    
    //loads data from LocalStorage - provide name
    service.load = function(name){
      var load = JSON.parse(localStorage.getItem(name)) || [];
      return load;
    };
    
    //saves data to LocalStorage - provide name and data
    service.save = function(name, items){
      localStorage.setItem(name, JSON.stringify(items));
    };
  }
	
})();