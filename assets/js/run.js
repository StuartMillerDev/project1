
// Initialize Firebase
var config = {
  apiKey: "AIzaSyDDFI02BH-xPlcQLthj4B62xmwN_VKBQok",
  authDomain: "project1-5b839.firebaseapp.com",
  databaseURL: "https://project1-5b839.firebaseio.com",
  projectId: "project1-5b839",
  storageBucket: "project1-5b839.appspot.com",
  messagingSenderId: "616696108809"
};
firebase.initializeApp(config);
//reference to the database
database= firebase.database();


function getNews(term){
  //using cors-anywhere to get around cors errors
var queryURL = "https://cors-anywhere.herokuapp.com/https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=QT2IYsO2LMMcCRoL4SGG0XibUZHr8cps&q=beverage+"+term+"&limit=5";
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    console.log(response);

    //update the webpage
  });
}


var nutritionInfo;

function getNutritionInfo() {
  var queryString = beverage;
  var amount = 1;

  $.ajax({
    method: "POST",
    url: "https://trackapi.nutritionix.com/v2/natural/nutrients",
    crossDomain : true,
    data : `{"query":"${queryString}", "num_servings":"${amount}", "locale":"en_US"}`,
    headers : {
      'content-type': 'application/json',
      'x-app-id' : 'd0025a85',
      'x-app-key' : '423e3a386b4a6b7c4ad3eebfea0fa4b9',
      'x-remote-user-id' : '0'
    }
  }).done(function(response) {
    console.log(response);
    nutritionInfo = response.foods;
  }).fail(function(err){
    //Log Error
    console.log("Error: " + err);
  });
}

document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('select');
  var instances = M.FormSelect.init(elems, {});
});

var firstName = $('#first_name').val();
var lastName = $('#last_name').val();
var email = $('#email').val();
var beverage = $('#beverage_menu option:selected').val();

$(document).on('change', function() {
  firstName = $('#first_name').val();
  lastName = $('#last_name').val();
  email = $('#email').val();
  beverage = $('#beverage_menu option:selected').text();

  getNutritionInfo(); 
});
