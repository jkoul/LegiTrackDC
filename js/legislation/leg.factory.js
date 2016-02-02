'use strict';

(function(){
  angular
  .module("legislation")

  .factory('CurrentLegislation', [
    '$firebaseObject',
    '$firebaseArray',
    getCurrentLeg
  ])

  .factory('LimsDetail', [
    '$resource',
    getLegDetail
  ])

  .factory('Filters', function(){
    return {
      active: function(){
        return [
          [1,2,3,4,5],
          [100,110,120],
          [203,204,205,206,207,208,209,210,211],
          [230,231,232,233,234,235,236,237,238,239,240,244,245, 0],
          [230,231,232,233,234,235,236,237,238,239,240,244,245]
        ]
      },
      fields: function(){
        var filterFields = [
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
              name: 'Ceremonial Resolutions'
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
            }
            // ,
            // {
            //   Id: 0,
            //   name: 'No Sponsor'
            // }
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
        ];
        return filterFields;
      },
      addToBill: function(bill){
        var filters = [];
        switch(bill.Legislation.Category){
          case "Bill":
            filters.push(1);
            break;
          case "Resolution":
            if(bill.Legislation.Subcategory == "Ceremonial Resolution"){
              filters.push(5);
            } else {
              filters.push(2);
            };
            break;
          case "Contract":
            filters.push(3);
            break;
          default:
            filters.push(4);
        };
        switch(bill.Legislation.LegislationStatus){
          case "Any status":
            filters.push(100);
            break;
          case "New":
            filters.push(100);
            break;
          case "Under Council Review":
            filters.push(100);
            break;
          case "Under Mayoral Review":
            filters.push(120);
            break;
          case "Enacted":
            filters.push(110);
            break;
          case "Under Congressional Review":
            filters.push(120);
            break;
          case "Vetoed":
            filters.push(120);
            break;
          case "Deemed Approved":
            filters.push(110);
            break;
          case "Deemed Disapproved":
            filters.push(120);
            break;
          case "Approved":
            filters.push(110);
            break;
          case "Deemed Disapproved":
            filters.push(120);
            break;
          case "Official Law":
            filters.push(110);
            break;
          case "Withdrawn":
            filters.push(120);
            break;
          default:
            filters.push(120);
        };
        var committees = [
          {Id: 203, name: "Business, Consumer, and Regulatory Affairs"},
          {Id: 204, name: "Committee of the Whole"},
          {Id: 205, name: "Education"},
          {Id: 206, name: "Finance and Revenue"},
          {Id: 207, name: "Health and Human Services"},
          {Id: 208, name: "Housing and Community Development"},
          {Id: 209, name: "Judiciary"},
          {Id: 210, name: "Retained by the Council"},
          {Id: 211, name: "Transportation and the Environment"}
        ];
        var activeCommittees = [];
        angular.forEach(committees, function(cm){
          if(bill.Legislation.CommitteeReferral.indexOf(cm.name) != -1 ||
          bill.Legislation.CommitteeReferralComments.indexOf(cm.name) != -1) {
            activeCommittees.push(cm.Id);
          }
        });
        filters.push(activeCommittees);
        var councilmembers = [
          {Id: 230, name: 'Alexander'},
          {Id: 239, name: 'Allen'},
          {Id: 231, name: 'Bonds'},
          {Id: 232, name: 'Cheh'},
          {Id: 233, name: 'Evans'},
          {Id: 234, name: 'Grosso'},
          {Id: 245, name: 'May'},
          {Id: 235, name: 'McDuffie'},
          {Id: 237, name: 'Mendelson'},
          {Id: 240, name: 'Nadeau'},
          {Id: 236, name: 'Orange'},
          {Id: 238, name: 'Silverman'},
          {Id: 244, name: 'Todd'},
          {Id: 0, name: 'No Sponsor'}
        ];
        var sponsors = [];
        angular.forEach(councilmembers, function(cm){
          if(bill.Legislation.Introducer.indexOf(cm.name) != -1){
            sponsors.push(cm.Id);
          };
        });
        filters.push(sponsors);
        var cosponsors = [];
        angular.forEach(councilmembers, function(cm){
          if(bill.Legislation.CoSponsor){
            if(bill.Legislation.CoSponsor.indexOf(cm.name) != -1){
              cosponsors.push(cm.Id);
            };
          };
        });
        filters.push(cosponsors);
        angular.extend(bill,{'filters': filters, 'sponsorIds': sponsors, 'cosponsorIds': cosponsors});
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
