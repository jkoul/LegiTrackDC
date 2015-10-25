(function() {
  app = angular.module("openlimsControllers",['ngRoute']);
  app.controller("billsController", ['Bill', function(Bill){
    this.bills = Bill.query();
    this.bills.$promise.then(function($response){
      $('.load-note').hide();
      // $.each(response, function(response){
      //   response.score = {
      //     supporting: 0,
      //     opposing: 0
      //   }
      //   console.log(response.score)
      // })
    })
    this.count = function(){
      return this.bills.length;
    };

    this.upvote = function(){
      console.log("active");
      var score = this.score;
      score.supporting += 1;
    }
  }]);

app.controller("scoreController", ['$routeParams', '$location',''])


  app.controller("showBillController", ['$routeParams', '$location','Bill', function($routeParams,$location,Bill){
    this.bill = Bill.get({$bill_id: $routeParams.bill_id}, function(){
      $(".filters-detail").hide()
    });
  }])
})();
