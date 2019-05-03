import { EventEmitter } from "events";
import debounce from "debounce";
import noavailable from "../img/noavailable.png";

export default class View extends EventEmitter {
    constructor() {
        super();

        this.app = document.querySelector("#app");

        this.startPage();
        this.mainPage();

        this.input = this.app.querySelector(".input");
        this.input.addEventListener(
            "input",
            debounce(this.onInput.bind(this), 300)
        );

        //film page
        this.dataAboutFilmFromLocalStorage = null;
        this.filmPageBtnText = {
            viewedFilms: {
                add: "Отметить как просмотренный",
                remove: "Удалить из просмотренных"
            },
            viewLaterFilms: {
                add: "Запланировать просмотр",
                remove: "Отменить просмотр"
            },
            favoriteFilms: {
                add: "Добавить в избранное",
                remove: "Удалить из избранного"
            }
        };

        this.app.addEventListener("click", this.setListener.bind(this));
        window.addEventListener('popstate', this.popStateEmit.bind(this));
    }


    setListener(e) {

        if (e.target.textContent === "Очередь просмотра") {
            this.emit("onViewLaterFilmsBtn");
        }
        if (e.target.textContent === "Избранные") {
            this.emit("onFavotitesBtn");
        }

        if (e.target.textContent === "Просмотренные") {
            this.emit("onViewedFilmsBtn");
        }

        if (e.target.textContent === "Моя фильмотека") {
            this.emit("onFilmotekaLink", e);
        }

        if (e.target.textContent === "Главная страница") {
            this.emit("onMainLink", e);
        }

        if(e.target.closest("a") === null) {
            return;
        } 

        if (e.target.closest("a").classList.value === 'logo') {
            this.emit("onLogoLink", e);
        }
        if (e.target.closest("a").classList.value === 'card-link') {
            this.emit("onCardLink", e);
        }
        
    }

    popStateEmit(e) {
        this.emit("onPopState", e);
    }

    startPage() {
        this.header(this.app);
        this.footer(this.app);
    }

    clearStarMaintPage() {
        this.app.innerHTML = "";
    }

    container(root) {
        const container = document.createElement("div");
        container.classList.add("container");
        root.append(container);
        return container;
    }

    cardList(root) {
        const cardList = document.createElement("div");
        cardList.classList.add("card-list");
        root.append(cardList);
        return cardList;
    }

    header(root) {
        const header = document.createElement("header");
        const headerCont = document.createElement('div');
        const logo = document.createElement("a");
        const logoSpanFirst = document.createElement("span");
        const i = document.createElement("i");
        const logoSpanSec = document.createElement("span");
        const menu = document.createElement("ul");
        const menuItemOne = document.createElement("li");
        const menuItemTwo = document.createElement("li");
        const mainPage = document.createElement("a");
        const myFilmoteka = document.createElement("a");


        header.classList.add("header");
        headerCont.classList.add('header-container');
        logo.classList.add("logo");
        i.classList.add("logo-icon");
        menu.classList.add("menu");
        menuItemOne.classList.add("menu-item");
        menuItemTwo.classList.add("menu-item");
        mainPage.classList.add("main-page-link");
        myFilmoteka.classList.add("filmoteka-link");

        mainPage.setAttribute("href", "/");
        myFilmoteka.setAttribute("href", "library.html");
        logo.setAttribute("href", "/");

        logoSpanFirst.textContent = "film";
        logoSpanSec.textContent = "teka";
        mainPage.textContent = "Главная страница";
        myFilmoteka.textContent = "Моя фильмотека";

        root.append(header);
        header.append(headerCont);
        headerCont.append(logo);
        logo.append(logoSpanFirst);
        logo.append(i);
        logo.append(logoSpanSec);
        headerCont.append(menu);
        menu.append(menuItemOne);
        menuItemOne.append(mainPage);
        menu.append(menuItemTwo);
        menuItemTwo.append(myFilmoteka);
    }

