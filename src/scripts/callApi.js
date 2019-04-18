const url = 'http://www.omdbapi.com/?s=';
const apiKey = '&apikey=4095ed63'

function callApi(search) {
    fetch(url + search + apiKey)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(`Error while fetching: ${response.statusText}`);
        })
}