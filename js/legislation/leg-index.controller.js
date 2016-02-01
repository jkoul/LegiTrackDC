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
    this.all = CurrentLegislation.query()
    this.all.$loaded().then(function(data, $Vote){
      $('.load-note').hide();
      angular.forEach(data, function(bill){
        Vote.get(bill);
      })
      return data;
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
  }

})()
