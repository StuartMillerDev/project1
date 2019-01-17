
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


function buildQuery(amount, size, food) {
  return amount + "%20" + size + "%20" + food;
}

function getBeverageInfo() {
  $.ajax({
    method: "GET",
    url: "https://trackapi.nutritionix.com/v2/search/instant?query=1%20red%20bull&detailed=true&claims=true",
    headers: {
      'content-type': 'application/json',
      'x-app-id' : 'd0025a85',
      'x-app-key' : '423e3a386b4a6b7c4ad3eebfea0fa4b9',
      'x-remote-user-id' : '0'
    }
  }).done(function(response) {
    console.log(response);
  }).fail(function(err){
    //Log Error
    console.log("Error: " + err);
  });
}

function getNutritionInfo() {
  $.ajax({
    method: "POST",
    url: "https://trackapi.nutritionix.com/v2/natural/nutrients",
    crossDomain : true,
    data : '{"query":"20 fl oz bottles of sprite", "num_servings": 1, "locale":"en_US"}',
    headers : {
      'content-type': 'application/json',
      'x-app-id' : 'd0025a85',
      'x-app-key' : '423e3a386b4a6b7c4ad3eebfea0fa4b9',
      'x-remote-user-id' : '0'
    }
  }).done(function(response) {
    console.log(response);
  }).fail(function(err){
    //Log Error
    console.log("Error: " + err);
  });
}
getBeverageInfo();
getNutritionInfo();
