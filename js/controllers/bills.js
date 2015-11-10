(function() {
  app = angular.module("openlimsControllers",['ngRoute']);
  app.controller("billsController", ['Bill', 'Vote', 'Legislation', function(Bill, Vote, Legislation){
    this.filters = 0;
    this.filtersOpen = false;
    this.activeFilters = [];
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
      return $response;
    });

    this.filterFields = [
      {
        type: 'Legislation Type',
        name: 'Bills',
        checked: true
      },
      {
        type: 'Legislation Type',
        name: 'Resolutions',
        checked: true
      },
      {
        type: 'Legislation Type',
        name: 'Contracts',
        checked: true
      },
      {
        type: 'Legislation Type',
        name: 'Budget Modifications',
        checked: true
      },
      {
        type: 'Legislation Type',
        name: 'Reports',
        checked: true
      },
      {
        type: 'Legislation Status',
        name: 'Under Council Review',
        checked: true
      },
      {
        type: 'Legislation Status',
        name: 'Enacted',
        checked: true
      },
      {
        type: 'Legislation Status',
        name: 'Other',
        checked: true
      },
      {
        type: 'Committee Referral',
        name: 'Committee of the Whole',
        checked: true
      },
      {
        type: 'Committee Referral',
        name: 'Committee of the Whole',
        checked: true
      },
      {
        type: 'Committee Referral',
        name: 'Business, Consumer & Regulatory Affairs',
        checked: true
      },
      {
        type: 'Committee Referral',
        name: 'Education',
        checked: true
      },
      {
        type: 'Committee Referral',
        name: 'Finance & Revenue',
        checked: true
      },
      {
        type: 'Committee Referral',
        name: 'Health & Human Services',
        checked: true
      },
      {
        type: 'Committee Referral',
        name: 'Housing & Community Development',
        checked: true
      },
      {
        type: 'Committee Referral',
        name: 'Judiciary',
        checked: true
      },
      {
        type: 'Committee Referral',
        name: 'Transportation & Environment',
        checked: true
      },
      {
        type: 'Sponsor',
        name: 'Yvette Alexander',
        checked: true
      },
      {
        type: 'Sponsor',
        name: 'Charles Allen',
        checked: true
      },
      {
        type: 'Sponsor',
        name: 'Anita Bonds',
        checked: true
      },
      {
        type: 'Sponsor',
        name: 'Mary Cheh',
        checked: true
      },
      {
        type: 'Sponsor',
        name: 'Jack Evans',
        checked: true
      },
      {
        type: 'Sponsor',
        name: 'David Grosso',
        checked: true
      },
      {
        type: 'Sponsor',
        name: 'LaRuby May',
        checked: true
      },
      {
        type: 'Sponsor',
        name: 'Kenyan McDuffie',
        checked: true
      },
      {
        type: 'Sponsor',
        name: 'Phil Mendelson',
        checked: true
      },
      {
        type: 'Sponsor',
        name: 'Brianne Nadeau',
        checked: true
      },
      {
        type: 'Sponsor',
        name: 'Vincent Orange',
        checked: true
      },
      {
        type: 'Sponsor',
        name: 'Elissa Silverman',
        checked: true
      },
      {
        type: 'Sponsor',
        name: 'Brandon Todd',
        checked: true
      },
      {
        type: 'Co-Sponsor',
        name: 'Yvette Alexander',
        checked: true
      },
      {
        type: 'Co-Sponsor',
        name: 'Charles Allen',
        checked: true
      },
      {
        type: 'Co-Sponsor',
        name: 'Anita Bonds',
        checked: true
      },
      {
        type: 'Co-Sponsor',
        name: 'Mary Cheh',
        checked: true
      },
      {
        type: 'Co-Sponsor',
        name: 'Jack Evans',
        checked: true
      },
      {
        type: 'Co-Sponsor',
        name: 'David Grosso',
        checked: true
      },
      {
        type: 'Co-Sponsor',
        name: 'LaRuby May',
        checked: true
      },
      {
        type: 'Co-Sponsor',
        name: 'Kenyan McDuffie',
        checked: true
      },
      {
        type: 'Co-Sponsor',
        name: 'Phil Mendelson',
        checked: true
      },
      {
        type: 'Co-Sponsor',
        name: 'Brianne Nadeau',
        checked: true
      },
      {
        type: 'Co-Sponsor',
        name: 'Vincent Orange',
        checked: true
      },
      {
        type: 'Co-Sponsor',
        name: 'Elissa Silverman',
        checked: true
      },
      {
        type: 'Co-Sponsor',
        name: 'Brandon Todd',
        checked: true
      }
    ]

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

    this.toggleFilters = function(){
      $('.filters-accordion').toggleClass('ng-hide');
      self.filters ++;
      if(self.filters % 2 == 1){
        self.filtersOpen = true;
      } else {
        self.filtersOpen = false;
      }
    }



    this.watchFilters = function(filter){
      self.activeBills = []
        if(filter.checked == true){
          self.activeFilters.push(filter.name);
        }
      console.log(self.activeFilters);
    };

  }]);


  app.controller("showBillController", ['$routeParams', '$location','Legislation', 'Vote', function($routeParams, $location, Legislation, Vote){
    this.bill = Legislation.get({$id: $routeParams.id}, function(bill){
      $(".filters-detail").hide();
      // Vote.get(bill);
    });
  }]);
})()
