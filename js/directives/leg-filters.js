(function(){
  var directives = angular.module('openLimsDirectives',[]);
  directives.directive('legFilters', function(){
    return {
      templateUrl: "js/views/bills/leg-filters.html"
    }
  });

  directives.directive('legContainer', function(){
    return {
      templateUrl: "js/views/bills/leg-container.html"
    }
  });

  // directives.directive('modal', function(){
  //   return {
  //     templateUrl: "js/views/bills/modal.html",
  //     transclude: true,
  //     replace:true,
  //     scope:true,
  //     link: function postLink(scope, element, attrs) {
  //       scope.$watch(attrs.visible, function(value){
  //         if(value == true)
  //           $(element).modal('show');
  //         else
  //           $(element).modal('hide');
  //       });
  //
  //       $(element).on('shown.bs.modal', function(){
  //         scope.$apply(function(){
  //           scope.$parent[attrs.visible] = true;
  //         });
  //       });
  //
  //       $(element).on('hidden.bs.modal', function(){
  //         scope.$apply(function(){
  //           scope.$parent[attrs.visible] = false;
  //         });
  //       });
  //     }
  //   }
  // });
})();
