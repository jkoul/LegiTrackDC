'use strict';

(function(){
  angular
  .module("legitrackdc", [
    'ui.router',
    'ngResource',
    // in-app dependencies
    'ui.bootstrap',
    'checklist-model'
  ])
  .config([
    "$stateProvider",
    "$locationProvider",
    sceDelegates,
    routerFunction
  ]);

  function sceDelegates($sceDelegateProvider) {
    $sceDelegateProvider.resourceUrlWhitelist([
      'self',
      'http://dc.granicus.com/**',
      'http://lims.dccouncil.us/Download/**',
      'http://208.58.1.36:8080/**'
    ]);
  };

  function routerFunction($stateProvider, $locationProvider){
    $locationProvider.html5Mode(true);
    $stateProvider
    .state("LegIndex", {
      url: "/",
      templateUrl: 'js/legislation/index.html',
      controller: 'LegIndexController',
      controllerAs: 'LegIndexVM',
      reloadOnSearch:false
    })
    .state("LegShow", {
      url: "/legislation/:id",
      templateUrl: 'js/legislation/show.html',
      controller: 'LegShowController',
      controllerAs: 'LegShowVM'
    })
  }
})()
