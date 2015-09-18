(function() {
  app = angular.module("openlimsControllers",['ngRoute']);
  app.controller("billsController", ['Bill', function(Bill){
    this.bills = Bill.query()
    this.bills.$promise.then(function(){
      $('.load-note').hide();
    })
    this.upvote = function(id){
      var score = this.score;
      score.supporting += 1;
    }
  }]);

  app.controller("showBillController", ['$routeParams', '$location','Bill', function($routeParams,$location,Bill){
    this.bill = Bill.get({id: $routeParams.id}, function(){
      $(".filters-detail").hide()
    });
  }])
})();
