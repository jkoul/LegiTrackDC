(function() {
  app = angular.module("openlimsControllers",['ngRoute']);
  app.controller("billsController", ['Bill', 'Vote', 'Legislation', function(Bill, Vote, Legislation){

    this.all = Bill.query();
    var self=this;
    this.all.$promise.then(function($response, $Vote){
      $('.load-note').hide();
      angular.forEach($response, function(b, $Vote){
      // Strips spaces in bills
        b.bill_id = b.bill_id.replace(/\s/g, '');
      // Sets the score on the bill and registers a call back
        b.action_dates.first = new Date(b.action_dates.first);
        b.action_dates.last = new Date(b.action_dates.last);
        self.getType(b);
        Vote.get(b);
      });
      self.loadFilters();
      return $response;
    });

    this.getType = function(bill){
      var id = bill.bill_id.split("-");
      switch(id[0]){
        case 'B21':
          type = 'Bill';
          typeDetail = 'Bill';
          break;
        case 'PR21':
          type = 'Resolution';
          typeDetail = 'Resolution';
          break;
        case 'CER21':
          type = 'Resolution';
          typeDetail = 'Ceremonial Resolution';
          break;
        case 'CA21':
          type = 'Contract';
          typeDetail = 'Contract';
          break;
        case 'GBM21':
          type = 'Budget Modification';
          typeDetail = 'Grant Budget Modification';
          break;
        case 'REPROG21':
          type = 'Budget Modification';
          typeDetail = 'Budget Reallocation';
          break;
        case 'HFA21':
          type = 'Budget Modification';
          typeDetail = 'Housing Finance Agency Bond Issuance'
          break;
        case 'AU21':
          type = 'Report';
          typeDetail = 'Audit Report';
          break;
        case 'RC21':
          type = 'Report';
          typeDetail = 'Other Report';
          break;
        case 'IG21':
          type = 'Report';
          typeDetail = 'Inspector General Report';
          break;
        case 'CFO21':
          type = 'Report';
          typeDetail = 'Chief Financial Officer Report';
          break;
        default:
          type = 'Other';
          typeDetail = 'Other';
      }
      angular.extend(bill, {'type': type, 'typeDetail': typeDetail});
    };

    this.bills = Legislation.query();
    this.bills.$loaded().then(function($response, $Vote){
      angular.forEach($response, function(b, $Vote){
        b.bill_id = b.$id;
        Vote.get(b);
      });
      return $response;
    });

    this.count = function(){
      return this.all.length;
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

    this.loadFilters = function(){
      
    }

  }]);

app.controller("scoreController", ['$routeParams', '$location',''])


  app.controller("showBillController", ['$routeParams', '$location','Bill', function($routeParams,$location,Bill){
    this.bill = Bill.get({$bill_id: $routeParams.bill_id}, function(){
      $(".filters-detail").hide()
    });
  }])
})();
