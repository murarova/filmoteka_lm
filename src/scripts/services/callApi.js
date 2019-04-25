const url = 'https://www.omdbapi.com/?s=';
const apiKey = '&apikey=4095ed63';
const page = '&page=';

export default function callApi(search, pageNum) {
  return fetch(url + search + page + pageNum + apiKey)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(`Error while fetching: ${response.statusText}`);
    })
    .catch(error => {
      console.error(error);
    });
}
