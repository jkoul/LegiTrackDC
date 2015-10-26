(function() {
  app = angular.module("openlimsControllers",['ngRoute']);
  app.controller("billsController", ['Bill', 'Vote', function(Bill, Vote){
    this.bills = Bill.query();
    this.bills.$promise.then(function($response){
      $('.load-note').hide();
      angular.forEach($response, function(b){
      // Sets the score on the bill and registers a call back
        b.action_dates.first = new Date(b.action_dates.first);
        b.action_dates.last = new Date(b.action_dates.last);
        Vote.get(b);
      });
    });
    this.count = function(){
      return this.bills.length;
    };

    this.upvote = function(bill){
      if(!bill.upvote) {
        if(bill.downvote) {
          bill.score.opposing--;
        }
        bill.score.supporting++;
        Vote.save(bill);
        bill.downvote = false;
        bill.upvote = true;
      }
    }

    this.downvote = function(bill) {
      if(!bill.downvote){
        if(bill.upvote) {
          bill.score.supporting--;
        }
        bill.score.opposing++;
        Vote.save(bill);
        bill.downvote = true;
        bill.upvote = false;
      }
    }
  }]);

app.controller("scoreController", ['$routeParams', '$location',''])


  app.controller("showBillController", ['$routeParams', '$location','Bill', function($routeParams,$location,Bill){
    this.bill = Bill.get({$bill_id: $routeParams.bill_id}, function(){
      $(".filters-detail").hide()
    });
  }])
})();
