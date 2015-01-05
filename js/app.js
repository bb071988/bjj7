
var myKey = "AIzaSyAvY8gw_9m9K4kfUbASjxJWcgzVjkwImcQ";


var technique ="";

var tokenArray = new Array();  // keep track of the page tokens in this array

tokenIndex = 0;

$('.search')

    .on('click', function(){

        $('#response').empty();

        technique = $('input').val();
        if (technique != '') {

           // alert('technique to search is ' + technique)
            onClientLoad();
            
            $('input').val(''); // clear the value from the field
        }

        else {alert('Technique cannot be blank');}

        

    });  // end on click function ;


$('.next')

    .on('click', function(){

    //spage = response.nextPageToken;
    //alert('page is set to ' + page);
    $('#response').empty();

    
    var curToken = getToken('N');

    search(curToken);  // modify to pass the curToken

    

    });  // end on click function 

$('.prev')

    .on('click', function(){

    //spage = response.nextPageToken;
    //alert('page is set to ' + page);
    $('#response').empty();

    //alert('prev page-a ' + page[a]);

    var curToken = getToken('P');

    search(curToken);  // modify to pass the curToken

    

    });  // end on click function 




// Called automatically when JavaScript client library is loaded.
// step 1. Load the javascript client library.
	function onClientLoad() {

        if(technique)
        {	
        gapi.client.load('youtube', 'v3', onYouTubeApiLoad); 
            }   
        else {
            return;
            };   
        };

    //}

// Called automatically when YouTube API interface is loaded (see line 9).
//step 2.  Reference the API key
function onYouTubeApiLoad() {

    gapi.client.setApiKey(myKey); //my api key here

    //alert('onyoutube api ' + page[a]);

    curToken = 'blank'

    search(curToken);
    
}

function search(curToken) {

    //console.log('in search function looking for page[a]' + page[a]);
    //console.log('in search function looking for page[a-1]' + page[a-1]);

    if (curToken == 'blank') // WILL NEED TO CHANGE BASED ON NEW GET PAGETOKEN FUNCTION
    {

    // Use the JavaScript client library to create a search.list() API call.
    var request = gapi.client.youtube.search.list({
        dataType: "JSONP",
        part: 'id, snippet',
        maxResults: '10',
        order: 'viewCount',
        q: technique,
        regionCode: 'US',
       

    });

    }

    else {

        //alert('in the else and page[a] is'+ page[a])

    // Use the JavaScript client library to create a search.list() API call.
    var request = gapi.client.youtube.search.list({
        dataType: "JSONP",
        //pageToken: page[a],
        pageToken: curToken,
        part: 'id, snippet',
        maxResults: '10',
        order: 'viewCount',
        q: technique,
        regionCode: 'US',
       

    });

    };  
        

    request.execute(onSearchResponse);
}

// Called automatically with the response of the YouTube API request.
function onSearchResponse(response) {
	//alert('onsearchresponse' + response.nextPageToken);
    nextPage = response.nextPageToken;

    
    //page[a] = response.nextPageToken;
    //alert('adding next page token to array page[a] is ' + page[a] + ' nextPageToken is ' + response.nextPageToken);
   // page.push(response.nextPageToken);
    //console.log('in onSearchResponse looking for whats in page array' + page);

    
    showResponse(response);
}

// Helper function to display JavaScript value on HTML page.
function showResponse(response) {
   //alert('in showresponse'); 
   //alert('next page token ' + response.nextPageToken);

   //var pResponse = JSON.parse(response);
   
  var sResponse = JSON.stringify(response, '', 2);
  console.log(sResponse);
   //$.each(response.items, function(i, items) {

    //https://www.youtube.com/watch?v=3PqQGdjb_bk
    //<a href="http://www.w3schools.com">Visit W3Schools.com!</a>
     
    $(".page").css("display","inline-block");
    for (i = 0; i< response.items.length; i++)
        {
            var link = response.items[i].id.videoId
            var title = response.items[i].snippet.title;

            var description = response.items[i].snippet.description;

            if (! description) {
                description = "No description provided by You Tube";

            }

          //  if (i< 3){console.log('<a href="http://www.youtube.com/watch?v=' + link +'">' + "</a>")};
        $('#response').append('<dt>' + '<a href="http://www.youtube.com/watch?v=' + link +'" target="_blank">' + title + "</a>" + '<dt>');
        //$('#response').append('<dt>' + '<a href="http://www.youtube.com/watch?v="' + link + "</a>" + "</dt>");
        $('#response').append('<dd>' + description + '</dd>');

        }

    }

function getToken(buttonFlag) {
    
    if(buttonFlag == 'N')
    {

        if(!tokenArray[tokenIndex]) 
        {

            token = nextPage;

            tokenArray[tokenIndex] = nextPage;
        }

        else 
        {
            token = tokenArray[tokenIndex];
        };


        tokenIndex += 1;

        alert("token is " + token + 'token Index is ' + tokenIndex);
                  

        return(token);

    }

    else 

    {

        if(buttonFlag == 'P') 
        {


            alert('tokenarraytokenindex is ' + tokenArray[tokenIndex] + ' tokenIndex is ' + tokenindex);
            if(!tokenArray[tokenIndex]) 
            {

                alert('Sorry - No previous page.  Will display current page');


               return(tokenArray[tokenIndex]);
            }

        else {


            tokenIndex -= 1;

            return(tokenArray[tokenIndex]);
             };

         };

    };

    /* function addToCounter(){

        if (isNaN(tokenIndex)){
            tokenIndex = 1;
        }
        
        else {
        tokenIndex += 1;
         };

        return(tokenIndex);
    }; */




};
   //document.getElementById('response').innerHTML += responseString;

  /*  $.each(responseString.items, function(i, item) {
            //var question = showQuestion(item);
    $('.response').append(snippet.description);
    };

    } */
/* 

getStats function to get stats on most watched youtube videos for technique selected.
list	searchResults 		

https://www.googleapis.com/youtube/v3/videos?id=7lCDEYXw3mM&key=YOUR_API_KEY
     &part=snippet,contentDetails,statistics,status


https://www.googleapis.com/youtube/v3/videos?id=7lCDEYXw3mM&key=AIzaSyDqZVJ1gxbvSviWDXnq0CJP3lxTt_nzR4o&part=snippet,contentDetails,statistics,status


my API key for bjj project
     AIzaSyDqZVJ1gxbvSviWDXnq0CJP3lxTt_nzR4o



topTen function to identify the top 10 videos for search term selected

showResults function to display links to videos for top 10 Results

playVideo function to show the video in the video play area on the page.

*/

