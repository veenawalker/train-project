



  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCVYKVf8PPMG1BiIdr9dcLADovS-Q7y6Q0",
    authDomain: "hello-a8352.firebaseapp.com",
    databaseURL: "https://hello-a8352.firebaseio.com",
    projectId: "hello-a8352",
    storageBucket: "hello-a8352.appspot.com",
    // messagingSenderId: "95746225235"
  }

  
  firebase.initializeApp(config);

  var database = firebase.database();



//Button for adding Trains

$( "#trainform" ).on("click", function() {
console.log("click button");
  


 	
  // Grabs user input
  var trainName = $("#train-input").val().trim();
  var destinationName = $("#destination-input").val().trim();
  var timeStart = moment($("#time-input").val().trim(), "HH:mm").format("X");
  var frequencyRate = $("#frequency-input").val().trim();





    // Create object holding train data
    var newTrain = {
        name: trainName,
        destination: destinationName,
        start: timeStart,
        frequency: frequencyRate
    };
    database.ref().push(newTrain);

    console.log(newTrain.name);
      console.log(newTrain.destination);
      console.log(newTrain.start);
      console.log(newTrain.frequency);

      return false;
  });
      // Firebase watcher + initial loader HINT: This code behaves similarly to .on("value")
      database.ref().on("child_added", function(childSnapshot,prevChildKey) {
      
        // Log everything that's coming out of snapshot
        console.log(childSnapshot.val());
        
      
        var trainName = childSnapshot.val().name;
        var destinationName = childSnapshot.val().destination;
        var timeStart = childSnapshot.val().start;
        var frequencyRate = childSnapshot.val().frequency;

        var firstTimeConverted = moment(timeStart, "HH:mm").subtract(1, "years");
        console.log(firstTimeConverted);
    
        // Current Time
        var currentTime = moment();
        console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
    
        // Difference between the times
        var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
        console.log("DIFFERENCE IN TIME: " + diffTime);
    
        // Time apart (remainder)
        var tRemainder = diffTime % frequencyRate;
        console.log(tRemainder);
    
        // Minute Until Train
        var tMinutesTillTrain = frequencyRate - tRemainder;
        console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
    
        // Next Train
        var nextTrain = moment().add(tMinutesTillTrain, "minutes");
        console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
        var formattedTime = moment(nextTrain).format("HH:mm");
    

        // full list of items to the well
        $("#table-list > tbody").append("<tr><td>" + trainName + "</td><td>" + destinationName + "</td><td>" + frequencyRate + "</td><td>" + formattedTime + "</td><td>" + tMinutesTillTrain + "</td></tr>");


       
      });
  


// Upload train data to the database


//clear out the text-boxes

//adding an event to firebase and row in the table

//adding moment.js 
 // First Time (pushed back 1 year to make sure it comes before current time)
		// This is arbitrary to just make sure our first train time is in the past
   
  