    footer(root) {
        const footer = document.createElement("footer");
        const copy = document.createElement("span");
        const copyFirst = document.createElement("span");
        const copySec = document.createElement("span");
        const i = document.createElement("i");
        const team = document.createElement("a");

        footer.classList.add("footer");
        copy.classList.add("copy");
        team.classList.add("team");
        i.classList.add("heart-icon");

        copyFirst.textContent = "Made with ";
        copySec.textContent = " by ";
        team.textContent = "team one";

        team.setAttribute("href", "#");

        root.append(footer);
        footer.append(copy);
        copy.append(copyFirst);
        copy.append(i);
        copy.append(copySec);
        copy.append(team);
    }

    form(root) {
        const input = document.createElement("input");

        input.classList.add("input");
        // adding event listener to input when it was created (fixed a bug)
        input.addEventListener("input", debounce(this.onInput.bind(this), 300));
        root.append(input);
    }

    title(root) {
        const title = document.createElement("h1");
        title.classList.add("title");
        title.textContent = "Персональная фильмотека";
        root.append(title);
    }

    mainPage() {
        const container = this.container(this.app);
        this.title(container);
        this.form(container);
        this.cardList(container);
    }

    makeCard(card) {
        const cardList = document.querySelector(".card-list");

        const item = document.createElement("div");
        const title = document.createElement("p");
        const rating = document.createElement('span');
        const img = document.createElement("img");
        const link = document.createElement("a");

        item.classList.add("item");
        title.classList.add("card-title");
        rating.classList.add('rating');
        img.classList.add("image");
        link.classList.add("card-link");

        link.addEventListener("click", this.getFilmID.bind(this));

        let imgSrc;
        card.Poster === "N/A" ? (imgSrc = noavailable) : (imgSrc = card.Poster);

        img.setAttribute("src", imgSrc);
        link.setAttribute("href", card.imdbID);

        title.textContent = `${card.Title}   `;
        rating.textContent = card.imdbRating;

        item.append(link);
        link.append(title);

        if(rating.textContent != '') {
            title.append(rating);
        }

        link.append(img);
        cardList.append(item);

        return item;
    }

    makeCardPage(card, id) {

        const container = this.container(this.app);

        let cardRating =
            card.Ratings.length !== 0
                ? `${card.Ratings[0].Value}`
                : null;

        let cardVotes = 
            card.imdbVotes !== ''
            ? `${card.imdbVotes} votes`
            : null;

        const shownProp = {
            Awards: card.Awards,
            Rating: cardRating,
            '': cardVotes,
            Actors: card.Actors,
            Country: card.Country,
            Genre: card.Genre,
            Runtime: card.Runtime
        };

        const cardPage = document.createElement("div");
        const cardImage = document.createElement("div");
        const img = document.createElement("img");
        const cardInfo = document.createElement("div");
        const cardTitle = document.createElement("h2");
        const description = document.createElement("p");
        const cardYear = document.createElement("span");
        const cardList = document.createElement("ul");
        const buttons = document.createElement("div");

        cardPage.classList.add("card-page");
        cardImage.classList.add("image-wrapper");
        cardTitle.classList.add("cardPage-title");
        description.classList.add("desc");
        cardYear.classList.add("card-year");
        img.classList.add("card-image");
        cardInfo.classList.add("card-info");
        cardList.classList.add("card-info__list");
        buttons.classList.add("buttons");

        let imgSrc;
        card.Poster === "N/A" ? (imgSrc = noavailable) : (imgSrc = card.Poster);

        img.setAttribute("src", imgSrc);

        description.textContent = card.Plot;
        cardTitle.textContent = card.Title;
        cardYear.textContent = card.Year;

        container.append(cardPage);
        cardPage.append(cardImage);
        cardImage.append(img);

        cardPage.append(cardInfo);
        cardInfo.append(cardTitle);
        cardInfo.append(description);
        cardTitle.append(cardYear);
        cardInfo.append(cardList);
        cardInfo.append(buttons);

        this.createFilmPageButtons(id, buttons);

        for (const prop in shownProp) {
            if (shownProp.hasOwnProperty(prop)) {
                const infoKey = document.createElement("li");
                const keyValue = document.createElement("span");
                const votes = document.createElement('span');

                if(shownProp[prop] == 'N/A') {
                    shownProp[prop] = 'Нет данных.';
                } 

                if(shownProp[prop] === cardVotes) {

                    votes.textContent = shownProp[prop];
                    votes.classList.add('votes');
                    infoKey.append(keyValue);
                    keyValue.append(votes);

                } else {
                    infoKey.textContent = `${prop}: `;
                    keyValue.textContent = shownProp[prop];
                }

                infoKey.classList.add("info-key");
                keyValue.classList.add("key-value");
                votes.classList.add('votes');

                cardList.append(infoKey);
                infoKey.append(keyValue);
            }
        }

    }
    //add some attribute to btn
    addAttribute(DOMElement, attribute) {
        return DOMElement.setAttribute("library-list", attribute);
    }
    addActionAtrribute(DOMElement, action) {
        return DOMElement.setAttribute("action", action);
    }
    //take library list name and action type (add/delete) from btn
    takeListNameAndAction(event) {
        let libraryListName = event.target.getAttribute("library-list");
        let action = event.target.getAttribute("action");
        let result = { libraryListName, action };

        return this.emit("onHandleList", result);
    }

