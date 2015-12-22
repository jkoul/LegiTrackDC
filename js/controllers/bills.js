(function() {
  app = angular.module("openlimsControllers",['ngRoute']);
  app.controller("billsController", ['$location', '$uibModal', 'OpenStates', 'Vote', 'Legislation', function($location, $uibModal, OpenStates, Vote, Legislation){
    this.filters = 0;
    this.filtersOpen = false;
    this.leg = 0;
    this.legOpen = false;
    this.activeFilters = [
      [1,2,3,4,5],
      [100,110,120],
      [203,204,205,206,207,208,209,210,211],
      [230,231,232,233,234,235,236,237,238,239,240,244,245, 0],
      [230,231,232,233,234,235,236,237,238,239,240,244,245]
    ];
    var self=this
    this.all = Legislation.query();
        this.all.$loaded().then(function($response, $Vote){
          angular.forEach($response, function(b, $Vote){
            angular.extend(b, {'sponsorIds': b.filters[3]});
            angular.extend(b, {'cosponsorIds': b.filters[4]});
            $('.load-note').hide();
            Vote.get(b);
          });
          console.log($response);
          return $response;
        });

    this.filterFields = [
      { name: 'Legislation Type',
        activeField: 0,
        values: [
        {
          Id: 1,
          name: 'Bills',
        },
        {
          Id: 2,
          name: 'Resolutions'
        },
        {
          Id: 3,
          name: 'Contracts'
        },
        {
          Id: 4,
          name: 'Budget Modifications'
        },
        {
          Id: 5,
          name: 'Reports'
        }
      ]},
      { name: 'Status',
        activeField: 1,
        values: [
        {
          Id: 100,
          name: 'Under Council Review'
        },
        {
          Id: 110,
          name: 'Enacted'
        },
        {
          Id: 120,
          name: 'Other'
        }
      ]},
      { name: 'Committee Referral',
        activeField: 2,
        values: [
        {
          Id: 204,
          name: 'Committee of the Whole'
        },
        {
          Id: 203,
          name: 'Business, Consumer & Reg. Affairs'
        },
        {
          Id: 205,
          name: 'Education'
        },
        {
          Id: 206,
          name: 'Finance & Revenue'
        },
        {
          Id: 207,
          name: 'Health & Human Services'
        },
        {
          Id: 208,
          name: 'Housing & Community Development'
        },
        {
          Id: 209,
          name: 'Judiciary'
        },
        {
          Id: 211,
          name: 'Transportation & Environment'
        },
        {
          Id: 210,
          name: 'None'
        }
      ]},
      { name: 'Sponsor/CoSponsor',
        activeField: 3,
        values: [
        [
        {
          Id: 230,
          name: 'Yvette Alexander'
        },
        {
          Id: 239,
          name: 'Charles Allen'
        },
        {
          Id: 231,
          name: 'Anita Bonds'
        },
        {
          Id: 232,
          name: 'Mary Cheh'
        },
        {
          Id: 233,
          name: 'Jack Evans'
        },
        {
          Id: 234,
          name: 'David Grosso'
        },
        {
          Id: 245,
          name: 'LaRuby May'
        },
        {
          Id: 235,
          name: 'Kenyan McDuffie'
        },
        {
          Id: 237,
          name: 'Phil Mendelson'
        },
        {
          Id: 240,
          name: 'Brianne Nadeau'
        },
        {
          Id: 236,
          name: 'Vincent Orange'
        },
        {
          Id: 238,
          name: 'Elissa Silverman'
        },
        {
          Id: 244,
          name: 'Brandon Todd'
        },
        {
          Id: 0,
          name: 'No Sponsor'
        }
      ],
      [
        {
          Id: 230,
          name: 'Yvette Alexander'
        },
        {
          Id: 239,
          name: 'Charles Allen'
        },
        {
          Id: 231,
          name: 'Anita Bonds'
        },
        {
          Id: 232,
          name: 'Mary Cheh'
        },
        {
          Id: 233,
          name: 'Jack Evans'
        },
        {
          Id: 234,
          name: 'David Grosso'
        },
        {
          Id: 245,
          name: 'LaRuby May'
        },
        {
          Id: 235,
          name: 'Kenyan McDuffie'
        },
        {
          Id: 237,
          name: 'Phil Mendelson'
        },
        {
          Id: 240,
          name: 'Brianne Nadeau'
        },
        {
          Id: 236,
          name: 'Vincent Orange'
        },
        {
          Id: 238,
          name: 'Elissa Silverman'
        },
        {
          Id: 244,
          name: 'Brandon Todd'
        }
      ]
      ]}
    ]


    this.watchFilters = function(bill){
      return (self.activeFilters[0].indexOf(bill.filters[0]) != -1 &&
      self.activeFilters[1].indexOf(bill.filters[1]) != -1 &&
      self.committeeFilter(bill) == true &&
      self.sponsorFilter(bill) == true)
    };

    this.committeeFilter = function(bill){
      var committee = false;
      angular.forEach(bill.filters[2], function(cmte) {
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
      angular.forEach(bill.filters[3], function(cm) {
        if(self.activeFilters[3].indexOf(cm) != -1) {
          sponsor = true;
        }
      });
      angular.forEach(bill.filters[4], function(cm) {
        if(self.activeFilters[4].indexOf(cm) != -1) {
          cosponsor = true;
        }
      });
      if(sponsor || cosponsor){
        supportBill = true;
      };
      return supportBill;
    }

    this.resetFilters = function (){
      self.activeFilters = [
        [1,2,3,4,5],
        [100,110,120],
        [203,204,205,206,207,208,209,210,211],
        [230,231,232,233,234,235,236,237,238,239,240,244,245, 0],
        [230,231,232,233,234,235,236,237,238,239,240,244,245]
      ];
    }


    this.toggleFilters = function(){
      $('.filters').toggleClass('ng-hide');
      self.filters ++;
      if(self.filters % 2 == 1){
        self.filtersOpen = true;
      } else {
        self.filtersOpen = false;
      }
    }

    this.toggleLeg = function(){
      $('.bills-container').toggleClass('ng-hide');
      self.leg ++;
      if(self.leg % 2 == 1){
        self.legOpen = true;
      } else {
        self.legOpen = false;
      }
    }

    this.toggleAll = function(){
      self.toggleFilters();
      self.toggleLeg();
    }

    this.searchResult = function($item) {
      self.$item = $item;
      $location.path('/bills/' + self.$item.$id);
    }

    this.showModal = false;
    this.toggleModal = function(){
      $('.modal').toggleClass('ng-hide');
        // self.showModal = !self.showModal;
    };

    this.setCategory = function(filter, item) {
      event.preventDefault();
      self.resetFilters();
      self.activeFilters[filter.activeField] = [item.Id];
      if(!(self.legOpen)){
        self.toggleLeg();
      }
    }

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

    this.updateUrl = function(){
      var type = null;
      var status = null;
      var committee = null;
      var sponsor = null;
      var cosponsor = null;
      console.log(self.activeFilters[0])
      if (self.activeFilters[0] == [] || self.activeFilters[0] == [1,2,3,4,5]) {
        type = null;
      } else {
        type = self.activeFilters[0];
      };
      console.log(self.activeFilters[1])
      if(self.activeFilters[1] == [] || self.activeFilters[1] == [100,110,120]) {
        status = null;
      } else {
        status = self.activeFilters[1];
      };
      console.log(self.activeFilters[2])
      if(self.activeFilters[2] == [] || self.activeFilters[2] == [203,204,205,206,207,208,209,210,211]) {
        committee = null;
      } else {
        committee = self.activeFilters[2];
      };
      console.log(self.activeFilters[3])
      if(self.activeFilters[3] == [] || self.activeFilters[3] == [230,231,232,233,234,235,236,237,238,239,240,244,245, 0]) {
        sponsor = null;
      } else {
        sponsor = self.activeFilters[3];
      };
      console.log(self.activeFilters[4])
      if(self.activeFilters[4] == [] || self.activeFilters[4] == [230,231,232,233,234,235,236,237,238,239,240,244,245]) {
        cosponsor = null;
      } else {
        cosponsor = self.activeFilters[4];
      };
      $location.search({'type': type, 'status': status, 'committee': committee, 'sponsor': sponsor, 'cosponsor': cosponsor});
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

    // this.getBill = function(e){
    //   e.preventDefault();
    //
    // }
  }]);
})()
