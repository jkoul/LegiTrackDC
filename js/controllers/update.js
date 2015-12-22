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
            var data = $response.data;
            angular.extend(bill, {'type': 'Bill', 'typeDetail': 'Bill'});

            data.Legislation[0].IntroductionDate = Date.parse(data.Legislation[0].IntroductionDate);
            data.Legislation[0].Modified = Date.parse(data.Legislation[0].Modified);
            angular.extend(data, {'Modified': data.Legislation[0].Modified})
            data.Legislation[0].Introducer = JSON.parse(data.Legislation[0].Introducer);
            if(data.Legislation[0].CoSponsor){
              data.Legislation[0].CoSponsor = JSON.parse(data.Legislation[0].CoSponsor);
            }
            angular.extend(data, {'ShortTitle': data.Legislation[0].ShortTitle});
            data.Legislation[0].CommitteeReferral = JSON.parse(data.Legislation[0].CommitteeReferral);
            if(data.Legislation[0].CommitteeReferralComments){
              data.Legislation[0].CommitteeReferralComments = JSON.parse(data.Legislation[0].CommitteeReferralComments);
            }

            self.addBillFilters(data);

            data.Legislation[0].AttachmentPath = JSON.parse(data.Legislation[0].AttachmentPath);
            data.Legislation[0].MemoLink = JSON.parse(data.Legislation[0].MemoLink);

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

          self.addOtherFilters(bill);

          var billDetail = {}
          angular.extend(billDetail, {
            'id': bill.bill_id,
            'ShortTitle': bill.title,
            'IntroductionDate': bill.action_dates.first,
            'Modified': bill.action_dates.last,
            'CommitteeReferral': bill.committees,
            'typeDetail': bill.typeDetail,
            'Introducer': bill.legSponsors,
            'CoSponsor': bill.legCoSponsors,
            'Attachments': bill.versions,
            'filters': bill.filters
          })
          console.log(billDetail);
          Legislation.save(billDetail);
        }
      })
        // return billObject;
    });

    this.addBillFilters = function(data){
      var filters = [];
      filters.push(1);
      switch(data.Legislation[0].LegislationStatus) {
        case 0:
          status = "Any status";
          sumStatus = 100;
          break;
        case 10:
          status = "New";
          sumStatus = 100;
          break;
        case 40:
          status = "Under Council Review";
          sumStatus = 100;
          break;
        case 50:
          status = "Under Mayoral Review";
          sumStatus = 120;
          break;
        case 60:
          status = "Enacted";
          sumStatus = 110;
          break;
        case 70:
          status = "Under Congressional Review";
          sumStatus = 120;
          break;
        case 80:
          status = "Vetoed";
          sumStatus = 120;
          break;
        case 90:
          status = "Deemed Approved";
          sumStatus = 110;
          break;
        case 100:
          status = "Deemed Disapproved";
          sumStatus = 120;
          break;
        case 110:
          status = "Approved";
          sumStatus = 110;
          break;
        case 120:
          status = "Disapproved";
          sumStatus = 120;
          break;
        case 130:
          status = "Official Law";
          sumStatus = 110;
          break;
        case 140:
          status = "Withdrawn";
          sumStatus = 120;
          break;
        default:
          status = "None";
          sumStatus = 120;
      }
      data.Legislation[0].LegislationStatus = status;
      filters.push(sumStatus);

      var activeCommittees = [];
      if(data.Legislation[0].CommitteeReferral[0]){
        angular.forEach(data.Legislation[0].CommitteeReferral, function(cmte) {
          activeCommittees.push(cmte.Id);
        })
      } else {
        activeCommittees.push(210);
      };
      filters.push(activeCommittees);

      var sponsorIds = [];
      angular.forEach(data.Legislation[0].Introducer, function(cm) {
        sponsorIds.push(cm.Id);
      })
      filters.push(sponsorIds);

      var cosponsorIds = [];
      if(data.Legislation[0].CoSponsor){
        angular.forEach(data.Legislation[0].CoSponsor, function(cm) {
          cosponsorIds.push(cm.Id);
        })
      }
      filters.push(cosponsorIds);

      angular.extend(data, {'filters': filters})
    }


    this.addOtherFilters = function(bill) {
      var filters = [];
      var id = bill.bill_id.split("-");
      switch(id[0]){
        case 'B21':
          type = 'Bill';
          typeId = 1;
          typeDetail = 'Bill';
          break;
        case 'PR21':
          type = 'Resolution';
          typeId = 2;
          typeDetail = 'Resolution';
          break;
        case 'CER21':
          type = 'Resolution';
          typeId = 2;
          typeDetail = 'Ceremonial Resolution';
          break;
        case 'CA21':
          type = 'Contract';
          typeId = 3;
          typeDetail = 'Contract';
          break;
        case 'GBM21':
          type = 'Budget Modification';
          typeId = 4;
          typeDetail = 'Grant Budget Modification';
          break;
        case 'REPROG21':
          type = 'Budget Modification';
          typeId = 4;
          typeDetail = 'Budget Reallocation';
          break;
        case 'HFA21':
          type = 'Budget Modification';
          typeId = 4;
          typeDetail = 'Housing Finance Agency Bond Issuance'
          break;
        case 'AU21':
          type = 'Report';
          typeId = 5;
          typeDetail = 'Audit Report';
          break;
        case 'RC21':
          type = 'Report';
          typeId = 5;
          typeDetail = 'Other Report';
          break;
        case 'IG21':
          type = 'Report';
          typeId = 5;
          typeDetail = 'Inspector General Report';
          break;
        case 'CFO21':
          type = 'Report';
          typeId = 5;
          typeDetail = 'Chief Financial Officer Report';
          break;
        default:
          type = 'Other';
          typeId = 5;
          typeDetail = 'Other';
      }
      filters.push(typeId);
      angular.extend(bill, {'type': type, 'typeDetail': typeDetail});

      var sumStatus = 0;
      if(bill.bill_id.indexOf('PR') == 0){
        if(bill.versions[0]){
          var keepGoing = true;
          sumStatus = 100;
          angular.forEach(bill.versions, function(doc){
            if(keepGoing){
              if(doc.name == "Enrollment"){
                sumStatus = 110;
                keepGoing = false;
              }
            }
          })
        } else {
          sumStatus = 120;
        };
      } else {
        sumStatus = 120;
      };
      filters.push(sumStatus);

      var committees = [];
      activeCommittees = [];
      if(bill.actions[0]){
        if(bill.actions[0].related_entities) {
          if(bill.actions[0].related_entities[0]) {
            angular.forEach(bill.actions[0].related_entities, function(comm){
              switch (comm.name) {
                case 'Business, Consumer, and Regulatory Affairs':
                  activeCommittees.push(203);
                  break;
                case 'Committee of the Whole':
                  activeCommittees.push(204);
                  break;
                case 'Education':
                  activeCommittees.push(205);
                  break;
                case 'Finance and Revenue':
                  activeCommittees.push(206);
                  break;
                case 'Health and Human Services':
                  activeCommittees.push(207);
                  break;
                case 'Housing and Community Development':
                  activeCommittees.push(208);
                  break;
                case 'Judiciary':
                  activeCommittees.push(209);
                  break;
                case 'Retained':
                  activeCommittees.push(210);
                  break;
                case 'Transportation and the Environment':
                  activeCommittees.push(211);
                  break;
                default:
                  activeCommittees.push(210);
              }
              committees.push({'Name': comm.name});
            })
          } else {
            activeCommittees.push(210);
          }
        } else {
          activeCommittees.push(210);
        }
      } else {
        activeCommittees.push(210);
      };
      angular.extend(bill, {'committees': committees});
      filters.push(activeCommittees);

      var sponsors = [];
      var sponsorIds = [];
      var cosponsors = [];
      var cosponsorIds = [];
      angular.forEach(bill.sponsors, function(cm){
        switch(cm.name){
          case "Yvette Alexander":
            sponsorId = 230;
            break;
          case "Anita Bonds":
            sponsorId = 231;
            break;
          case "Mary Cheh":
            sponsorId = 232;
            break;
          case "Jack Evans":
            sponsorId = 233;
            break;
          case "David Grosso":
            sponsorId = 234;
            break;
          case "Kenyan McDuffie":
            sponsorId = 235;
            break;
          case "Vincent Orange":
            sponsorId = 236;
            break;
          case "Phil Mendelson":
            sponsorId = 237;
            break;
          case "Elissa Silverman":
            sponsorId = 238;
            break;
          case "Charles Allen":
            sponsorId = 239;
            break;
          case "Brianne Nadeau":
            sponsorId = 240;
            break;
          case "Brandon Todd":
            sponsorId = 244;
            break;
          case "LaRuby May":
            sponsorId = 245;
            break;
          default:
            sponsorId = 0;
        };
        angular.extend(cm, {'sponsorId': sponsorId});
        if(cm.type = "primary"){
          sponsors.push({'Name': cm.name})
          sponsorIds.push(cm.sponsorId);
        } else {
          cosponsors.push({'Name': cm.name})
          cosponsorIds.push(cm.cosponsorId);
        }
      });
      angular.extend(bill, {'legSponsors': sponsors, 'legCoSponsors': cosponsors})
      filters.push(sponsorIds);
      filters.push(cosponsorIds);
      angular.extend(bill, {'filters': filters})
    };



  }])
})()
