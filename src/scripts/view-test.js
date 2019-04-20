import EventEmitter from './services/event-emitter';

export default class View extends EventEmitter {
  constructor() {
    super();

    this.app = document.querySelector('#app');

    this.form = this.app.querySelector('.search-form-js');
    // console.log('this.form=', this.form);

    this.form.addEventListener('submit', this.handleSearch.bind(this));

  }

  clearInput(event) {
    return event.target[0].value = '';
  }

  handleSearch(event) {
    event.preventDefault();
    let input = event.target[0];
    let inputFilmName = input.value;
    this.emit('onInputFilmName', inputFilmName);
    this.clearInput(event);
    // console.log('inputFilmName=', inputFilmName);
  }
}
