# open-api-project
Mechelle Presnell
Open API Project

Art Institute of Chicago Artwork & Artist Explorer
This project is a simple web application that allows users to explore artworks and artists from the Art Institute of Chicago API. Users can:

•	Brief description about the AIC.
•	View a list of artworks.
•	Click on an artwork to see more details.
•	View a list of artists and their descriptions.
•	Navigate between the artworks and artists sections.

Features
•	Fetch and display a list of artworks with title, description, and image.
•	Fetch and display artist details.
•	Fetch the Images using the Art Institute of Chicago IIIF
•	Clicking on an artwork image fetches more details.
•	Error handling for network issues.
•	Back button to return to the artwork list.
•	Navigation buttons to switch between the artworks and artists sections.

Installation & Setup
1.	Clone the repository: 
2.	git clone https://github.com/your-github-username/artic-explorer.git
3.	cd artic-explorer
4.	Open the project in a code editor or run it directly in a web browser.
5.	Ensure you have internet access to fetch API data.
6.	Open index.html in a browser to start exploring artworks and artists.

File Structure
artic-explorer/
│── index.html        # Main webpage
│── art.html          # Artwork page
├── images/           # Folder containing images
│   ├── image1.jpg
│   ├── image2.jpg
│   ├── image3.jpg
├── css/              # Folder containing CSS files
│   ├── styles.css    # Main Styles for the webpage
│   ├── art.css	      # Main Styles for the webpage
├── js/               # Folder containing JavaScript 
│   ├── script.js     # JavaScript for fetching and displaying data
│── README.md         # Project instructions


How to Use
1. View Artworks
•	When the page loads, the landing page (home) has a brief description and a navigation where you can click on the artworks to be taken to that page, which automatically fetches and displays artworks.
•	Each artwork is displayed as a card with: 
o	Title
o	Description
o	Image (clickable for more details)

2. View Artwork Details
•	Click on an artwork image to fetch more details.
•	The page will display: 
o	Title
o	Description
o	Artist Name
o	Larger Image
•	Click "Back to Artworks" to return to the artwork list.

3. View Artists
•	Click the "View Artists" button to fetch and display a list of artists.
•	Each artist is displayed with: 
o	Name
o	Description (if available)
•	Click the "View Artworks" button to return to the artwork list.

API Used
•	Art Institute of Chicago API 
o	Endpoint for artworks:
https://api.artic.edu/api/v1/artworks?limit=10&fields=id,title,description,image_id
o	Endpoint for artists:
https://api.artic.edu/api/v1/agents?limit=10&fields=id,title,description
o	Endpoint for artwork details:
https://api.artic.edu/api/v1/artworks/{artworkId}?fields=id,title,description,artist_display,image_id

Error Handling
•	If there is a network issue, an error message is displayed: 
•	"There was a network error, please check your connection."
•	If the API request fails for another reason, it shows: 
•	"Could not fetch artwork. Please try again."

Future Improvements
•	Open artwork details in a new page instead of replacing content.
•	Add search functionality to find specific artworks.
•	Improve styling and user experience.
