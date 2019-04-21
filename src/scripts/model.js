import callApi from "./services/callApi";
import callApiFull from "./services/callApiFull";
// import { resolve } from "dns";

export default class Model {
  constructor() {
    //fields with films
    (this.queryFilmList = []), //last 10 film showed after search querry
      (this.viewLaterFilms = []),
      (this.viewedFilms = []),
      (this.favoriteFilms = []);
    //last page and total for pagination
    (this.lastPage = 1),
      //total results in last query
      (this.lastQueryTotal = 1),
      //last viewed film in detailed form
      (this.lastFilm = {});
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
  //check if local storage exists
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
  //write to local storage
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
  //read from local storage
  localStorageRead() {
    if (this.localStorageAvailable) {
      try {
        let filmotekaFromLocalStorage = JSON.parse(
          localStorage.getItem("filmoteka")
        );
        this.filmoteka = filmotekaFromLocalStorage;
        return arrayOfFilms;
      } catch (error) {
        console.log("Local Storage is empty");
        return null;
      }
    }
  }
  //add film to list
  addFilmToList(listName, film) {
    this[listName].push(film);
    console.log("listName=", this[listName]);
    return this[listName].reverse();
  }
  //delete film from list
  deleteFilmFromList(listName, id) {
    return list.filter(film => id !== film.id);
  }
  
  //get queryFilmList from server
  handleSearchQuery(query, page = 1) {
    this.lastQuery = query;
    this.filmoteka.lastQuery = this.lastQuery;

    // console.log('this.lastQuery =', this.lastQuery);
    // console.log('query=', query);

    const searchResults = callApi(
      query.replace(/(^\s*)|(\s*)$/g, ""),
      (page = 1)
    );
    searchResults.then(data => {
      // console.log('data=', data);
      // console.log('data.totalResults=', data.totalResults);
      // console.log('data.Search=', data.Search);
      if (data.Response) {
        this.queryFilmList = data.Search;
        this.lastQueryTotal = data.totalResults;
        this.lastPage = page;
        // console.log('data.Search=', data.Search);
        // console.log('this.queryFilmList =', this.queryFilmList);
        // console.log('this.lastQuery =', this.lastQuery);
        // console.log('this.filmoteka =', this.filmoteka);
        // console.log('this.lastQueryTotal = ', this.lastQueryTotal);
        this.filmoteka.totalPages = Math.ceil(this.lastQueryTotal/10);
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
    console.log('id in model=', id);

    // this.filmoteka.lastFilm = this.lastFilm;
    // this.localStorageWrite(this.filmoteka);
    let filmInfo = null;
    return (filmInfo = callApiFull(id).then(data => {
      // console.log("data=", data);
      this.lastFilm = data;
      // console.log("this.lastFilm=", this.lastFilm);
      this.filmoteka.totalPages = Math.ceil(this.lastQueryTotal/10);
      this.filmoteka.lastFilm = this.lastFilm;
      this.localStorageWrite(this.filmoteka);
      return this.lastFilm;
    }));
  }
  //pagination
  resolvePages(btnType, currPage, numPages) {
    // console.log("btnType=", btnType);
    // console.log("currPage=", currPage);
    // console.log("numPages=", numPages);
    if (btnType === "Prev" && +currPage !== 1) {
      this.lastPage = +currPage - 1;
    } else this.lastPage;
    if (btnType === "Next" && +currPage < +numPages) {
      this.lastPage = +currPage + 1;
    }

    // console.log("this.lastPage=", this.lastPage);
    // console.log("this.lastQuery=", this.lastQuery);

    const searchResults = callApi(
      this.lastQuery.replace(/(^\s*)|(\s*)$/g, ""),
      this.lastPage
    );
    searchResults.then(data => {
      // console.log('this.lastQuery=', this.lastQuery);
      // console.log('this.lastPage inside searchresults=', this.lastPage);
      // console.log('data=', data);
      // console.log('data.totalResults=', data.totalResults);
      // console.log('data.Search=', data.Search);
      if (data.Response) {
        this.queryFilmList = data.Search;
        this.lastQueryTotal = data.totalResults;
        //this.lastPage = page;
        // console.log('data=', data);
        // console.log('this.queryFilmList =', this.queryFilmList);
        // console.log('this.lastQuery =', this.lastQuery);
        // console.log('this.filmoteka =', this.filmoteka);
        // console.log('this.lastQueryTotal = ', this.lastQueryTotal);
        this.filmoteka.totalPages = Math.ceil(this.lastQueryTotal/10);
        this.filmoteka.lastPage = this.lastPage;
        this.filmoteka.queryFilmList = this.queryFilmList;
        this.localStorageWrite(this.filmoteka);
      }
    });
    return searchResults;
  }
}
