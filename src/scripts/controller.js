export default class Controller {

  constructor(model, view, routing) {

    this.model = model;
    this.view = view;
    this.routing = routing;

    view.on("onInputFilmName", this.handleSearch.bind(this));
    view.on("onFilmID", this.handleFilmID.bind(this));
    view.on("onPagination", this.handlePaginationEvent.bind(this));

    view.on("onCreateFilmPage", this.handleCreateFilmPage.bind(this));
    view.on("onHandleList", this.handleList.bind(this));

    view.on("onBackToSearchResults", this.handleBackToSearchResults.bind(this));
    //myFilmoteka listeners

    view.on('onViewLaterFilmsBtn', this.handleViewLaterFilms.bind(this));
    view.on('onFavotitesBtn', this.handleFavorites.bind(this));
    view.on('onViewedFilmsBtn', this.handleViewedFilms.bind(this));

    view.on('onFilmotekaLink', this.handleFilmotekaLink.bind(this));
    view.on('onCardLink', this.handleCardLink.bind(this));
    view.on('onMainLink', this.handleMainLink.bind(this));
    view.on('onLogoLink', this.handleLogoLink.bind(this));
    view.on('onPopState', this.handlePopState.bind(this));

    routing.on("onBackToMainPage", this.handleBackToMainPage.bind(this));
    routing.on("onBackToLibrary", this.handleBackToLibrary.bind(this));
    routing.on("onFilmID", this.handleFilmID.bind(this));
  }

  handleCardLink(e) {
    e.preventDefault();
    this.routing.pushCardState(e);
  }

  handleBackToLibrary() {
    this.view.makeFilmotekaPage();
    this.handleViewLaterFilms();
  }

  handleMainLink(e) {
    e.preventDefault();
    this.routing.pushState(e);
    this.view.clearStarMaintPage();
    this.view.startPage();
    this.view.mainPage();
  }

  handleLogoLink(e) {
    e.preventDefault();
    this.routing.logoPushState(e);
    this.view.clearStarMaintPage();
    this.view.startPage();
    this.view.mainPage();
  }

  handleBackToMainPage() {

    this.view.clearStarMaintPage();
    this.view.startPage();
    this.view.mainPage();

    if (this.model.lastQuery.length !== 0) {
      this.view.updateCardsList(this.model);
      let input = document.querySelector('.input');
      input.value = this.model.lastQuery;
    }
  }

  handleBackToSearchResults() {
    //start add last querry in the input after back

    this.view.updateCardsList(this.model);

    let input = document.querySelector('.input');
    input.value = this.model.lastQuery;
    //end add last querry in the input after back
  }

  handleSearch(query, page) {
    this.model.handleSearchQuery(query, page).then(() => {
      //console.log('this.model=', this.model);
      return this.view.updateCardsList(this.model);
    });
  }

  handleNextPageSearch(text, page) {
    this.model.handleSearchQuery(text, page).then((resolve, reject) => {
      return this.view.updateCardsList(this.model);
    });
  }

  handleFilmID(id) {
    this.model.takeFilmInfo(id)
      .then(data => {
        this.view.createFilmPage(data, id);
      });

  }

  //handle Pagination
  handlePaginationEvent(btnName, currPage, numPages) {
    // console.log("this.model=", this.model);
    this.model
      .resolvePages(btnName, currPage, numPages)
      .then((resolve, reject) => {
        return this.view.updateCardsList(this.model);
      });
  }
  //handle film page
  handleCreateFilmPage(id) {
    let result = this.model.takeFilmInfoFromLocalStorage(id);
    //console.log("result =", result);
    return this.view.dataAboutFilmFromLocalStorage = result;
  }

  handleList({ libraryListName, action }) {
    this.model.handleListWithAction({ libraryListName, action });
  }

  //myFilmoteka listeners

  handleViewLaterFilms() {

    const data = this.model.getViewLaterFilmsFromLS();

    if (data.length === 0) {
      this.view.clearCardsList();
      this.view.ifNothingToRender();
    } else {
      this.view.clearCardsList();
      this.view.cardsRender(data);
    }
  }

  handleFavorites() {

    const data = this.model.getFavoriteFilmsFromLS();

    if (data.length === 0) {
      this.view.clearCardsList();
      this.view.deleteAutofocus();
      this.view.ifNothingToRender();
    } else {
      this.view.clearCardsList();
      this.view.deleteAutofocus();

      this.view.cardsRender(data);
    }
  }

  handleViewedFilms() {

    const data = this.model.getViewedFilmsFromLS();

    if (data.length === 0) {
      this.view.clearCardsList();
      this.view.deleteAutofocus();
      this.view.ifNothingToRender();
    } else {
      this.view.clearCardsList();
      this.view.deleteAutofocus();
      this.view.cardsRender(data);
    }
  }

  handleFilmotekaLink(e) {
    this.routing.pushState(e);
    this.view.makeFilmotekaPage();
    this.handleViewLaterFilms();
  }

  handlePopState(e) {
    this.routing.popState(e);

  }

}
