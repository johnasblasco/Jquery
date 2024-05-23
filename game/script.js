"use strict";

// bindings
// const to hold question and answer data
const mycards = [
  {
    question: "What is 2 + 2",
    answers: [ 0, 4, 2, 1, 5],
    correct: 2
  },
  {
    question: "console.log(2 + '2' - 1);",
    answers: [ "22", "21", "1", "ERROR"],
    correct: 1
  },
  {
    question: "What language use for designing a pages",
    answers: [ "HTML", "CSS", "JAVASCRIPT" ],
    correct: 1
  },
  {
    question: "Example of Programming Language",
    answers: [ "HTML", "XML", "JS", "Bootstrap"],
    correct: 2
  },
  {
    question: "Example of Framework",
    answers: [ "Node", "React", "Jquery", "Express"],
    correct: 3
  }

];

// variable to hold question number
var qn = 0;

// on load
// loads the first question
showQuestion();

// jQuery UI
  $( "#tabs" ).tabs();


// functions

/* function to pull info from data model and populate user choice options and question info. */
function showQuestion() {
  $('#counter').text( qn + 1);
  $('#question').text( mycards[qn].question );
  $('#answers').empty();
  $( "#progressbar" ).progressbar({
      value: (qn*25)
    });
  for ( let index in mycards[qn].answers ) {
    var button = $("<span>");
    button.text( mycards[qn].answers[index] );
    button.data ('choice', index);
    $('#answers').append( button );
    button.draggable();
/*    button.click(
      function() {
        checkAnswer(index);
      }
    ); not needed w/ drag and drop */
  }

// drop zone that activates on drop to trigger checkAnswer() */
  $("#drophere").droppable (
  {
    drop: function(event, ui) {
      var uselect = ui.draggable.data('choice');
      checkAnswer(uselect);
    }
  }
  );
}

/* compare user selection to the correct answer listed under mycards based on the turn aka qn, while also clearing the area a message won't be displayed */
function checkAnswer(uanswer) {
  if ( uanswer == mycards[qn].correct ) {
    $('#wrong').empty();
    $('#right').text("Correct!");
    nextQuestion();
  } else {
    $('#wrong').text("Wrong!");
    $('#right').empty();
  }
}


/* compare number of items in array to turns taken and decide whether to procede or show end-of-game screen */
function nextQuestion() {
  qn++;
  if ( qn < mycards.length ) {
    showQuestion();
  } else {
    updateXML();
    setTimeout(function(){
      window.location.href = '../home.html';
   }, 5000);
    $('body').html("<div id='game-over'><h2>Thanks for playing!</h2><br><p>The game will automatically reset in 5 seconds...</p></div>")
  }
}

function updateXML() {
  // Retrieve the logged-in username from local storage
  var loggedInUser = localStorage.getItem('loggedInUser');

  // Create a new XMLHttpRequest object
  var xhr = new XMLHttpRequest();

  // Define the request type, URL, and asynchronous flag
  xhr.open("GET", "../data.xml", true);

  // Set the response type
  xhr.responseType = "document";


}
function updateXML() {
  // Retrieve the logged-in username from local storage
  var loggedInUser = localStorage.getItem('loggedInUser');
  console.log("Logged-in User:", loggedInUser);

  // Create a new XMLHttpRequest object
  var xhr = new XMLHttpRequest();

  // Define the request type, URL, and asynchronous flag
  xhr.open("GET", "../data.xml", true);

  // Set the response type
  xhr.responseType = "document";

  // Define the onload event handler
  xhr.onload = function() {
    // Check if the request was successful
    if (xhr.status === 200) {
      // Access the XML document
      var xml = xhr.responseXML;
      console.log("XML Document:", xml);

      // Loop through each user
      var users = xml.getElementsByTagName("user");
      for (var i = 0; i < users.length; i++) {
        var user = users[i];
        // Update score and gamesPlayed for the logged-in user
        var username = user.getElementsByTagName("username")[0].textContent;
        console.log("Username:", username);
        if (username === loggedInUser) {
          // Increment score by 5 and gamesPlayed by 1
          var score = parseInt(user.getElementsByTagName("score")[0].textContent) + 5;
          var gamesPlayed = parseInt(user.getElementsByTagName("gamesPlayed")[0].textContent) + 1;

          // Update the XML data
          user.getElementsByTagName("score")[0].textContent = score;
          user.getElementsByTagName("gamesPlayed")[0].textContent = gamesPlayed;

          console.log("Updated Score:", score);
          console.log("Updated Games Played:", gamesPlayed);
        }
      }

      // Log the updated XML data
      console.log("Updated XML:", new XMLSerializer().serializeToString(xml));
    } else {
      console.error("Error fetching XML data:", xhr.statusText);
    }
  };

  // Define the onerror event handler
  xhr.onerror = function() {
    console.error("Error fetching XML data:", xhr.statusText);
  };

  // Send the GET request to fetch the XML data
  xhr.send();
}



