export default class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    view.on('onInputFilmName', this.handleSearch.bind(this));
  }

  handleSearch(text) {
    // console.log('this.model=', this.model);
    this.model.handleSearchQuery(text).then(
      (resolve, reject) => {
        return this.view.updateCardsList(this.model);
      }
    );
  }
}
