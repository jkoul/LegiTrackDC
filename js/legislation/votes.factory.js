'use strict';

(function(){
  angular
  .module("legislation")

  .factory('Vote', [
    '$firebaseObject',
    '$firebaseArray',
    voteFirebase
  ])

  // .controller('voteCtrl',[
  //   '$firebaseObject', function($firebaseObject, $scope){
  //     this.billVotes = function(bill, $scope){
  //       var id = bill.Legislation.LegislationNumber;
  //       var votesRef = new Firebase("https://legitrack.firebaseio.com/votes");
  //       var score = $firebaseObject(votesRef.child(id));
  //         score.$bindTo($scope, id + '.score');
  //     }
  //   }
  // ]);

  function voteFirebase($firebaseObject, $firebaseArray, $routeParams) {
    var votesRef = new Firebase("https://legitrack.firebaseio.com/votes");
    var billVotes = $firebaseArray(votesRef);
    var billVote = {
      query: function(){return billVotes;},
      get: function(bill, cb) {
        var id = bill.Legislation.LegislationNumber;
        var found = $firebaseObject(votesRef.child(id));
        if(found.$id == id) {
          votesRef.child(id).on('value', function(snapshot) {
            bill.score = snapshot.val();
          });
        } else {
          console.log("not found")
          bill.score = {
            supporting: 0,
            opposing: 0
          };
          votesRef.child(id).set(bill.score);
        }

        bill.score = found;
      },
      save: function(bill){
        var id = bill.Legislation.LegislationNumber;
        var score = {
          opposing: bill.score.opposing,
          supporting: bill.score.supporting
        };
        votesRef.child(id).set(score);
      }
    };
    return billVote;
  }

})()
