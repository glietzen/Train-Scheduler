$(document).ready(function () {
    
    //Initialize Firebase
    var config = {
        apiKey: "AIzaSyC_RsQ2frEGYUoprVaVaG88e-uiBor9fVU",
        authDomain: "train-schedule-5c149.firebaseapp.com",
        databaseURL: "https://train-schedule-5c149.firebaseio.com",
        projectId: "train-schedule-5c149",
        storageBucket: "train-schedule-5c149.appspot.com",
        messagingSenderId: "682965701211"
      };

      firebase.initializeApp(config);

      var database = firebase.database();

      var newRow = '';
      var trainName = '';
      var destination = '';
      var firstDeparture = '';
      var frequency = '';
      var nextArrival = '';
      var minsAway = '';
      var now = moment();

      $('#submitBtn').on('click', function() {
          event.preventDefault();
          trainName = $()
      })



});