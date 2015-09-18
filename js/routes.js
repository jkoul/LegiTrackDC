(function(){
  var router = angular.module('openlimsRouter',[])
  router.config(['$routeProvider', function($routeProvider){
    $routeProvider.
    when("/", {
      templateUrl: 'js/views/home/index.html',
    }).
    when("/bills", {
      controller: 'billsController',
      controllerAs: 'billsCtrl',
      templateUrl: 'js/views/bills/index.html'
    }).
    when("/bills/:id", {
      controller: 'showBillController',
      controllerAs: 'showBillCtrl',
      templateUrl: 'js/views/bills/show.html'
    }).
    otherwise({
      redirectTo: "/bills"
    })
  }]);
 })()
