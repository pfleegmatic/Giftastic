// ----- Game Variables ----- //
	
	// Array of anime cartoons that will be included in button panel
	var animeArray = ["Gundam", "Voltron", "Robotech", "Mazinkaiser SKL", "Patlabor", "Madox-01"];
	
	//Functions makeButtons (render) will display the anime buttons within the animeArray.
	function makeButtons() {
	  // Empty the buttons panel
	  $("#buttonPanel").empty();
	
	  // Loop through the array of animals
	  for (var i = 0; i < animeArray.length; i++) {
	    // Dynamicaly generate a button for each anime in the array
	    var button = $("<button>");
	    button.addClass("animeButton");
	    button.attr("data-anime", animeArray[i]);
	    button.text(animeArray[i]);
	
	    // Add the button to the HTML
	    $("#buttonPanel").append(button);
	  }
	}
	
	//Event Handlers 
	
	//Form to add additional animes to the array
	$("#add-anime").on("click", function(event) {
	  event.preventDefault();
	
	  // Get the input from the textbox
	  var anime = $("#anime-input").val().trim();
	
	  // The anime from the textbox is then added to animeArray.
	  animeArray.push(anime);
	  $("#anime-input").val("");
	
	  // New anime button rendered w/ the anime Array addition.
	  makeButtons();
	});
	

	// fetchAnimeGifs will fetch animal Gifs from Giphy API
	function fetchAnimeGifs() {
	  // Get the anime name from the button clicked
	  var animeName = $(this).attr("data-anime");
	 // var animeStr = animeName.split(" ").join("+");
	   console.log(this);
	
	  // The API or Giphy link
	  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animeName + 
	                 "&rating=pg-13&limit=20&api_key=dc6zaTOxFJmzC";
	
	  // Use AJAX call to API
	  $.ajax({
	    method: "GET",
	    url: queryURL,
	  })
	  .done(function( response ) {
	  	console.log(queryURL);
	    // Get the results array
	    var dataArrayResult = response.data;
	     console.log(response.data);

	
	    // Create and display div elements for each of the returned Gifs
	    $("#gifPanel").empty();
	    for (var i = 0; i < dataArrayResult.length; i++) {
	      var newDiv = $("<div>");
	      newDiv.addClass("animeGif");
	
	      //Image div	
	      var newImg = $("<img>");
	      //create image attributes as still first 
	      newImg.attr("src", dataArrayResult[i].images.fixed_height_still.url);
	      newImg.attr("data-still", dataArrayResult[i].images.fixed_height_still.url);
	      console.log(dataArrayResult[i].images.fixed_height_still.url)
	      //then create attributes for gif next
	      newImg.attr("data-animate", dataArrayResult[i].images.fixed_height.url);
	      newImg.attr("data-state", "still"); //Line 98 references "still" condition
	      newDiv.append(newImg);

	      //append rating to gif
	      var newRating = $("<h2>").html("Rating: " + dataArrayResult[i].rating);
	      newDiv.append(newRating);
	
	      // Append the gifs to the gifPanel
	      $("#gifPanel").append(newDiv);
	    }
	  });
	}
	
	// animateAnimeGif function to animate the still and then to stop animating the gif
	function animateAnimeGif() {
	  // Image state is either"still" or "animated"
	  var state = $(this).find("img").attr("data-state");
	
	  // Make the Gif either animated or still depending on the "data-state" value
	  if (state === "still") {
	    $(this).find("img").attr("src", $(this).find("img").attr("data-animate"));
	    $(this).find("img").attr("data-state", "animate");
	  } else {
	    $(this).find("img").attr("src", $(this).find("img").attr("data-still"));
	    $(this).find("img").attr("data-state", "still");
	  }
	}
	
	// Make (render) the initial anime buttons when the HTML has finished loading
	$(document).ready(function() {
	  makeButtons();
	});
	
	// Click event for the anime buttons to fetch appropriate Gifs
	$(document).on("click", ".animeButton", fetchAnimeGifs);
	
	// Click event for the anime gifs to allow image to animate and stop
	$(document).on("click", ".animeGif", animateAnimeGif);
