(function(){
  var router = angular.module('openlimsRouter',[])
  router.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
    $routeProvider.
    when("/", {
      templateUrl: 'js/views/bills/index.html',
      controller: 'billsController',
      controllerAs: 'billsCtrl',
      reloadOnSearch:false
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
    when("/bills/:id", {
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
      redirectTo: "/"
    });

    // use the HTML5 History API
    $locationProvider.html5Mode({enabled: true, requireBase: false});
  }]);
 })()
