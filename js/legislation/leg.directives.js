'use strict';

(function(){
  angular.module('legislation')

  .directive('legFilters', function() {
    return {
      templateUrl: "js/legislation/partials/leg-filters.html"
    }
  })

  .directive('legContainer', function() {
    return {
      templateUrl: "js/legislation/partials/leg-container.html"
    }
  });

})()
