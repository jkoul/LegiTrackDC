(function() {
  app = angular.module("openlimsControllers",['ngRoute']);
  app.controller("billsController", ['OpenStates', 'Vote', 'Legislation', function(OpenStates, Vote, Legislation){
    this.filters = 0;
    this.filtersOpen = false;
    this.activeFilters = [
      [1,2,3,4,5],
      [1,2,3],
      [203,204,205,206,207,208,209,210,211],
      [230,231,232,233,234,235,236,237,238,239,240,244,245],
      [230,231,232,233,234,235,236,237,238,239,240,244,245]
    ];
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
        },
        {
          type: 'Legislation Type',
          typeId: 2,
          name: 'Resolutions'
        },
        {
          type: 'Legislation Type',
          typeId: 3,
          name: 'Contracts'
        },
        {
          type: 'Legislation Type',
          typeId: 4,
          name: 'Budget Modifications'
        },
        {
          type: 'Legislation Type',
          typeId: 5,
          name: 'Reports'
        }
      ],
      [
        {
          type: 'Legislation Status',
          statusId: 1,
          name: 'Under Council Review'
        },
        {
          type: 'Legislation Status',
          statusId: 2,
          name: 'Enacted'
        },
        {
          type: 'Legislation Status',
          statusId: 3,
          name: 'Other'
        }
      ],
      [
        {
          type: 'Committee Referral',
          committeeId: 204,
          name: 'Committee of the Whole'
        },
        {
          type: 'Committee Referral',
          committeeId: 203,
          name: 'Business, Consumer & Regulatory Affairs'
        },
        {
          type: 'Committee Referral',
          committeeId: 205,
          name: 'Education'
        },
        {
          type: 'Committee Referral',
          committeeId: 206,
          name: 'Finance & Revenue'
        },
        {
          type: 'Committee Referral',
          committeeId: 207,
          name: 'Health & Human Services'
        },
        {
          type: 'Committee Referral',
          committeeId: 208,
          name: 'Housing & Community Development'
        },
        {
          type: 'Committee Referral',
          committeeId: 209,
          name: 'Judiciary'
        },
        {
          type: 'Committee Referral',
          committeeId: 211,
          name: 'Transportation & Environment'
        },
        {
          type: 'Committee Referral',
          committeeId: 210,
          name: 'None'
        }
      ],
      [
        {
          type: 'Sponsor',
          sponsorId: 230,
          name: 'Yvette Alexander'
        },
        {
          type: 'Sponsor',
          sponsorId: 239,
          name: 'Charles Allen'
        },
        {
          type: 'Sponsor',
          sponsorId: 231,
          name: 'Anita Bonds'
        },
        {
          type: 'Sponsor',
          sponsorId: 232,
          name: 'Mary Cheh'
        },
        {
          type: 'Sponsor',
          sponsorId: 233,
          name: 'Jack Evans'
        },
        {
          type: 'Sponsor',
          sponsorId: 234,
          name: 'David Grosso'
        },
        {
          type: 'Sponsor',
          sponsorId: 245,
          name: 'LaRuby May'
        },
        {
          type: 'Sponsor',
          sponsorId: 235,
          name: 'Kenyan McDuffie'
        },
        {
          type: 'Sponsor',
          sponsorId: 237,
          name: 'Phil Mendelson'
        },
        {
          type: 'Sponsor',
          sponsorId: 240,
          name: 'Brianne Nadeau'
        },
        {
          type: 'Sponsor',
          sponsorId: 236,
          name: 'Vincent Orange'
        },
        {
          type: 'Sponsor',
          sponsorId: 238,
          name: 'Elissa Silverman'
        },
        {
          type: 'Sponsor',
          sponsorId: 244,
          name: 'Brandon Todd'
        }
      ],
      [
        {
          type: 'Co-Sponsor',
          cosponsorId: 230,
          name: 'Yvette Alexander'
        },
        {
          type: 'Co-Sponsor',
          cosponsorId: 239,
          name: 'Charles Allen'
        },
        {
          type: 'Co-Sponsor',
          cosponsorId: 231,
          name: 'Anita Bonds'
        },
        {
          type: 'Co-Sponsor',
          cosponsorId: 232,
          name: 'Mary Cheh'
        },
        {
          type: 'Co-Sponsor',
          cosponsorId: 233,
          name: 'Jack Evans'
        },
        {
          type: 'Co-Sponsor',
          cosponsorId: 234,
          name: 'David Grosso'
        },
        {
          type: 'Co-Sponsor',
          cosponsorId: 245,
          name: 'LaRuby May'
        },
        {
          type: 'Co-Sponsor',
          cosponsorId: 235,
          name: 'Kenyan McDuffie'
        },
        {
          type: 'Co-Sponsor',
          cosponsorId: 237,
          name: 'Phil Mendelson'
        },
        {
          type: 'Co-Sponsor',
          cosponsorId: 240,
          name: 'Brianne Nadeau'
        },
        {
          type: 'Co-Sponsor',
          cosponsorId: 236,
          name: 'Vincent Orange'
        },
        {
          type: 'Co-Sponsor',
          cosponsorId: 238,
          name: 'Elissa Silverman'
        },
        {
          type: 'Co-Sponsor',
          cosponsorId: 244,
          name: 'Brandon Todd'
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
      self.activeFilters[1].indexOf(bill.sumStatus) != -1 &&
      self.committeeFilter(bill) == true &&
      self.sponsorFilter(bill) == true)
    };

    this.committeeFilter = function(bill){
      var committee = false;
      angular.forEach(bill.activeCommittees, function(cmte) {
        if(self.activeFilters[2].indexOf(cmte) != -1) {
          committee = true;
        }
      })
      return committee;
    }

    this.sponsorFilter = function(bill){
      var supportBill = false;
      var sponsor = false;
      var cosponsor = false;
      angular.forEach(bill.sponsorIds, function(cm) {
        if(self.activeFilters[3].indexOf(cm) != -1) {
          sponsor = true;
        }
      });
      angular.forEach(bill.cosponsorIds, function(cm) {
        if(self.activeFilters[4].indexOf(cm) != -1) {
          cosponsor = true;
        }
      });
      if(sponsor || cosponsor){
        supportBill = true;
      };
      return supportBill;
    }

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
