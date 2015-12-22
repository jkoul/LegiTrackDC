'use strict';

(function() {
  var app = angular.module('openlims', [
    'ngRoute',
    'ngResource',
    'billServices',
    'openlimsControllers',
    'openLimsDirectives',
    'openlimsRouter',
    'rt.encodeuri',
    'ui.bootstrap',
    'checklist-model'
  ])
  .config(function($sceDelegateProvider){
    $sceDelegateProvider.resourceUrlWhitelist([
      'self',
      'http://dc.granicus.com/**',
      'http://lims.dccouncil.us/Download/**',
      'http://208.58.1.36:8080/**'
    ]);
  });
})()
