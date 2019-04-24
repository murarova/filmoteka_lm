import "../styles/style.sass";

import Model from "./model";
import View from "./view";
import Controller from "./controller";
import "./pag";

const view = new View();
const model = new Model();

new Controller(model, view);

const hrefShare = window.location.search;

function checkRedirect(hrefShare) {
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
        view.emit("onFilmID", renderById);
        history.replaceState({}, "", "/movie.html?imdbID=" + renderById);
      }

      if(redirectPage === "library"){
        view.clearStartMainPage();
        view.makeFilmotekaPage();
        view.emit('onViewLaterFilmsBtn');
        history.replaceState({}, "", 'library.html');
      }
    }
  }
}
checkRedirect(hrefShare);
