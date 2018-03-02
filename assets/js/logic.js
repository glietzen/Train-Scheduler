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

    $('#submitBtn').on('click', function () {
        event.preventDefault();
        trainName = $('#nameInput').val().trim();
        destination = $('#destinationInput').val().trim();
        firstDeparture = $('#firstDepartureInput').val().trim();
        frequency = $('#frequencyInput').val().trim();
        //   console.log('Train Name: ' + trainName + ' / Destination: ' + destination + ' / First Departure: ' + firstDeparture + ' / Frequency: ' + frequency);


        database.ref('/train-schedule').push({
            trainName: trainName,
            destination: destination,
            firstDeparture: firstDeparture,
            frequency: frequency
        });

    });

    database.ref('/train-schedule').on('child_added', function (snapshot) {
        var sv = snapshot.val();

        var initialTimeConverted = moment(sv.firstDeparture, "hh:mm").subtract(1, "years");
        console.log(initialTimeConverted);

        var currentTime = moment();
        console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

        var diffTime = moment().diff(moment(initialTimeConverted), "minutes");
        console.log("DIFFERENCE IN TIME: " + diffTime);

        var timeRemainder = diffTime % sv.frequency;
        console.log("TIME REMAINDER = " + timeRemainder);

        minsAway = sv.frequency - timeRemainder;
        console.log("MINUTES UNTIL NEXT TRAIN: " + minsAway);

        arrival = moment().add(minsAway, "minutes");
        // arrival = moment(arrival).format("hh:mm");
        console.log("ARRIVAL TIME: " + moment(arrival).format("hh:mm"));

        var row = $('<tr>');
        row.append($('<td>' + sv.trainName + '</td>'));
        row.append($('<td>' + sv.destination + '</td>'));
        row.append($('<td>' + sv.firstDeparture + '</td>'));
        row.append($('<td>' + sv.frequency + '</td>'));
        row.append($('<td>' + moment(arrival).format('hh:mm') + '</td>'));
        row.append($('<td>' + minsAway + '</td>'));

        console.log(row);

        $('.table').append(row);

    })



});