import '../styles/style.sass';
import Model from './model';
import View from './view-test';
import Controller from './controller';

const view = new View();
const model = new Model();

new Controller(model, view);

console.log('model.filmoteka in index.js=', model.filmoteka);

// console.log('model.localStorageAvailable=', model.localStorageAvailable());
//let test;

//model.favoriteFilms = ['sadfvasdf'];
// console.log('model.favoriteFilms=', model.favoriteFilms);
//model.localStorageWrite('favoriteFilms', model.favoriteFilms);


//model.localStorageRead('favoriteFilms');
// console.log('model.localStorageRead(favoriteFilms)=', model.localStorageRead('favoriteFilms'));

//test = model.addFilmToList('favoriteFilms', 'some new film');
// console.log('model.addFilmToList', test);
