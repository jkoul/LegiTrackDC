(function() {
  app = angular.module("openlimsControllers",['ngRoute']);
  app.controller("billsController", ['OpenStates', 'Vote', 'Legislation', function(OpenStates, Vote, Legislation){
    this.filters = 0;
    this.filtersOpen = false;
    this.activeFilters = [[1,2,3,4,5],[],[],[]];
    var self=this
    this.all = Legislation.query();
        this.all.$loaded().then(function($response, $Vote){
          angular.forEach($response, function(b, $Vote){
            self.getType(b);
            Vote.get(b);
          });
          console.log($response);
          return $response;
        });

    this.filterFields = [
      [
        {
          type: 'Legislation Type',
          typeId: 1,
          name: 'Bills',
          bills: true
        },
        {
          type: 'Legislation Type',
          typeId: 2,
          name: 'Resolutions',
          checked: true
        },
        {
          type: 'Legislation Type',
          typeId: 3,
          name: 'Contracts',
          checked: true
        },
        {
          type: 'Legislation Type',
          typeId: 4,
          name: 'Budget Modifications',
          checked: true
        },
        {
          type: 'Legislation Type',
          typeId: 5,
          name: 'Reports',
          checked: true
        }
      ],
      [
        {
          type: 'Legislation Status',
          statusId: 1,
          name: 'Under Council Review',
          checked: true
        },
        {
          type: 'Legislation Status',
          statusId: 2,
          name: 'Enacted',
          checked: true
        },
        {
          type: 'Legislation Status',
          statusId: 3,
          name: 'Other',
          checked: true
        }
      ],
      [
        {
          type: 'Committee Referral',
          id: 'cowFilter',
          name: 'Committee of the Whole',
          checked: true
        },
        {
          type: 'Committee Referral',
          id: 'bcraFilter',
          name: 'Business, Consumer & Regulatory Affairs',
          checked: true
        },
        {
          type: 'Committee Referral',
          id: 'eduFilter',
          name: 'Education',
          checked: true
        },
        {
          type: 'Committee Referral',
          id: 'financeFilter',
          name: 'Finance & Revenue',
          checked: true
        },
        {
          type: 'Committee Referral',
          id: 'hhsFilter',
          name: 'Health & Human Services',
          checked: true
        },
        {
          type: 'Committee Referral',
          id: 'housingFilter',
          name: 'Housing & Community Development',
          checked: true
        },
        {
          type: 'Committee Referral',
          id: 'judiciaryFilter',
          name: 'Judiciary',
          checked: true
        },
        {
          type: 'Committee Referral',
          id: 'transpoFilter',
          name: 'Transportation & Environment',
          checked: true
        }
      ],
      [
        {
          type: 'Sponsor',
          id: 'sponsorAlexanderFilter',
          name: 'Yvette Alexander',
          checked: true
        },
        {
          type: 'Sponsor',
          id: 'sponsorAllenFilter',
          name: 'Charles Allen',
          checked: true
        },
        {
          type: 'Sponsor',
          id: 'sponsorBondsFilter',
          name: 'Anita Bonds',
          checked: true
        },
        {
          type: 'Sponsor',
          id: 'sponsorChehFilter',
          name: 'Mary Cheh',
          checked: true
        },
        {
          type: 'Sponsor',
          id: 'sponsorEvansFilter',
          name: 'Jack Evans',
          checked: true
        },
        {
          type: 'Sponsor',
          id: 'sponsorGrossoFilter',
          name: 'David Grosso',
          checked: true
        },
        {
          type: 'Sponsor',
          id: 'sponsorMayFilter',
          name: 'LaRuby May',
          checked: true
        },
        {
          type: 'Sponsor',
          id: 'sponsorMcDuffieFilter',
          name: 'Kenyan McDuffie',
          checked: true
        },
        {
          type: 'Sponsor',
          id: 'sponsorMendelsonFilter',
          name: 'Phil Mendelson',
          checked: true
        },
        {
          type: 'Sponsor',
          id: 'sponsorNadeauFilter',
          name: 'Brianne Nadeau',
          checked: true
        },
        {
          type: 'Sponsor',
          id: 'sponsorOrangeFilter',
          name: 'Vincent Orange',
          checked: true
        },
        {
          type: 'Sponsor',
          id: 'sponsorSilvermanFilter',
          name: 'Elissa Silverman',
          checked: true
        },
        {
          type: 'Sponsor',
          id: 'sponsorToddFilter',
          name: 'Brandon Todd',
          checked: true
        }
      ],
      [
        {
          type: 'Co-Sponsor',
          id: 'coAlexanderFilter',
          name: 'Yvette Alexander',
          checked: true
        },
        {
          type: 'Co-Sponsor',
          id: 'coAllenFilter',
          name: 'Charles Allen',
          checked: true
        },
        {
          type: 'Co-Sponsor',
          id: 'coBondsFilter',
          name: 'Anita Bonds',
          checked: true
        },
        {
          type: 'Co-Sponsor',
          id: 'coChehFilter',
          name: 'Mary Cheh',
          checked: true
        },
        {
          type: 'Co-Sponsor',
          id: 'coEvansFilter',
          name: 'Jack Evans',
          checked: true
        },
        {
          type: 'Co-Sponsor',
          id: 'coGrossoFilter',
          name: 'David Grosso',
          checked: true
        },
        {
          type: 'Co-Sponsor',
          id: 'coMayFilter',
          name: 'LaRuby May',
          checked: true
        },
        {
          type: 'Co-Sponsor',
          id: 'coMcDuffieFilter',
          name: 'Kenyan McDuffie',
          checked: true
        },
        {
          type: 'Co-Sponsor',
          id: 'coMendelsonFilter',
          name: 'Phil Mendelson',
          checked: true
        },
        {
          type: 'Co-Sponsor',
          id: 'coNadeauFilter',
          name: 'Brianne Nadeau',
          checked: true
        },
        {
          type: 'Co-Sponsor',
          id: 'coOrangeFilter',
          name: 'Vincent Orange',
          checked: true
        },
        {
          type: 'Co-Sponsor',
          id: 'coSilvermanFilter',
          name: 'Elissa Silverman',
          checked: true
        },
        {
          type: 'Co-Sponsor',
          id: 'coToddFilter',
          name: 'Brandon Todd',
          checked: true
        }
      ]
    ]

    this.getType = function(bill){
      var id = bill.$id.split("-");
      switch(id[0]){
        case 'B21':
          type = 'Bill';
          typeId = 1;
          typeDetail = 'Bill';
          break;
        case 'PR21':
          type = 'Resolution';
          typeId = 2;
          typeDetail = 'Resolution';
          break;
        case 'CER21':
          type = 'Resolution';
          typeId = 2;
          typeDetail = 'Ceremonial Resolution';
          break;
        case 'CA21':
          type = 'Contract';
          typeId = 3;
          typeDetail = 'Contract';
          break;
        case 'GBM21':
          type = 'Budget Modification';
          typeId = 4;
          typeDetail = 'Grant Budget Modification';
          break;
        case 'REPROG21':
          type = 'Budget Modification';
          typeId = 4;
          typeDetail = 'Budget Reallocation';
          break;
        case 'HFA21':
          type = 'Budget Modification';
          typeId = 4;
          typeDetail = 'Housing Finance Agency Bond Issuance'
          break;
        case 'AU21':
          type = 'Report';
          typeId = 5;
          typeDetail = 'Audit Report';
          break;
        case 'RC21':
          type = 'Report';
          typeId = 5;
          typeDetail = 'Other Report';
          break;
        case 'IG21':
          type = 'Report';
          typeId = 5;
          typeDetail = 'Inspector General Report';
          break;
        case 'CFO21':
          type = 'Report';
          typeId = 5;
          typeDetail = 'Chief Financial Officer Report';
          break;
        default:
          type = 'Other';
          typeId = 5;
          typeDetail = 'Other';
      }
      angular.extend(bill, {'type': type, 'typeId': typeId, 'typeDetail': typeDetail});
    };


    this.watchFilters = function(bill){
      return (self.activeFilters[0].indexOf(bill.typeId) != -1 &&
      self.activeFilters[1].indexOf(bill.sumStatus) != -1);
    };


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
      // self.filters ++;
      // if(self.filters % 2 == 1){
      //   self.filtersOpen = true;
      // } else {
      //   self.filtersOpen = false;
      // }
    }


  }]);


  app.controller("showBillController", ['$routeParams', '$location','Legislation', 'Vote', function($routeParams, $location, Legislation, Vote){
    this.bill = Legislation.get({$id: $routeParams.id});
    this.bill.$loaded().then(function(bill, $Vote){
      Vote.get(bill);
    });

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
})()
