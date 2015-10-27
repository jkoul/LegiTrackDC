(function(){
  var billServices = angular.module('billServices', ['ngResource', 'firebase']);

  // TODO : move to another filter
  billServices.filter('cleanWhitespace', function(){
    return function(value) {
      return (!value) ? '' : value.replace(/ /g, '');
    }
  });

  billServices.factory('Bill', ['$resource', function($resource) {
    return $resource('http://openstates.org/api/v1/bills/?state=dc&search_window=term&fields=bill_id,title,sponsors,actions,action_dates&apikey=ef41e9a0f78e43b3b5491ff01138a442/', {});
  }]);

    // var connectedRef = new Firebase(firebaseUrl + "/.info/connected");
    //  connectedRef.on("value", function(snapshot) {
    //    if (snapshot.val() === true) {
    //      console.log("Connected to firebase:", firebaseUrl);
    //    } else {
    //      console.log("Not connected to firebase:", firebaseUrl);
    //    }
    //  });

    billServices.factory('Vote', ['$firebaseObject','$firebaseArray', '$routeParams', voteFirebase]);
    function voteFirebase($firebaseObject, $firebaseArray, $routeParams) {
      var firebaseUrl = "https://legitrack.firebaseio.com";
      var votesRef = new Firebase(firebaseUrl + "/votes");
      var billVotes = $firebaseArray(votesRef);
      var billVote = {
        query: function(){return billVotes;},
        get: function(bill) {
          var found = billVotes.find(function(vote){
            return vote.$id === bill.bill_id;
          });
          if(!found) {
            found = {
              supporting: 0,
              opposing: 0
            };
            votesRef.child(bill.bill_id).set(found);
          }
          votesRef.child(bill.bill_id).on('value', function(snapshot) {
            bill.score = snapshot.val();
          })
          bill.score = found;
        },
        save: function(bill){
          var score = {
            supporting: bill.score.supporting,
            opposing: bill.score.opposing
          };
          votesRef.child(bill.bill_id).set(score);
        }
      };
      return billVote;
    }
})()
