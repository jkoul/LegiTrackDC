(function(){
  app = angular.module("openlimsControllers",['ngRoute']);
  app.controller('updateBillDataToFirebase',['OpenStates', 'OpenLims', 'Legislation', function(Bill, OpenLims, Legislation){
    this.bills = OpenStates.query();
    var billNums = [];
    var self=this;
    self.bills.$promise.then(function($response, $OpenLims, $Legislation){
      var billData = $response;
      angular.forEach(billData, function(bill){
        if(bill.bill_id.indexOf('B') == 0) {
          bill.bill_id = bill.bill_id.replace(/\s/g, '');
          billNums.push(bill.bill_id);
        };
      });
      var billObject = [];
      angular.forEach(billNums, function(Id, $OpenLims, $Legislation){
        self.openLimsCall = OpenLims.get({id: Id});
        self.openLimsCall.$promise.then(function($response, $Legislation){
          var data = $response.data
          data.Legislation[0].IntroductionDate = Date.parse(data.Legislation[0].IntroductionDate);
          data.Legislation[0].Modified = Date.parse(data.Legislation[0].Modified);
          data.Legislation[0].Introducer = JSON.parse(data.Legislation[0].Introducer);
          if(data.Legislation[0].CoSponsor){
            data.Legislation[0].CoSponsor = JSON.parse(data.Legislation[0].CoSponsor);
          }
          data.Legislation[0].CommitteeReferral = JSON.parse(data.Legislation[0].CommitteeReferral);
          data.Legislation[0].AttachmentPath = JSON.parse(data.Legislation[0].AttachmentPath);
          data.Legislation[0].MemoLink = JSON.parse(data.Legislation[0].MemoLink);
          switch(data.Legislation[0].LegislationStatus) {
            case 0:
              status = "Any status";
              break;
            case 10:
              status = "New";
              break;
            case 40:
              status = "Under Council Review";
              break;
            case 50:
              status = "Under Mayoral Review";
              break;
            case 60:
              status = "Enacted";
              break;
            case 70:
              status = "Under Congressional Review";
              break;
            case 80:
              status = "Vetoed";
              break;
            case 90:
              status = "Deemed Approved";
              break;
            case 100:
              status = "Deemed Disapproved";
              break;
            case 110:
              status = "Approved";
              break;
            case 120:
              status = "Disapproved";
              break;
            case 130:
              status = "Official Law";
              break;
            case 140:
              status = "Withdrawn";
              break;
            default:
              status = "None";
          }
          data.Legislation[0].LegislationStatus = status;
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
//all other changes to returned LIMS data go here
          Legislation.save(data);
          billObject.push(data);

        })
        return billObject;
      });
      self.billDetail = billObject;
    })

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

  }])
})()
