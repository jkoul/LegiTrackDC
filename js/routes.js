(function(){
  var router = angular.module('openlimsRouter',[])
  router.config(['$routeProvider', function($routeProvider){
    $routeProvider.
    when("/", {
      templateUrl: 'js/views/bills/index.html',
      controller: 'billsController',
      controllerAs: 'billsCtrl'
    }).
    when("/bills", {
      templateUrl: 'js/views/bills/bills.html',
      controller: 'billsController',
      controllerAs: 'billsCtrl'
    }).
    when("/resolutions", {
      controller: 'billsController',
      controllerAs: 'billsCtrl',
      templateUrl: 'js/views/bills/resolutions.html'
    }).
    when("/other", {
      controller: 'billsController',
      controllerAs: 'billsCtrl',
      templateUrl: 'js/views/bills/other.html'
    }).
    when("/bills/:bill_id", {
      templateUrl: 'js/views/bills/show.html',
      controller: 'showBillController',
      controllerAs: 'showBillCtrl'
    }).
    when("/updatefirebase", {
      templateUrl: 'js/views/home/update.html',
      controller: 'updateBillDataToFirebase',
      controllerAs: 'updateBills'
    }).
    otherwise({
      redirectTo: "/bills"
    })
  }]);
 })()