    getDataAboutFilmFromLocalStorage(id) {
        this.emit("onCreateFilmPage", id);
    }

    createFilmPageButtons(id, root) {

        this.getDataAboutFilmFromLocalStorage(id);
        const viewed = document.createElement("button");

        this.addAttribute(viewed, "viewedFilms");

        viewed.classList.add("button");

        if (!this.dataAboutFilmFromLocalStorage.viewedFilms) {
            this.addActionAtrribute(viewed, "add");
            viewed.textContent = this.filmPageBtnText.viewedFilms.add;
        } else {
            this.addActionAtrribute(viewed, "remove");
            viewed.textContent = this.filmPageBtnText.viewedFilms.remove;
        }
        //2 take info about list and action
        viewed.addEventListener("click", this.takeListNameAndAction.bind(this));
        //3 change label after click
        viewed.addEventListener("click", this.changeActionAndLabel.bind(this));
        root.append(viewed);
        //viewLaterFilms
        const planed = document.createElement("button");
        planed.classList.add("button");
        this.addAttribute(planed, "viewLaterFilms");

        //1 check for existing in some list and set a label
        if (!this.dataAboutFilmFromLocalStorage.viewLaterFilms) {
            this.addActionAtrribute(planed, "add");
            planed.textContent = this.filmPageBtnText.viewLaterFilms.add;
        } else {
            this.addActionAtrribute(planed, "remove");
            planed.textContent = this.filmPageBtnText.viewLaterFilms.remove;
        }
        //2 take info about list and action
        planed.addEventListener("click", this.takeListNameAndAction.bind(this));
        //3 change label after click
        planed.addEventListener("click", this.changeActionAndLabel.bind(this));

        root.append(planed);
        //favoriteFilms
        const favourites = document.createElement("button");
        favourites.classList.add("button");
        this.addAttribute(favourites, "favoriteFilms");
        //1 check for existing in some list and set a label
        if (!this.dataAboutFilmFromLocalStorage.favoriteFilms) {
            this.addActionAtrribute(favourites, "add");
            favourites.textContent = this.filmPageBtnText.favoriteFilms.add;
        } else {
            this.addActionAtrribute(favourites, "remove");
            favourites.textContent = this.filmPageBtnText.favoriteFilms.remove;
        }
        //2 take info about list and action
        favourites.addEventListener("click", this.takeListNameAndAction.bind(this));
        //3 change label after click
        favourites.addEventListener("click", this.changeActionAndLabel.bind(this));
        root.append(favourites);
    }

    changeActionAndLabel(event) {
        if (event.target.nodeName !== "BUTTON") return;
        let action = event.target.getAttribute("action");
        let list = event.target.getAttribute("library-list");
        let label = "";
        if (action === "add") {
            action = "remove";
            label = this.filmPageBtnText[list].remove;
        } else {
            action = "add";
            label = this.filmPageBtnText[list].add;
        }
        this.addActionAtrribute(event.target, action);
        event.target.textContent = label;
    }

    makeButton(text, root) {
        const button = document.createElement("button");
        button.classList.add("button");
        button.textContent = text;
        root.append(button);
    }

    //handle search methods
    clearInput(event) {
        return (event.target.value = "");
    }

    onInput(event) {
        let inputText = event.target.value;
        if (inputText === "") {
            this.clearCardsList();
        }
        this.emit("onInputFilmName", inputText);
    }

