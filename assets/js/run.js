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
  function buildUrl(){
    //create a local variable that holds the URL and adds on the params to the end
    url="https://api.nytimes.com/svc/search/v2/articlesearch.json";
    url += '?' + $.param({

      'api-key': "b9f91d369ff59547cd47b931d8cbc56b:0:74623931",

    beverage , //input from the form ID,
      20180101, //YYYYMMDD //date input ID
      20190101
    });

  }

  // create AJAX 'GET' call to collect articles

  // Create a 'message' variable that is the text content of the email

  // create seperate AJAX 'POST' to send email

});
