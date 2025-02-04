/*
Art Works API
https://api.artic.edu/docs/#quick-start

https://api.artic.edu/api/v1/artworks?title,artist_display,date_display,page=2&limit=10
*/

fetch('https://api.artic.edu/api/v1/artworks?page=2&limit=5&fields=title,artist_display,date_display,image_id')
.then(response => {
  //checking if the response is ok code 200 range
  if(!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  //returning the parsed JSON data
  return response.json();
})
.then(data => {
//accessing the artworks array
const artworks = data.data;

//selecting the section and p
const artSection = document.getElementById("art");
const artContainer = artSection.querySelector("div");

if(!artContainer) {
  artContainer = document.createElement("div");
  artSection.appendChild(artContainer);
}

//clearing any existing content in the art paragraph
artContainer.innerHTML = '';

artworks.forEach(art => {

  //create a container for each artwork
  const artCard = document.createElement("div");

  //stylers for each card to move to the css later
  artCard.style.border = "1px solid #ddd";
  artCard.style.padding = "10px";
  artCard.style.margin = "10px";
  artCard.style.textAlign = "center";
  artCard.style.display = "inline-block";
  artCard.style.width = "220px";

  //create an image element
  const img = document.createElement("img");
  if(art.image_id) {
    img.src = `https://www.artic.edu/iiif/2/${art.image_id}/full/200,/0/default.jpg`;
    img.alt = art.title;
  } else {
    // Placeholder if no image
    img.src = "https://via.placeholder.com/200"; 
    img.alt = "No image available";
  }
    img.style.width = "200px";
    img.style.height = "auto";

  //create a paragraph for the title and artist

    //create a new p element for each art piece
    const artPiece = document.createElement("p");
    artPiece.innerText = `${art.title} by ${art.artist_display || 'Unknown Artist'} (${art.date_display || 'Unknown Date'})`;

    //append elements to the container
    artCard.appendChild(img);
    artCard.appendChild(artPiece);

    //append the art container to the page 
    artContainer.appendChild(artCard);
  });

})
.catch(error => {
  //handling the errors and notifying the user
  console.log(`An error occurred ${error.message}`);

  //show any error message in the project section
  const errorMessage = document.createElement("p");
  errorMessage.innerText = "Could not fetch art work. Please try again later.";
  artSection.appendChild(errorMessage);

  if(error.message.includes('404'))  {
    console.error(`User not found ${error.message}`);
  } else {
    console.error(`Something went wrong, try again ${error.message}`);
  }
});