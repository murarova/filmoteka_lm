import { EventEmitter } from 'events';

export default class View extends EventEmitter {
    constructor() {
        super();

        this.app = document.querySelector('#app');
        this.mainPage();

 }

    header() {
        const header = document.createElement('header');
        const logo = document.createElement('a');
        const menu = document.createElement('ul');
        const menuItemOne = document.createElement('li');
        const menuItemTwo = document.createElement('li');
        const mainPage = document.createElement('a');
        const myFilmoteka = document.createElement('a');

        header.classList.add('header');
        logo.classList.add('logo');
        menu.classList.add('menu');
        menuItemOne.classList.add('menu-item');
        menuItemTwo.classList.add('menu-item');
        mainPage.classList.add('menu-link');;
        myFilmoteka.classList.add('menu-link');;


        logo.textContent = 'filmoteka';
        mainPage.textContent = 'Главная страница';
        myFilmoteka.textContent = 'Моя фильмотека';

        app.append(header);
        header.append(logo);
        header.append(menu);
        menu.append(menuItemOne);
        menuItemOne.append(mainPage);
        menu.append(menuItemTwo);
        menuItemTwo.append(myFilmoteka);

    }


    footer() {
        const footer = document.createElement('footer');
        const copy = document.createElement('span');
        const team = document.createElement('a');


        footer.classList.add('footer');
        copy.classList.add('copy');
        team.classList.add('team');

        copy.textContent = 'Made with love by ';
        team.textContent = 'team one';

        team.setAttribute('href','#');


        app.append(footer);
        footer.append(copy);
        copy.append(team);
    }

    mainPage() {
        this.header();
        this.footer();
    }

}

