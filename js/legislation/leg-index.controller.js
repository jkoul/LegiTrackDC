'use strict';

(function(){
  angular
  .module("legislation")
  .controller("legIndexController", [
    '$location',
    'CurrentLegislation',
    'LimsDetail',
    'Vote',
    'Filters',
    indexCtrlModels
  ])

  function indexCtrlModels (
    $location,
    CurrentLegislation,
    LimsDetail,
    Vote,
    Filters
  ) {
    var self=this;
    this.filters = 0;
    this.filtersOpen = false;
    this.leg = 0;
    this.legOpen = false;
    this.activeFilters = Filters.active();
    this.filterFields = Filters.fields();
    this.all = CurrentLegislation.query()
    this.all.$loaded().then(function(data, $Vote){
      $('.load-note').hide();
      angular.forEach(data, function(bill){
        Vote.get(bill);
        Filters.addToBill(bill);
      })
      return data;
    });

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
    };

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
      $location.path('/' + self.$item.$id);
    }

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
  }

})()
