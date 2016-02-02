'use strict';

(function(){
  angular
  .module('legislation')
  .controller("legShowController",[
    'LimsDetail',
    'Vote',
    '$stateParams',
    showCtrlFunction
  ])

  function showCtrlFunction(LimsDetail, Vote, $stateParams){
    var self=this;
    this.bill = LimsDetail.get({id: $stateParams.id});
    this.bill.$promise.then(function(bill, $Vote){
      Vote.get(bill);
    })
  }

})()
