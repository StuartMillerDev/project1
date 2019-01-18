
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
console.log(database);
var articles=[];
var response1;
//ADDING ITEM TO DATABASE ON CLICK
$("#go").click(function(){
  event.preventDefault();
  var fN=$("#first_name").val().trim();
  var lN=$("#last_name").val().trim();
  var data = {
      firstName:fN,
      lastName:lN,
      articles: articles,
      nutritionInfo:nutritiionInfo,
      beverageInfo:$("#beverage_menu option:selected").text()
    }
    // console.log("CURRENT ITEM IN DATABASE: ", database.ref().val())
    if(fN!=null && fN!="" && lN!=null && lN!=""){
      getNews(term);
      database.ref().push(data);
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
articlesArray.forEach(function(index){
  var article=articlesArray[index];
  var card=$("<div class='card center-align'>");
  var cardAction=$("<div class='card-action'>");
  var link=$("<a href='" + article.web_url + "'> LINK TO ARTICLE</a>");
  var content=$("<p class='text-center'>");
  content.append(article.headline.print_headline);
  cardAction.append(link);
  card.append(content,cardAction);
});

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
