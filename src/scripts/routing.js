
import { EventEmitter } from "events";

export default class Routing extends EventEmitter{
    constructor() {
        super();

        this.cardId = null;
        this.state = {
            page: null,
            cardId: null,
        };
    }

    pushState(e) {
        e.preventDefault();
        if (e.target.tagName !== "A") return;
        this.state.page = e.target.getAttribute("href");
        history.pushState(this.state, "", this.state.page);
    }

    logoPushState(e) {
        e.preventDefault();
        this.state.page = e.target.closest("a").getAttribute("href");
        history.pushState(this.state, "", this.state.page);
    }

    pushCardState(e) {
        e.preventDefault();
        this.cardId = e.target.closest("a").getAttribute("href");
        this.state.cardId = this.cardId;
        history.pushState(this.state.cardId, "", "movie.html?imdbID=" + this.state.cardId);
    }

    popState(e) {
        e.preventDefault();

        if (window.location.pathname === '/') {
            this.emit('onBackToMainPage');
            history.replaceState({}, "", "");
        }

        if (document.location.pathname === "/library.html") {
            this.emit('onBackToLibrary');
            history.replaceState({}, "", "library.html");
        }

        if (document.location.pathname === "/movie.html") {
            this.emit("onFilmID", this.state.cardId);
            history.replaceState({}, "", "movie.html?imdbID=" + this.state.cardId);
        }
    }

    checkRedirect(hrefShare) {
        if (hrefShare.length) {
          const isRedirect = hrefShare
            .split("?")[1]
            .split("&")
            .includes("redirected=true");
      
          if (isRedirect) {
            const redirectPage = hrefShare
              .split("?")[1]
              .split("&")
              .filter(el => el.includes("page"))[0]
              .split("=")[1];
            if (redirectPage === "movie") {
              const arr = hrefShare.split("mdbID=");
              const renderById = arr[1];
              // console.log(renderById);
              this.emit("onFilmID", renderById);
              history.replaceState({}, "", "/movie.html?imdbID=" + renderById);
            }
      
            if(redirectPage === "library"){
              this.emit('onBackToLibrary');
              history.replaceState({}, "", 'library.html');
            }
          }
        }
    }
}