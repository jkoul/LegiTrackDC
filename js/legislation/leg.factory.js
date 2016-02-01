'use strict';

(function(){
  angular
  .module("legislation")

  .factory('CurrentLegislation', [
    '$firebaseObject',
    '$firebaseArray',
    // 'Vote',
    getCurrentLeg
  ])

  .factory('LimsDetail', [
    '$resource',
    getLegDetail
  ])

  .factory('Filters', function(){
    return {
      query: function(){
        return [
          // filter fields here
        ]
      }
    }
  });

  var firebaseUrl = "https://legitrack.firebaseio.com/legislation";
  function getCurrentLeg($firebaseObject, $firebaseArray){
    var legRef = new Firebase(firebaseUrl + "/CouncilPeriod21");
    var legQuery = $firebaseArray(legRef);
    var legService = {
      query: function(){
        // legRef.on('value', function(snapshot, $Vote){
        //   angular.forEach(snapshot.val(), function(bill, $Vote){
        //     Vote.get(bill);
        //     // console.log(bill);
        //   });
        //   return snapshot;
        // });
        // console.log(legQuery);
        return legQuery;
      },
      typeQuery: function(type){
        var typeBills = $firebaseObject(legRef.child(type));
        var all = [];
        typeBills.$loaded().then(function(snapshot){
          console.log(snapshot.val());
          angular.forEach(snapshot, function(bill){
            all.push(bill);
          })
        })
        return all;
      },
      get: function(bill){

      }
    }
    return legService;
  }



  function getLegDetail($resource){
    return $resource('http://lims.dccouncil.us/api/v1/Legislation/Details/:id', {})
  }

})()
