    const url = 'https://www.omdbapi.com/?i=';
    const apiKey = '&apikey=4095ed63';
    const full = '';

    export default function callApi(imdbID) {
      return fetch(url + imdbID + apiKey)
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          throw new Error(`Error while fetching: ${response.statusText}`);
        });
    }
