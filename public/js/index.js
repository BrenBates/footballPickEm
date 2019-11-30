// Get references to page elements
var $exampleText = $("#example-text");
var $exampleDescription = $("#example-description");
var $submitBtn = $("#submit");
var $logInBtn = $("#logIn");
var $logInSubmitBtn = $("#logInSubmit");
var $signUpBtn = $("#signUp");
var $signUpSubmitBtn = $("#submitSignUp");
var $viewTeamsBtn = $("#viewTeams");
var $viewGamesBtn = $("#viewGames");
var $exampleList = $("#example-list");
var loggedInLinks = document.querySelectorAll('.logged-in');
var loggedOutLinks= document.querySelectorAll('.logged-out');


// The API object contains methods for each kind of request we'll make
var API = {
  saveExample: function(example) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/examples",
      data: JSON.stringify(example)
    });
  },
  getExamples: function() {
    return $.ajax({
      url: "api/examples",
      type: "GET"
    });
  },
  deleteExample: function(id) {
    return $.ajax({
      url: "api/examples/" + id,
      type: "DELETE"
    });
  }
};

// refreshExamples gets new examples from the db and repopulates the list
var refreshExamples = function() {
  API.getExamples().then(function(data) {
    var $examples = data.map(function(example) {
      var $a = $("<a>")
        .text(example.text)
        .attr("href", "/example/" + example.id);

      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": example.id
        })
        .append($a);

      var $button = $("<button>")
        .addClass("btn btn-danger float-right delete")
        .text("ｘ");

      $li.append($button);

      return $li;
    });

    $exampleList.empty();
    $exampleList.append($examples);
  });
};

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handleFormSubmit = function(event) {
  event.preventDefault();

  var example = {
    text: $exampleText.val().trim(),
    description: $exampleDescription.val().trim()
  };

  if (!(example.text && example.description)) {
    alert("You must enter an example text and description!");
    return;
  }

  API.saveExample(example).then(function() {
    refreshExamples();
  });

  $exampleText.val("");
  $exampleDescription.val("");
};

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
var handleDeleteBtnClick = function() {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteExample(idToDelete).then(function() {
    refreshExamples();
  });
};

// handleLogIn is called when the login button is clicked.
// This prompts the user with a bootstrap modal for login information to send to the backend.


// On the frontend after the user has received the jwt from /login, save it to sessionStorage by sessionStorage.setItem('jwt', token);

// On the frontend, also add the following:

// if ($window.sessionStorage.token) {
//           xhr.setRequestHeader("Authorization", $window.sessionStorage.token);
//       }

let userToken = null;
var handleLogIn = function(event) {
 
 
  $logInSubmitBtn.on("click", function() {
    event.preventDefault();
    let logInEmail = $('#logInEmail').val().trim();
    let logInPassword = $('#logInPassword').val().trim();
  

    let handShake = {
      email: logInEmail,
      password: logInPassword
    };

     let modal = $('#modalLogIn').modal('hide');
    logInForm.reset();

  $.post("/login", handShake).then( function(response) {
    console.log("log in succcessful");
    userToken = response.token;
    sessionStorage.setItem('jwt', userToken);

    if(userToken !== null) {
      loggedOutLinks.forEach(item => item.style.display = 'none');
      loggedInLinks.forEach(item => item.style.display = 'block');
    }
    
    console.log(userToken);
    
  })
 

 

});

};

// handleSignUp is called when the signUp button is clicked.
// This prompts the user with a bootstrap modal for information for signing up to create a user in the database.
var handleSignUp = function(event) {
  

  $signUpSubmitBtn.on("click", function() {
    event.preventDefault();
    let firstName = $('#signUpFirstName').val().trim();
    let lastName = $('#signUpLastName').val().trim();
    let email = $('#signUpEmail').val().trim();
    let signUpPassword = $('#signUpPassword').val().trim();

    let handShake = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: signUpPassword
    };

    let modal = $('#modalSignUp').modal('hide');
    signUpForm.reset();

    $.post("/register", handShake).then( function(response) {
      console.log("log in succcessful");
      userToken = response.token;
      sessionStorage.setItem('jwt', userToken);
      if(userToken !== null) {
        loggedOutLinks.forEach(item => item.style.display = 'none');
        loggedInLinks.forEach(item => item.style.display = 'block');
      }
     
      console.log(userToken);
    })
   

  });

};

var handleViewTeams = function(event) {
  document.location.href = '/viewteams'
}

handleViewGames = function(event) {
  document.location.href = '/viewgames'
}


window.addEventListener('popstate', function(xhr) {
  xhr.setRequestHeader('Authorization', sessionStorage.getItem('jwt'));
})

// Add event listeners to the buttons
$submitBtn.on("click", handleFormSubmit);
$logInBtn.on("click", handleLogIn);
$signUpBtn.on("click", handleSignUp);
$viewTeamsBtn.on("click", handleViewTeams);
$viewGamesBtn.on("click", handleViewGames);
$exampleList.on("click", ".delete", handleDeleteBtnClick);

