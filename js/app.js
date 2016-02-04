'use strict';

(function(){
  angular
  .module("legitrackdc", [
    'ui.router',
    'ngResource',
    'ui.bootstrap',
    'checklist-model',
    // add in-app dependencies
    "legislation"
  ])
  .config([
    "$stateProvider",
    "$urlRouterProvider",
    "$locationProvider",
    routerFunction
  ])

  .config(function($sceDelegateProvider) {
    $sceDelegateProvider.resourceUrlWhitelist([
      'self',
      'http://dc.granicus.com/**',
      'http://lims.dccouncil.us/Download/**',
      'http://208.58.1.36:8080/**'
    ]);
  });

  function routerFunction($stateProvider, $urlRouterProvider, $locationProvider){
    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise('/');
    $stateProvider
    .state("LegIndex", {
      url: "/",
      templateUrl: 'js/legislation/index.html',
      controller: 'legIndexController',
      controllerAs: 'legIndex',
      reloadOnSearch:false
    })
    .state("LegShow", {
      url: "/:id",
      templateUrl: 'js/legislation/show.html',
      controller: 'legShowController',
      controllerAs: 'legShow'
    })
  }
})();
