import callApi from "./services/callApi";
import callApiFull from "./services/callApiFull";


export default class Model {
  constructor() {
      //fields with films
      this.queryFilmList = [], //last 10 film showed after search querry
      this.viewedFilms = [],
      this.viewLaterFilms = [],
      this.favoriteFilms = [];
      //last page and total for pagination
      this.lastPage = 1,
      //total results in last query
      this.lastQueryTotal = 1,
      //last viewed film in detailed form
      this.lastFilm = {};
      //last query for search
      this.lastQuery = "";

      //object for writtting/reading to storage
      this.filmoteka = {
      queryFilmList: this.queryFilmList,
      viewLaterFilms: this.viewLaterFilms,
      viewedFilms: this.viewedFilms,
      favoriteFilms: this.favoriteFilms,
      lastQuery: this.lastQuery,
      lastPage: this.lastPage,
      totalPages: this.lastQueryTotal
    };
  }

  localStorageAvailable(type = "localStorage") {
    try {
      let storage = window[type];
      let x = "__storage_test__";
      storage.setItem(x, x);
      storage.removeItem(x);
      return true;
    } catch (e) {
      return false;
    }
  }

  localStorageWrite(filmoteka) {
    if (this.localStorageAvailable) {
      try {
        localStorage.setItem("filmoteka", JSON.stringify(this.filmoteka));
      } catch (error) {
        console.log("Error during writing from local storage");
        return null;
      }
    }
  }

  localStorageRead() {

    if (this.localStorageAvailable) {
      try {
        let filmotekaFromLocalStorage = JSON.parse(
          localStorage.getItem("filmoteka")
        );

        if (filmotekaFromLocalStorage !== null) {
          this.filmoteka = filmotekaFromLocalStorage;
        };
        return;
      } catch (error) {
        console.log("Local Storage is empty");
        return;
      }
    }
  }

  getFavoriteFilmsFromLS() {
    this.localStorageRead();
    return this.filmoteka.favoriteFilms;
  }

  getViewedFilmsFromLS() {
    this.localStorageRead();
    return this.filmoteka.viewedFilms;
  }

  getViewLaterFilmsFromLS() {
    this.localStorageRead();
    return this.filmoteka.viewLaterFilms;
  }

  addFilmToList(listName, film) {
    this[listName].push(film);
    return this[listName].reverse();
  }

  deleteFilmFromList(listName, film) {
    return (this[listName] = this[listName].filter(item => {
      return film.imdbID !== item.imdbID;
    }));
  }

  //get queryFilmList from server
  handleSearchQuery(query, page = 1) {
    this.localStorageRead();
    this.lastQuery = query;
    this.filmoteka.lastQuery = this.lastQuery;

    const searchResults = callApi(
      query.replace(/(^\s*)|(\s*)$/g, ""),
      (page = 1)
    );
    searchResults.then(data => {

      if (data.Response) {
        this.queryFilmList = data.Search;
        this.lastQueryTotal = data.totalResults;
        this.lastPage = page;
        this.filmoteka.totalPages = Math.ceil(this.lastQueryTotal / 10);
        this.filmoteka.queryFilmList = this.queryFilmList;
        this.localStorageWrite(this.filmoteka);

        // Работа с страницами поиска
        localStorage.setItem("numPages", Math.ceil(this.lastQueryTotal / 10));
        if (page == 1 || page == null) {
          localStorage.setItem("currPage", 1);
        } else {
          localStorage.setItem("currPage", page);
        }
      }
    });
    return searchResults;
  }
  //take ifo about film
  takeFilmInfo(id) {

    let filmInfo = null;
    return (filmInfo = callApiFull(id).then(data => {
      this.lastFilm = data;
      this.localStorageRead();

      this.filmoteka.totalPages = Math.ceil(this.lastQueryTotal / 10);
      this.filmoteka.lastFilm = this.lastFilm;
      this.localStorageWrite(this.filmoteka);
      return this.lastFilm;
    }));
  }
  //pagination
  resolvePages(btnType, currPage, numPages) {

    if (btnType === "Prev" && +currPage !== 1) {
      this.lastPage = +currPage - 1;
    } else this.lastPage;
    if (btnType === "Next" && +currPage < +numPages) {
      this.lastPage = +currPage + 1;
    }

    const searchResults = callApi(
      this.lastQuery.replace(/(^\s*)|(\s*)$/g, ""),
      this.lastPage
    );
    searchResults.then(data => {

      if (data.Response) {
        this.queryFilmList = data.Search;
        this.lastQueryTotal = data.totalResults;
         this.filmoteka.totalPages = Math.ceil(this.lastQueryTotal / 10);
        this.filmoteka.lastPage = this.lastPage;
        this.filmoteka.queryFilmList = this.queryFilmList;
        this.localStorageWrite(this.filmoteka);
      }
    });
    return searchResults;
  }
  //add or remove to list
  handleListWithAction({ libraryListName, action }) {

    if (action === "add") {

      if (this.isFilmInList(libraryListName, this.lastFilm.imdbID)) return;
      this.addFilmToList(libraryListName, this.lastFilm);
    }

    if (action === "remove") {
      if (!this.isFilmInList(libraryListName, this.lastFilm.imdbID)) return;
      this.deleteFilmFromList(libraryListName, this.lastFilm);
    }

    this.filmoteka[libraryListName] = this[libraryListName];
    this.localStorageWrite(this.filmoteka);
  }

  isFilmInList(listName, id) {
    if (this[listName].length === 0) return false;
    return this[listName].find(item => item.imdbID === id);
  }
  takeFilmInfoFromLocalStorage(id) {

    let result = {
      viewLaterFilms: null,
      viewedFilms: null,
      favoriteFilms: null
    };

    if (!this.localStorageAvailable("localStorage")) return result;
    this.localStorageRead();
    let dataFromLocalStorage = this.filmoteka;

    if (!dataFromLocalStorage) return result;
    this.viewLaterFilms = this.filmoteka.viewLaterFilms;
    this.viewedFilms = this.filmoteka.viewedFilms;
    this.favoriteFilms = this.filmoteka.favoriteFilms;
    result = {
      viewLaterFilms: this.isFilmInList("viewLaterFilms", id),
      viewedFilms: this.isFilmInList("viewedFilms", id),
      favoriteFilms: this.isFilmInList("favoriteFilms", id)
    };

    return result;
  }
}
