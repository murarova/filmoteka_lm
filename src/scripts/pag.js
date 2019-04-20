const content = {
    index: "Главная страница сделать рендер Главная страница сделать рендер Главная страница сделать рендер Главная страница сделать рендер",
    library: "Библиотека сделать рендерg Библиотека сделать рендерg Библиотека сделать рендерg",
    movie: "Ирформация о фильме сделать рендер Ирформация о фильме сделать рендер Ирформация о фильме сделать рендер"
  };
  const contentSite = document.querySelector(".content");
  const nav = document.querySelector(".nav");
  
  function updateState(state) {
    if (!state) return;
    contentSite.innerHTML = content[state.page];
  }
  window.addEventListener("popstate", function(e) {
    updateState(e.state);
  });
  
  nav.addEventListener("click", function(e) {
    if (e.target.tagName !== "A") return;
    // console.log(e.target.getAttribute('href'));
    const state = {
      page: e.target.getAttribute("href")
    };
    history.pushState(state, "", state.page);
    updateState(state);
    e.preventDefault();
  });
  // Pagination btnBack btnGo
  const btnBack = document.querySelector(".js-pag-Back");
  btnBack.addEventListener("click", pagBack);
  function pagBack() {
    history.go(-1);
  }
  
  const btnGo = document.querySelector(".js-pag-Go");
  btnGo.addEventListener("click", pagGo);
  function pagGo() {
    history.go(+1);
  }
  
  
  const url = 'http://www.omdbapi.com/?s=';
  const apiKey = '&apikey=4095ed63'
  const page = '&page='
  
  function callApi(search, pageNum) {
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
  callApi('iron', 2).then(data => {
      console.log(data);
      console.log(data.totalResults);
      console.log(data.Search);
  });
  