    //clear search results
    clearCardsList() {
        const cardList = document.querySelector(".card-list");
        cardList.innerHTML = "";
    }

    //render search results
    updateCardsList(model) {

        const cardList = document.querySelector(".card-list");
        const titleToTop = document.querySelector('.title');

        this.clearCardsList();
        titleToTop.classList.add('title-padding');

        let items = [];
        model.queryFilmList.forEach(item => {

            let newCard = this.makeCard(item);
            items.push(newCard);
            cardList.append(newCard);
        });

        // Работа с страницами поиска

        const currPage = model.lastPage;
        const numPages = Math.ceil(model.lastQueryTotal / 10);

        const controls = document.createElement("div");
        controls.classList.add("controls");

        const prev = this.createPaginationButton("Prev", currPage, numPages);
        controls.append(prev);
        const pages = this.createPaginationButton("Pages", currPage, numPages);
        controls.append(pages);
        const next = this.createPaginationButton("Next", currPage, numPages);
        controls.append(next);
        //console.log('model=', model);
        if (model.queryFilmList.length === 0) return;
        cardList.append(controls);
    }

    handlePagination(event) {
        if (event.target.nodeName !== "BUTTON") return;
        let btnType = event.target.attributes.btnname.value;
        let currPage = event.target.attributes.currPage.value;
        let numPages = event.target.attributes.numpages.value;

        return this.emit("onPagination", btnType, currPage, numPages);
    }

    createPaginationButton(btnName, currPage, numPages) {
        const btn = document.createElement("button");
        btn.classList.add("button");
        btn.setAttribute("btnName", btnName);
        btn.setAttribute("currPage", currPage);
        btn.setAttribute("numPages", numPages);
        if (btnName === "Next" || btnName === "Prev") {
            btn.textContent = btnName;

            if (currPage === 1 && btnName === "Prev") {
                btn.disabled = true;
                btn.classList.add("notactiveBtn");
            }
            if (currPage == numPages && btnName === "Next") {
                btn.disabled = true;
                btn.classList.add("notactiveBtn");
            }
            btn.addEventListener("click", this.handlePagination.bind(this));
        }
        if (btnName === "Pages") {
            btn.textContent = currPage + " / " + numPages;
            btn.disabled = true;
            btn.classList.add("notactiveBtn");
        }

        return btn;
    }

    clearStartMainPage() {
        const container = document.querySelector(".container");
        container.innerHTML = "";
    }

    makeLibraryButton(text, root) {

        const button = document.createElement("button");
        button.classList.add("button");

        button.classList.add("btn-filmoteka");

        button.textContent = text;
        button.addEventListener("click", this.switchBtn);
        root.append(button);
    }
    //switch marked buttons
    switchBtn(event) {

        if (event.target.nodeName !== "BUTTON") return;
        const parentNode = event.target.parentNode;

        parentNode.childNodes.forEach(node => node.classList.remove("activ-btn"));
        event.target.classList.add("activ-btn");
    }

    makeFilmotekaPage() {
        const container = document.querySelector(".container");
        container.innerHTML = "";

        const buttons = document.createElement("div");
        buttons.classList.add("filmoteka-buttons");

        this.makeLibraryButton("Очередь просмотра", buttons);
        this.makeLibraryButton("Избранные", buttons);
        this.makeLibraryButton("Просмотренные", buttons);

        container.append(buttons);
        this.cardList(container);

        const firstBtn = buttons.querySelector("button");
        firstBtn.classList.add("activ-btn");

    }

    deleteAutofocus() {
        const firstBtn = document.querySelector("button");
        firstBtn.autofocus = false;
    }

    ifNothingToRender() {
        const cardList = document.querySelector(".card-list");
        const message = document.createElement("p");

        message.classList.add("message");
        message.textContent = "Нет данных для отображения";

        cardList.append(message);
    }

    cardsRender(arr) {
        //console.log("arr=", arr);
        arr.forEach(element => {
            this.makeCard(element);
        });
    }

    //create film page
    getFilmID(event) {

        let target = event.target.closest("a");
        let id = target.getAttribute("href");
        return this.emit("onFilmID", id);

    }

    //show film page
    createFilmPage(data, id) {

        this.clearStarMaintPage();
        this.startPage();
        this.makeCardPage(data, id);
    }
}
