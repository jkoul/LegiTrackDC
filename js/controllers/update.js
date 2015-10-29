(function(){
  app = angular.module("openlimsControllers",['ngRoute']);
  app.controller('updateBillDataToFirebase',['Bill', 'OpenLims', function(Bill, OpenLims){
    this.bills = Bill.query();
    this.billDetail = []
    var billNums = [];
    var self=this;
    self.bills.$promise.then(function($response, $OpenLims){
      var billData = $response;
      angular.forEach(billData, function(bill){
        if(bill.bill_id.indexOf('B') == 0) {
          bill.bill_id = bill.bill_id.replace(/\s/g, '');
          billNums.push(bill.bill_id);
        };
      })
      var billObject = []
        angular.forEach(billNums, function(Id, $OpenLims){
          self.openLimsCall = OpenLims.get({id: Id});
          self.openLimsCall.$promise.then(function($response){
            $response.data.Legislation[0].IntroductionDate = new Date($response.data.Legislation[0].IntroductionDate);
            $response.data.Legislation[0].Modified = new Date($response.data.Legislation[0].Modified);
            $response.data.Legislation[0].Introducer = JSON.parse($response.data.Legislation[0].Introducer);
            if($response.data.Legislation[0].CoSponsor){
              $response.data.Legislation[0].CoSponsor = JSON.parse($response.data.Legislation[0].CoSponsor);
            }
            $response.data.Legislation[0].CommitteeReferral = JSON.parse($response.data.Legislation[0].CommitteeReferral);
            $response.data.Legislation[0].AttachmentPath = JSON.parse($response.data.Legislation[0].AttachmentPath);
            $response.data.Legislation[0].MemoLink = JSON.parse($response.data.Legislation[0].MemoLink);
            switch($response.data.Legislation[0].LegislationStatus) {
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
            $response.data.Legislation[0].LegislationStatus = status

//all other changes to returned LIMS data go here

            billObject.push($response.data);
          })
          return billObject;
        })
      self.billDetail = billObject
      return self.billDetail;
    })




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
