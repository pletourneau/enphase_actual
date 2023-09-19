import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import './css/styles.css';


    // Define your Enphase API credentials
    const clientId = 'your_client_id';
    const clientSecret = 'your_client_secret';
    const apiKey = 'your_api_key';
    const redirectUri = 'https://your-redirect-uri.com';
    let accessToken;

    // Function to authorize and obtain an access token
    async function authorizeAndObtainAccessToken() {
      // Redirect the user to the Enphase authorization URL
      const authUrl = `https://api.enphaseenergy.com/oauth/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}`;
      
      // Open the authorization URL in a new window
      window.open(authUrl, '_blank');

      // Show the "Fetch Live Data" button after authorization
      document.getElementById('fetchDataButton').style.display = 'block';
    }

    // Function to fetch real-time live status data for a system
    async function fetchLiveData(systemId) {
      // Obtain the access token (you should have it stored securely)
      // For simplicity, we'll use a stored accessToken variable
      // In a real app, this should be stored securely and retrieved as needed

      // Define the API endpoint for fetching live data
      const apiUrl = `https://api.enphaseenergy.com/api/v4/systems/${systemId}/live_data?key=${apiKey}`;

      try {
        // Make a GET request to the API using the access token
        const response = await fetch(apiUrl, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (response.ok) {
          // Parse the live data response
          const liveData = await response.json();
          console.log('Live Data:', liveData);

          // Display the live data on the DOM
          document.getElementById('liveDataContainer').style.display = 'block';
          document.getElementById('liveData').textContent = JSON.stringify(liveData, null, 2);
        } else {
          console.error('Error fetching live data:', response.statusText);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }

    // Event listeners for the buttons
    document.getElementById('authorizeButton').addEventListener('click', authorizeAndObtainAccessToken);
    document.getElementById('fetchDataButton').addEventListener('click', () => {
      // Replace 'systemId' with the actual system ID you want to retrieve data for
      fetchLiveData('your_system_id');
    });


