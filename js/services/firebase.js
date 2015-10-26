(function(){
  var firebaseUrl = "https://legitrack.firebaseio.com";
  var connectedRef = new Firebase(firebaseUrl + "/.info/connected");
   connectedRef.on("value", function(snapshot) {
     if (snapshot.val() === true) {
       console.log("Connected to firebase:", firebaseUrl);
     } else {
       console.log("Not connected to firebase:", firebaseUrl);
     }
   });

   var firebaseServices = angular.module('firebaseServices', ['ngResource', 'firebase']);
   firebaseServices.factory('Firebase', ['$firebaseObject','$firebaseArray', '$routeParams', voteFirebase]);

   function voteFirebase($firebaseObject, $firebaseArray, $routeParams) {
     var firebaseUrl = "https://legitrack.firebaseio.com";
     var connectedRef = new Firebase(firebaseUrl + "/.info/connected");

     var legRef = new Firebase(firebaseUrl + "/legislation");
     var legislation = $firebaseArray(legRef);
     var billDetail = {
       query: function(){return legislation;},
       get: function(bill) {
         var found = legislation.find(function())
          return bill.$id === bill.bill_id;
       }
     }

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
         votesRef.child(bill.bill_id).on('value', function(snapshot){
           bill.score = snapshot.val();
         });
         bill.score = found;
       },
       save: function(bill){
         var score = {
           opposing: bill.score.opposing,
           supporting: bill.score.supporting
         };
         votesRef.child(bill.bill_id).set(score)
       }
     }
       return billVote;
   }
})()
