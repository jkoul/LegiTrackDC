(function(){
  var billServices = angular.module('billServices', ['ngResource', 'firebase']);
  billServices.factory('OpenStates', ['$resource', function($resource) {
    return $resource('http://openstates.org/api/v1/bills/?state=dc&search_window=term&fields=bill_id,title,type,sponsors,actions,action_dates,votes,versions&apikey=ef41e9a0f78e43b3b5491ff01138a442/', {});
  }]);
  billServices.factory('OSDetail', ['$resource', function($resource) {
    return $resource('http://openstates.org/api/v1/bills/dc/21/:id' + '&apikey=ef41e9a0f78e43b3b5491ff01138a442/', {});
  }])

  // var connectedRef = new Firebase(firebaseUrl + "/.info/connected");
  //  connectedRef.on("value", function(snapshot) {
  //    if (snapshot.val() === true) {
  //      console.log("Connected to firebase:", firebaseUrl);
  //    } else {
  //      console.log("Not connected to firebase:", firebaseUrl);
  //    }
  //  });
  var firebaseUrl = "https://legitrack.firebaseio.com";
  billServices.factory('Vote', ['$firebaseObject','$firebaseArray', '$routeParams', voteFirebase]);
  function voteFirebase($firebaseObject, $firebaseArray, $routeParams) {
    var votesRef = new Firebase(firebaseUrl + "/votes");
    var billVotes = $firebaseArray(votesRef);
    var billVote = {
      query: function(){return billVotes;},
      get: function(bill, cb) {
        var found = $firebaseObject(votesRef.child(bill.$id));
        if(typeof cb == "function") cb(found);
        if(!found) {
          found = {
            supporting: 0,
            opposing: 0
          };
          votesRef.child(bill.$id).set(found);
        }
        votesRef.child(bill.$id).on('value', function(snapshot) {
          bill.score = snapshot.val();
        });
        bill.score = found;
      },
      save: function(bill){
        var score = {
          opposing: bill.score.opposing,
          supporting: bill.score.supporting
        };
        votesRef.child(bill.$id).set(score);
      }
    };
    return billVote;
  }

  billServices.factory('Legislation', ['$firebaseObject','$firebaseArray', '$routeParams', runUpdate]);
  function runUpdate($firebaseObject, $firebaseArray, $routeParams) {
    var legRef = new Firebase(firebaseUrl + "/legislation");
    var legDetails = $firebaseArray(legRef);
    var legDetail = {
      query: function() {return legDetails;},
      get: function(bill) {
        var found = $firebaseObject(legRef.child(bill.$id));
        // function(bill) {
        //   return leg.$id === bill.Legislation[0].Title;
        // });
        // if(!found) {
        //   found = bill;
        //   legRef.child(bill.Legislation[0].Title).set(found);
        // };
        // legRef.child(bill.Legislation[0].Title).on('value', function(snapshot) {
        //   bill.detail = snapshot.val();
        // })
        return found;
      },
      save: function(bill) {
        var detail = {
          // set parameters for each bill based on LIMS data
        }
        if(bill.Legislation){
          legRef.child(bill.Legislation[0].Title).set(bill);
        } else {
          legRef.child(bill.id).set(bill);
        }
      }
    }
    return legDetail;
  };

  billServices.factory('OpenLims', ['$resource', function($resource) {
    return $resource('https://openlims.herokuapp.com/measure/:id', {});
  }]);
})()
