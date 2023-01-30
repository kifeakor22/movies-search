 // Initial array of movies
 var movies = ["The Matrix", "Dune", "Mr. Right", "The Lion King"];

 // displayMovieInfo function re-renders the HTML to display the appropriate content
 function displayMovieInfo() {

   var movie = $(this).attr("data-name");
   var queryURL = "https://www.omdbapi.com/?t=" + movie + "&apikey=trilogy";

   // Creates AJAX call for the specific movie button being clicked
   $.ajax({
     url: queryURL,
     method: "GET"
   }).then(function(response) {
     // YOUR CODE GOES HERE!!!
     console.log(queryURL)

     console.log(response)
  

     // Creates a div to hold the movie
          // Retrieves the Rating Data
          var ratingSource = response.Ratings[0].Source
          var ratingsVal = response.Ratings[0].Value
          // Creates an element to have the rating displayed
          var ratingsEl = $("<h3>").text(`Rated ${ratingsVal} source: ${ratingSource}`)
          // Displays the rating
          // Retrieves the release year
          var year = response.Year
          // Creates an element to hold the release year
          var yearEl = $("<h3>").text(`Movie was released in ${year}`)
          // Displays the release year
          // Retrieves the plot
          var plot = response.Plot
          // Creates an element to hold the plot
          var plotEl = $("<p>").text(`Plot: ${plot}`)

          // Creates an element to hold the image
          var imageSrc = response.Poster
          movieImgEl = $("<img>").attr("src",imageSrc)
          // Appends the image
          $("#movies-view").prepend(movieImgEl,plotEl,yearEl,ratingsEl)
          // Puts the entire Movie above the previous movies.

   });

 }

 // Function for displaying movie data
 function renderButtons() {

   // Deletes the movies prior to adding new movies
   // (this is necessary otherwise you will have repeat buttons)
   $("#buttons-view").empty();

   // Loops through the array of movies
   for (var i = 0; i < movies.length; i++) {

     // Then dynamicaly generates buttons for each movie in the array
     // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
     var a = $("<button>");
     // Adds a class of movie to our button
     a.addClass("movie");
     // Added a data-attribute
     a.attr("data-name", movies[i]);
     // Provided the initial button text
     a.text(movies[i]);
     // Added the button to the buttons-view div
     $("#buttons-view").append(a);
   }
 }

 // This function handles events where the add movie button is clicked
 $("#add-movie").on("click", function(event) {
   event.preventDefault();
   // This line of code will grab the input from the textbox
   var movie = $("#movie-input").val().trim();

   // The movie from the textbox is then added to our array
   movies.push(movie);

   // Calling renderButtons which handles the processing of our movie array
   renderButtons();
    $("#movie-input").val("")
   

 });

 // Adding click event listeners to all elements with a class of "movie"
 $(document).on("click", ".movie", displayMovieInfo);

 // Calling the renderButtons function to display the initial buttons
 renderButtons();