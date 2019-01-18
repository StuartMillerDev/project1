
// Initialize Firebase
console.log('test');
var config = {
  apiKey: "AIzaSyAUCTGTZIqljA6nJSs00N27qOKOsb_NqI4",
  authDomain: "devhealth-327da.firebaseapp.com",
  databaseURL: "https://devhealth-327da.firebaseio.com",
  projectId: "devhealth-327da",
  storageBucket: "devhealth-327da.appspot.com",
  messagingSenderId: "515627963428"
};
firebase.initializeApp(config);
//reference to the database
database= firebase.database();
console.log("database: ",database);
var articles=[];
var response1;
//ADDING ITEM TO DATABASE ON CLICK
$("#go").click(function(){
  console.log("CLICKED GO");
  event.preventDefault();
  var fN=$("#first_name").val().trim();
  var lN=$("#last_name").val().trim();
  var data = {
      firstName:fN,
      lastName:lN,
      articles: articles,
      nutritionInfo:nutritionInfo,
      beverageInfo:$("#beverage_menu option:selected").text()
    }
    // console.log("CURRENT ITEM IN DATABASE: ", database.ref().val())
    if(fN!=null && fN!="" && lN!=null && lN!=""){
      // getNews(); need to run this method with a term
      console.log($("#beverage_menu option:selected").text());
      database.ref().set(data);
      // console.log("Pushing data to the database: ", database.ref().val())
    }
    else{
      // error message
      console.log("Input fields are null or empty")
    }
});



//ITEM ADDED TO DATABASE
database.ref().on("child_added", function(childSnapshot) {
//refill the page with articles
var articlesArray = childSnapshot.val().articles;
var nutritionStuff=childSnapshot.val().nutritionInfo;
var firstName=childSnapshot.val().firstName;
var lastName=childSnapshot.val().lastName;
var div=$("<div class='container'>");
if(!articlesArray){
  for(var i=0; i<5; i++){
    console.log(articlesArray);
    var article=articlesArray[i];
    var card=$("<div class='card center-align'>");
    var cardAction=$("<div class='card-action'>");
    var link=$("<a href='" + article.web_url + "'> LINK TO ARTICLE</a>");
    var content=$("<p class='text-center'>");
    content.append(article.headline.print_headline);
    cardAction.append(link);
    card.append(content,cardAction);
  }


}


div.append(card);
div.append("<br>");
$("#resultsHere").append(div);
});

// COLLECTING NYTIMES DATA
function getNews(term){
  //using cors-anywhere to get around cors errors
var queryURL = "https://cors-anywhere.herokuapp.com/https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=QT2IYsO2LMMcCRoL4SGG0XibUZHr8cps&q=beverage+"+term+"&limit=5";
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    console.log(response);
response1=response;
var newsObject=response;
for(var i=0; i<5; i++){
      articles.push(article);
    }
  });
}


//BUILDS QUERY FOR NUTRITION/BEVERAGE QUERY
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
    nutritionInfo = response;
  }).fail(function(err){
    //Log Error
    console.log("Error: " + err);
  });
}


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

$("input").click(function(){
  var selection=$("input:checked").val();
  console.log("DRINK: ",selection);
});


//
// $("#dropdown1").click(function(){
//   getNews(this.value);
// });


// <div class="slider">
//   <ul class="slides">
//     <li>
//       <img src="assets/images/coke2.jpg"> <!-- random image -->
//       <!--Add text to slider images???-->
//       <div class="caption right-align">
//         <h3 class="black-text"></h3>
//         <h5 class="light black-text text-lighten-3"></h5>
//       </div>
//     </li>
//     <li>
//       <img src="assets/images/monster.jpg"> <!-- random image -->
//       <div class="caption left-align">
//         <h3></h3>
//         <h5 class="light grey-text text-lighten-3"></h5>
//       </div>
//     </li>
//     <li>
//       <img src="assets/images/mountainDew2.jpg"> <!-- random image -->
//       <div class="caption right-align">
//         <h3></h3>
//         <h5 class="light grey-text text-lighten-3"></h5>
//       </div>
//     </li>
//     <li>
//       <img src="assets/images/redbull.jpg"> <!-- random image -->
//       <div class="caption center-align">
//         <h3></h3>
//         <h5 class="light grey-text text-lighten-3"></h5>
//       </div>
//     </li>
//   </ul>
// </div>
