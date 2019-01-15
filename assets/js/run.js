// vars
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

//objects

//functions

//ajax

$("#search").click(function(){
  //collect from input fields
  var firstName=$("#firstName").val().trim();
  var lastName=$("#lastName").val().trim();
  var beverage=$("#beverage").val();
  var email=$("#email").val().trim();
  var url;
  var articles[];
  function buildUrl(){
    //create a local variable that holds the URL and adds on the params to the end
    url="https://api.nytimes.com/svc/search/v2/articlesearch.json";
    url += '?' + $.param({

      'api-key': "QT2IYsO2LMMcCRoL4SGG0XibUZHr8cps",

    beverage , //input from the form ID,
      20180101, //YYYYMMDD //date input ID
      20190101
    });

  }

  // create AJAX 'GET' call to collect articles
function newsQuery(){
  $.ajax({
  url: url,
  method: 'GET',
}).done(function(result) {
  console.log(result);

  //create an array of the first five NYTIMES articles with this term
  for(var i=0; i<5; i++){
    //loop through the first five articles and add to the array
    articles.push(result.docs.url);
  }
  //create text of the email body

  var str;

  //

  }
}).fail(function(err) {
  throw err;
});
}
  // Create a 'message' variable that is the text content of the email

  // create seperate AJAX 'POST' to send email

});

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
  