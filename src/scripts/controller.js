export default class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    view.on("onInputFilmName", this.handleSearch.bind(this));
    view.on("onFilmID", this.handleFilmID.bind(this));
    view.on('onPagination', this.handlePaginationEvent.bind(this));
  }

  handleSearch(text) {
    this.model.handleSearchQuery(text).then(() => {
      return this.view.updateCardsList(this.model);
    });
  }

  handleNextPageSearch(text, page) {
    this.model.handleSearchQuery(text, page).then((resolve, reject) => {
      return this.view.updateCardsList(this.model);
    });
  }

  handleFilmID(id) {
    this.model
      .takeFilmInfo(id)
      .then(
        data=>this.view.createFilmPage(data)
     );
    // console.log("this.model.takeFilmInfo(id)=", this.model.takeFilmInfo(id));
  }

  //handle Pagination
  handlePaginationEvent (currPage, numPages){
    this.model.resolvePages(currPage, numPages).then((resolve, reject) => {
      return this.view.updateCardsList(this.model);
    });
  }
}
// console.log("this.model=", this.model);
//         return this.view.createFilmPage(this.model);
