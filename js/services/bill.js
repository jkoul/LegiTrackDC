(function(){
  var billServices = angular.module('billServices', ['ngResource'])
  billServices.factory('Bill', ['$resource', function($resource) {
    return $resource('http://legitrackdc.herokuapp.com/bills/:id', {}, {
      update: {method: 'PUT'}
    });
  }])
})()
