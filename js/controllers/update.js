(function(){
  app = angular.module("openlimsControllers",['ngRoute']);
  app.controller('updateBillDataToFirebase',['OpenStates', 'OpenLims', 'Legislation', function(OpenStates, OpenLims, Legislation, OSDetail){
    this.bills = OpenStates.query();
    var billNums = [];
    var self=this;
    self.bills.$promise.then(function($response, $OpenLims, $Legislation){
      var billData = $response;
      angular.forEach(billData, function(bill){
        if(bill.bill_id.indexOf('B') == 0) {
          bill.bill_id = bill.bill_id.replace(/\s/g, '');
          self.openLimsCall = OpenLims.get({id: bill.bill_id});
          self.openLimsCall.$promise.then(function($response, $Legislation){
            var data = $response.data
            data.Legislation[0].IntroductionDate = Date.parse(data.Legislation[0].IntroductionDate);
            data.Legislation[0].Modified = Date.parse(data.Legislation[0].Modified);
            angular.extend(data, {'Modified': data.Legislation[0].Modified})
            data.Legislation[0].Introducer = JSON.parse(data.Legislation[0].Introducer);
            if(data.Legislation[0].CoSponsor){
              data.Legislation[0].CoSponsor = JSON.parse(data.Legislation[0].CoSponsor);
            }
            data.Legislation[0].CommitteeReferral = JSON.parse(data.Legislation[0].CommitteeReferral);
            if(data.Legislation[0].CommitteeReferralComments){
              data.Legislation[0].CommitteeReferralComments = JSON.parse(data.Legislation[0].CommitteeReferralComments);
            }
            var activeCommittees = [];
            if(data.Legislation[0].CommitteeReferral[0]){
              angular.forEach(data.Legislation[0].CommitteeReferral, function(cmte) {
                activeCommittees.push(cmte.Id);
              })
            } else {
              activeCommittees.push(210);
            };
            angular.extend(data, {'activeCommittees': activeCommittees});

            data.Legislation[0].AttachmentPath = JSON.parse(data.Legislation[0].AttachmentPath);
            data.Legislation[0].MemoLink = JSON.parse(data.Legislation[0].MemoLink);
            switch(data.Legislation[0].LegislationStatus) {
              case 0:
                status = "Any status";
                sumStatus = 3;
                break;
              case 10:
                status = "New";
                sumStatus = 1;
                break;
              case 40:
                status = "Under Council Review";
                sumStatus = 1;
                break;
              case 50:
                status = "Under Mayoral Review";
                sumStatus = 3;
                break;
              case 60:
                status = "Enacted";
                sumStatus = 2;
                break;
              case 70:
                status = "Under Congressional Review";
                sumStatus = 3;
                break;
              case 80:
                status = "Vetoed";
                sumStatus = 3;
                break;
              case 90:
                status = "Deemed Approved";
                sumStatus = 2;
                break;
              case 100:
                status = "Deemed Disapproved";
                sumStatus = 3;
                break;
              case 110:
                status = "Approved";
                sumStatus = 2;
                break;
              case 120:
                status = "Disapproved";
                sumStatus = 3;
                break;
              case 130:
                status = "Official Law";
                sumStatus = 2;
                break;
              case 140:
                status = "Withdrawn";
                sumStatus = 3;
                break;
              default:
                status = "None";
                sumStatus = 3;
            }
            data.Legislation[0].LegislationStatus = status;
            data.sumStatus = sumStatus;
            if(data.Hearing[0]){
              if(data.Hearing[0].HearingDate){
                data.Hearing[0].HearingDate = Date.parse(data.Hearing[0].HearingDate);
              };
              if(data.Hearing[0].HearingDetails){
                data.Hearing[0].HearingDetails += "&embed=1&player_width=480&player_height=360&auto_start=0";
              };
              if (data.Hearing[0].AttachmentPath){
                data.Hearing[0].AttachmentPath = JSON.parse(data.Hearing[0].AttachmentPath);
              }
            }
            if(data.ComiteeMarkup[0]){
              data.ComiteeMarkup[0].Vote = JSON.parse(data.ComiteeMarkup[0].Vote);
              if(data.ComiteeMarkup[0].VideoLink){
                data.ComiteeMarkup[0].VideoLink += "&embed=1&player_width=480&player_height=360&auto_start=0";
              };
              if(data.ComiteeMarkup[0].ActionDate){
                data.ComiteeMarkup[0].ActionDate = Date.parse(data.ComiteeMarkup[0].ActionDate);
              };
              if(data.ComiteeMarkup[0].AttachmentPath){
                data.ComiteeMarkup[0].AttachmentPath = JSON.parse(data.ComiteeMarkup[0].AttachmentPath);
              };
              if(data.ComiteeMarkup[0].ReportDate){
                data.ComiteeMarkup[0].ReportDate = Date.parse(data.ComiteeMarkup[0].ReportDate);
              };
            }
            if(data.VotingSummary[0]){
              angular.forEach(data.VotingSummary, function(vote){
                vote.DateOfVote = Date.parse(vote.DateOfVote);
                if(vote.VideoLink){
                  vote.VideoLink += "&embed=1&player_width=480&player_height=360&auto_start=0";
                };
                if(vote.AttachmentPath){
                  vote.AttachmentPath = JSON.parse(vote.AttachmentPath);
                };
                vote.MemberVotes = JSON.parse(vote.MemberVotes);
                angular.forEach(vote.MemberVotes, function(cm){
                  switch(cm.MemberId){
                    case 230:
                      name = "Yvette Alexander";
                      break;
                    case 231:
                      name = "Anita Bonds";
                      break;
                    case 232:
                      name = "Mary Cheh";
                      break;
                    case 233:
                      name = "Jack Evans";
                      break;
                    case 234:
                      name = "David Grosso";
                      break;
                    case 235:
                      name = "Kenyan McDuffie";
                      break;
                    case 236:
                      name = "Vincent Orange";
                      break;
                    case 237:
                      name = "Phil Mendelson";
                      break;
                    case 238:
                      name = "Elissa Silverman";
                      break;
                    case 239:
                      name = "Charles Allen";
                      break;
                    case 240:
                      name = "Brianne Nadeau";
                      break;
                    case 244:
                      name = "Brandon Todd";
                      break;
                    case 245:
                      name = "LaRuby May";
                      break;
                    default:
                      name = "";
                  };
                  switch(cm.Vote){
                    case "1":
                      vote = "Yes";
                      break;
                    case "2":
                      vote = "No";
                      break;
                    case "3":
                      vote = "Absent";
                      break;
                    default:
                      vote = "Other";
                  };
                  cm.Vote = vote;
                  angular.extend(cm, {'Name': name});
                });
              });
            }
            if(data.MayorReview[0]){
              if(data.MayorReview[0].EnactedDate){
                data.MayorReview[0].EnactedDate = Date.parse(data.MayorReview[0].EnactedDate);
              }
              if(data.MayorReview[0].AttachmentPath){
                data.MayorReview[0].AttachmentPath = JSON.parse(data.MayorReview[0].AttachmentPath);
              }
            }
            if(data.CongressReview[0]){
              if(data.CongressReview[0].LawEffectiveDate){
                data.CongressReview[0].LawEffectiveDate = Date.parse(data.CongressReview[0].LawEffectiveDate)
              }
            }
            if(data.OtherDocuments[0]){
              if(data.OtherDocuments[0].AttachmentPath){
                data.OtherDocuments[0].AttachmentPath = JSON.parse(data.OtherDocuments[0].AttachmentPath);
              }
            }
  //all other changes to returned LIMS data go here
            Legislation.save(data);
            // billObject.push(data);

          })
        } else {
          bill.bill_id = bill.bill_id.replace(/\s/g, '');
          if(bill.action_dates.first) {
            bill.action_dates.first = Date.parse(bill.action_dates.first);
          } else {
            bill.action_dates.first = 0;
          }
          if(bill.action_dates.last) {
            bill.action_dates.last = Date.parse(bill.action_dates.last);
          } else {
            bill.action_dates.last = 0;
          }
          var sponsors = []
          var cosponsors = []
          angular.forEach(bill.sponsors, function(cm){
            if(cm.type = "primary"){
              sponsors.push({'Name': cm.name})
            } else {
              cosponsors.push({'Name': cm.name})
            }
          });
          var committees = [];
          bill.activeCommittees = [];
          if(bill.actions[0]){
            if(bill.actions[0].related_entities) {
              if(bill.actions[0].related_entities[0]) {
                angular.forEach(bill.actions[0].related_entities, function(comm){
                  switch (comm.name) {
                    case 'Business, Consumer, and Regulatory Affairs':
                      bill.activeCommittees.push(203);
                      break;
                    case 'Committee of the Whole':
                      bill.activeCommittees.push(204);
                      break;
                    case 'Education':
                      bill.activeCommittees.push(205);
                      break;
                    case 'Finance and Revenue':
                      bill.activeCommittees.push(206);
                      break;
                    case 'Health and Human Services':
                      bill.activeCommittees.push(207);
                      break;
                    case 'Housing and Community Development':
                      bill.activeCommittees.push(208);
                      break;
                    case 'Judiciary':
                      bill.activeCommittees.push(209);
                      break;
                    case 'Retained':
                      bill.activeCommittees.push(210);
                      break;
                    case 'Transportation and the Environment':
                      bill.activeCommittees.push(211);
                      break;
                    default:
                      bill.activeCommittees.push(210);
                  }
                  committees.push({'Name': comm.name});
                })
              } else {
                bill.activeCommittees.push(210);
              }
            } else {
              bill.activeCommittees.push(210);
            }
          } else {
            bill.activeCommittees.push(210);
          };
          if(bill.bill_id.indexOf('PR') == 0){
            if(bill.versions[0]){
              var keepGoing = true;
              bill.sumStatus = 1;
              angular.forEach(bill.versions, function(doc){
                if(keepGoing){
                  if(doc.name == "Enrollment"){
                    bill.sumStatus = 2;
                    keepGoing = false;
                  }
                }
              })
            } else {
              bill.sumStatus = 3;
            };
          } else {
            bill.sumStatus = 3;
          };
          var billDetail = {}
          angular.extend(billDetail, {
            'id': bill.bill_id,
            'ShortTitle': bill.title,
            'IntroductionDate': bill.action_dates.first,
            'Modified': bill.action_dates.last,
            'CommitteeReferral': committees,
            'Introducer': sponsors,
            'CoSponsor': cosponsors,
            'Attachments': bill.versions,
            'sumStatus': bill.sumStatus,
            'activeCommittees': bill.activeCommittees
          })
          console.log(billDetail);
          Legislation.save(billDetail);
        }
      })
        // return billObject;
    });
  }])
})()
      // self.billDetail = billObject;

    // save data to Firebase
    // angular.forEach(self.billDetail, function(bill, $Legislation){
    //   // bill.$id = bill.Legislation[0].Title;
    //   console.log(bill.$id);
    //   self.firebase = Legislation.get(bill);
    //   self.detail.$promise.then(function($response, bill){
    //     if(bill.Legislation[0].Modified !== $response.Legislation[0].Modified){
    //     }
    //   })
    // });

      // OpenLims.get(Id).then(function($response){
      //   console.log($response);
      //   var bill = {
      //     Id: Id,
      //     Title:  $response.data.Legislation.ShortTitle
      //   }
      // });
      // console.log(bill);

    // this.bill.limsData = OpenLims.get(Id);
    // var x = this
    // angular.forEach(
    //   x.limsData
    //
    // this.toFirebase = function(billNums)
    //   angular.forEach(billNums, function(Id){
    //     Legislation.get(Id);
    //   })

    // switch(cmte.Id) {
    //   case 203:
    //     committeeId = 2;
    //     break;
    //   case 204:
    //     committeeId = 1;
    //     break;
    //   case 205:
    //     committeeId = 3;
    //     break;
    //   case 206:
    //     committeeId = 4;
    //     break;
    //   case 207:
    //     committeeId = 5;
    //     break;
    //   case 208:
    //     committeeId = 6;
    //     break;
    //   case 209:
    //     committeeId = 7;
    //     break;
    //   case 210:
    //     committeeId = 9;
    //     break;
    //   case 211:
    //     committeeId = 8;
    //     break;
    //   default:
    //     committeeId = 9;
    // }
