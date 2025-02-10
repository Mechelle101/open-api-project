/*
This JavaScript code fetches a list of artworks and it's artists details from the Art Institute of Chicago API and displays them on a webpage.
Users can navigate between the artworks list and artist details using buttons. Clicking on the artwork image opens the details in a new window. 
*/

//fetching artworks
async function fetchArtworks() {
  try {
    const response = await fetch('https://api.artic.edu/api/v1/artworks?limit=10&fields=id,title,description,image_id');
    if(!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    //converting the response into a js object so it can be used
    const data = await response.json();
    //this function all takes in the artwork data and displays it to the page
    displayCollections(data.data);
  } catch (error) {
    console.error(`An error occurred: ${error}`);
    //handling the errors properly based on the error type
    if(error.name === "TypeError") {
      displayError("There was a network error, please check your connections")
    } else {
      displayError("Could not fetch artwork. please try again.")
    }//ending of specific error handling
  }//ending of the catch
}//closes the fetchArtworks() function

//fetching artists and their details
async function fetchArtists() {
  try {
    const response = await fetch('https://api.artic.edu/api/v1/agents?limit=15&fields=id,title,description');
    if(!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    //converting the response into a js object so it can be used
    const data = await response.json();
    //passes data for rendering displayCollections() call
    displayArtists(data.data);
  } catch (error) {
    console.error(`An error occurred: ${error}`);
    if(error.name === "TypeError") {
      displayError("There was a network error, please check your connections")
    } else {
      displayError("Could not fetch artwork. please try again.")
    }//ending of specific error handling
  }//ending of the catch
}//closes the fetchArtist() function

/*
Function to display an individual artwork based on the id provided
For example: If the artworkId is 129884, the actual API request becomes
129884?fields=id,title,description,artist_display,image_id
So we are passing in the needed artwork ID to get the individual art piece
*/
async function fetchArtworkDetails(artworkId) {
  try {
    const response = await fetch(`https://api.artic.edu/api/v1/artworks/${artworkId}?fields=id,title,description,artist_display,image_id`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    //converting the response into a js object so it can be used
    const artwork = await response.json();
    //this is calling the function to display the art details
    displayArtworkDetails(artwork.data);
  } catch (error) {
    console.error(`An error occurred: ${error}`);
    if(error.name === "TypeError") {
      displayError("There was a network error, please check your connections")
    } else {
      displayError("Could not fetch artwork. please try again.")
    }//ending of specific error handling
  }//ending of the catch
}//ending the fetchArtworkDetails() function

/*
Function takes in a list of artwork, loops through each and displays them as a card with, title, description, and a clickable image that fetches detailed info about the selected artwork
*/
function displayCollections(artworks) {
  //finds the container with the ID of "container" where the artwork will be displayed
  const container = document.getElementById("container");
  //needed to clear the container to refresh the list
  container.innerHTML = '';

  //looping through the artworks, taking one piece at a time and creates a card for it 
  artworks.forEach(artwork => {
    const card = document.createElement("div");
    //create associated classes in the html...
    card.classList.add("card");
    //setting up the title on the card
    const title = document.createElement("h3");
    title.innerText = artwork.title || "Untitled";
    card.appendChild(title);
    //it seams like this is pulling in some html with the description...
    if(artwork.description) {
      const description = document.createElement("p");
      description.innerText = artwork.description;
      card.appendChild(description);
    }
    //checking that an image is available then adds the deeded html, then making the image clickable to get the information on the piece
    if(artwork.image_id) {
      const img = document.createElement("img");
      img.src = `https://www.artic.edu/iiif/2/${artwork.image_id}/full/200,/0/default.jpg`;
      img.alt = artwork.title || "Artwork Image";
      img.style.cursor = "pointer";//this changes the pointer so it is clear its clickable

      //this opens the information on the page but later will be opened in it's own page....
      img.addEventListener("click", () => {
        //call to the fetchArtworkDetails() function for the single artwork
        fetchArtworkDetails(artwork.id);
      });//closes the event listener
      card.appendChild(img);
    }
    //adding the card to the container...
    container.appendChild(card);
  });//loop ends after all artwork has been processed 
}//closes displayCollections() function 

/*
Function to display the details of the individual artwork to the page
*/
function displayArtworkDetails(artwork) {
  const container = document.getElementById("container");
  container.innerHTML = '';

  const detailsCard = document.createElement("div");
  detailsCard.classList.add("details-card");

  const title = document.createElement("h2");
  title.innerText = artwork.title || "Untitled";
  detailsCard.appendChild(title);

  if(artwork.description) {
    const description = document.createElement("p");
    description.innerText = artwork.description;
    detailsCard.appendChild(description);
  }

  const artist = document.createElement("p");
  artist.innerText = `Artist: ${artwork.artist_display || 'Unknown'}`;

  detailsCard.appendChild(artist);

  if(artwork.image_id) {
    const img = document.createElement("img");
    img.src = `https://www.artic.edu/iiif/2/${artwork.image_id}/full/400,/0/default.jpg`;
    img.alt = artwork.title || "Artwork Image";
    detailsCard.appendChild(img);
  }

  //back button to return to the list
  const backButton = document.createElement("button");
  backButton.innerText = "Back to Artworks";
  backButton.addEventListener("click", () => {
    fetchArtworks();
  });
  // detailsCard.appendChild(backButton);
  detailsCard.insertBefore(backButton, detailsCard.firstChild);

  container.appendChild(detailsCard);
}//ending the displayArtworkDetails() function

/*
Function to display artists on the webpage.
*/
function displayArtists(artists) {
  const container = document.getElementById("container");
  container.innerHTML = '';

  artists.forEach(artist => {
    const card = document.createElement("div");
    card.classList.add("card");

    const name = document.createElement("h3");
    name.innerText = artist.title || artist.name || "Unknown Artist";
    card.appendChild(name);

    if(artist.description) {
      const description = document.createElement("p");
      description.innerText = artist.description;
      card.appendChild(description);
    }//ends if
    container.appendChild(card);

  });//ending forEach()
}//ending the displayArtists() function

//function to take display the errors to the user
function displayError(message) {
  const container = document.getElementById("container");
  container.innerHTML = '';

  const errorMessage = document.createElement("p");
  errorMessage.innerText = message;
  container.appendChild(errorMessage);
}//ending the displayErrors(message) function 

//temporarily displays a loading message, not working so i took it out... adding it later... 
//this is not loading....
function displayLoading() {
  const container = document.getElementById("container");
  container.innerHTML = '<p>Loading...</p>';
}

//adding event listeners to buttons with corresponding id
document.getElementById("show-artworks").addEventListener("click", () => {
  setActiveButton("show-artworks");
  fetchArtworks();
});//ends the eventListener() for the artworks button

//adding event listener to button with corresponding id
document.getElementById("show-artists").addEventListener("click", () => {
  setActiveButton("show-artists");
  fetchArtists();
});//ends the eventListener() for the artist button

//Function will highlight the active button
function setActiveButton(activeId) {
  document.getElementById("show-artworks").classList.remove("active");
  document.getElementById("show-artists").classList.remove("active");
  document.getElementById(activeId).classList.add("active");
}//ends the setActiveButton() function

//Initialize with artworks view
fetchArtworks();
