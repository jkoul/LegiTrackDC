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

    var firebaseUrl = "https://legitrack.firebaseio.com";
    var connectedRef = new Firebase(firebaseUrl + "/.info/connected");
     connectedRef.on("value", function(snapshot) {
       if (snapshot.val() === true) {
         console.log("Connected to firebase:", firebaseUrl);
       } else {
         console.log("Not connected to firebase:", firebaseUrl);
       }
     });

    billServices.factory('Vote', ['$firebaseObject','$firebaseArray', '$routeParams', voteFirebase]);
    function voteFirebase($firebaseObject, $firebaseArray, $routeParams) {
      var votesRef = new Firebase(firebaseUrl + "/votes");
      var billVotes = $firebaseArray(votesRef);
      var billVote = {
        query: function(){return billVotes;},
        get: function(score, callback) {
          var found = $firebaseObject(votesRef.child(score.$bill_id));
          if(typeof callback == "function") {
            callback(found);
            return found;
          } else {
            score.save();
          }
        },
        save: function(score, callback){
          var score = {
            supporting: 0,
            opposing: 0
          };
          billVotes.$add(score).then(function(ref) {
            score.$bill_id = $routeParams.bill_id;
            callback(score);
          })
        }
      }
    }
})()
