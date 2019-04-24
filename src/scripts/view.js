import { EventEmitter } from "events";
import debounce from "debounce";
import noavailable from "../img/noavailable.png";

// const card = {
//     "Title": "Guardians of the Galaxy Vol. 2",
//     "Year": "2017",
//     "Rated": "PG-13",
//     "Released": "05 May 2017",
//     "Runtime": "136 min",
//     "Genre": "Action, Adventure, Comedy, Sci-Fi",
//     "Director": "James Gunn",
//     "Writer": "James Gunn, Dan Abnett (based on the Marvel comics by), Andy Lanning (based on the Marvel comics by), Steve Englehart (Star-Lord created by), Steve Gan (Star-Lord created by), Jim Starlin (Gamora and Drax created by), Stan Lee (Groot created by), Larry Lieber (Groot created by), Jack Kirby (Groot created by), Bill Mantlo (Rocket Raccoon created by), Keith Giffen (Rocket Raccoon created by), Steve Gerber (Howard the Duck created by), Val Mayerik (Howard the Duck created by)",
//     "Actors": "Chris Pratt, Zoe Saldana, Dave Bautista, Vin Diesel",
//     "Plot": "The Guardians struggle to keep together as a team while dealing with their personal family issues, notably Star-Lord's encounter with his father the ambitious celestial being Ego.",
//     "Language": "English",
//     "Country": "USA",
//     "Awards": "Nominated for 1 Oscar. Another 12 wins & 42 nominations.",
//     "Poster": "https://m.media-amazon.com/images/M/MV5BMTg2MzI1MTg3OF5BMl5BanBnXkFtZTgwNTU3NDA2MTI@._V1_SX300.jpg",
//     "Ratings": [
//     {
//     "Source": "Internet Movie Database",
//     "Value": "7.7/10"
//     },
//     {
//     "Source": "Rotten Tomatoes",
//     "Value": "83%"
//     },
//     {
//     "Source": "Metacritic",
//     "Value": "67/100"
//     }
//     ],
//     "Metascore": "67",
//     "imdbRating": "7.7",
//     "imdbVotes": "458,168",
//     "imdbID": "tt3896198",
//     "Type": "movie",
//     "DVD": "22 Aug 2017",
//     "BoxOffice": "$389,804,217",
//     "Production": "Walt Disney Pictures",
//     "Website": "https://marvel.com/guardians",
//     "Response": "True"
// };

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
  
    }

    setListener(e) {

        if (e.target.textContent === 'Очередь просмотра') {
            this.emit('onViewLaterFilmsBtn');
        }
        if (e.target.textContent === 'Избранные') {
            this.emit('onFavotitesBtn');
        }

        if (e.target.textContent === 'Просмотренные') {
            this.emit('onViewedFilmsBtn');
        }

    }

    startPage() {
        this.header(this.app);
        this.footer(this.app);
    }
    // Очистка содержимого
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
        const logo = document.createElement("a");
        const logoSpanFirst = document.createElement("span");
        const i = document.createElement("i");
        const logoSpanSec = document.createElement("span");
        const menu = document.createElement("ul");
        const menuItemOne = document.createElement("li");
        const menuItemTwo = document.createElement("li");
        const mainPage = document.createElement("a");
        const myFilmoteka = document.createElement("a");

        // start routing
        myFilmoteka.addEventListener("click", e => {
          if (e.target.tagName !== "A") return;
          const state = {
            page: e.target.getAttribute("href")
          };

          this.makeFilmotekaPage();
          history.pushState(state, "", state.page);
          e.preventDefault();
          return this.emit('onViewLaterFilmsBtn');
        });

        mainPage.addEventListener("click", e => {
          if (e.target.tagName !== "A") return;
          this.t();
          this.startPage();
          this.mainPage();
          // const state = {
          //   page: e.target.getAttribute("href")
          // };
          history.pushState({}, "", "/");
          // history.replaceState({}, "", "");
          e.preventDefault();
        });

        // end routing

        header.classList.add("header");
        logo.classList.add("logo");
        i.classList.add("logo-icon");
        menu.classList.add("menu");
        menuItemOne.classList.add("menu-item");
        menuItemTwo.classList.add("menu-item");
        mainPage.classList.add("menu-link");
        myFilmoteka.classList.add("menu-link");

        mainPage.setAttribute("href", "/");
        myFilmoteka.setAttribute("href", "library.html");
        logo.setAttribute("href", "/");

        logoSpanFirst.textContent = "film";
        logoSpanSec.textContent = "teka";
        mainPage.textContent = "Главная страница";
        myFilmoteka.textContent = "Моя фильмотека";

        root.append(header);
        header.append(logo);
        logo.append(logoSpanFirst);
        logo.append(i);
        logo.append(logoSpanSec);
        header.append(menu);
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

        const cardList = document.querySelector('.card-list');
        
        const item = document.createElement("div");
        const title = document.createElement("p");
        const img = document.createElement("img");
        const link = document.createElement("a");

        item.classList.add("item");
        title.classList.add("card-title");
        img.classList.add("image");
        link.classList.add("card-link");

        link.addEventListener("click", this.getFilmID.bind(this));
        link.setAttribute("id", card.imdbID);

        // start routing for card==============================================

        link.addEventListener("click", e => {
            e.preventDefault();
            const idTarget = e.target.closest("a");
            const idT = idTarget.getAttribute("id");
            console.log(idT);
            const state = {
                page: idTarget.getAttribute("id")
            };
            console.log(state.page);
            history.pushState(state, "", "movie.html?imdbID=" + state.page);
            window.addEventListener("popstate", e => {
                e.preventDefault();
                if (document.location.pathname === "/") {
                    this.t();
                    this.startPage();
                    this.mainPage();
                    history.replaceState(state, "", "");
                } else if (document.location.pathname === "/movie.html") {
                    this.emit("onFilmID", idT);
                    history.replaceState(state, "", "movie.html?imdbID=" + state.page);
                }
            });
        });

        // end routing for card===================================================

        let imgSrc;
        card.Poster === "N/A" ? (imgSrc = noavailable) : (imgSrc = card.Poster);

        img.setAttribute("src", imgSrc);
        link.setAttribute("href", "");

        title.textContent = card.Title;

        item.append(link);
        link.append(title);
        link.append(img);
        cardList.append(item);

        return item;
    }

    makeCardPage(card, id) {
        // console.log('inside makeCard');
        const container = this.container(this.app);

        let cardRating =
            card.Ratings.length !== 0
                ? `${card.Ratings[0].Value}  (${card.imdbVotes} votes)`
                : null;

        const shownProp = {
            Awards: card.Awards,
            Rating: cardRating,
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

        // this.makeButton("Удалить из просмотренных", buttons);
        // this.makeButton("Запланировать просмотр", buttons);
        // this.makeButton("Добавить в избранное", buttons);
        this.createFilmPageButtons(id, buttons);

        for (const prop in shownProp) {
            if (shownProp.hasOwnProperty(prop)) {
                const infoKey = document.createElement("li");
                const keyValue = document.createElement("span");

                infoKey.textContent = `${prop}: `;
                keyValue.textContent = shownProp[prop];

                infoKey.classList.add("info-key");
                keyValue.classList.add("key-value");

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
    //add action
    //console.log('event=', event);
    let action = event.target.getAttribute("action");

    let result = { libraryListName, action };
    //console.log("result=", result);

    return this.emit("onHandleList", result);
  }

    //
  getDataAboutFilmFromLocalStorage(id) {
    //console.log('id=', id);
    this.emit("onCreateFilmPage", id);
  }

      createFilmPageButtons(id, root) {
    this.getDataAboutFilmFromLocalStorage(id);
    // console.log(
    //   "this.dataAboutFilmFromLocalStorage=",
    //   this.dataAboutFilmFromLocalStorage
    // );

    //viewedFilms
    const viewed = document.createElement("button");
    //console.log('this.addAttribute=', this.addAttribute);
    this.addAttribute(viewed, "viewedFilms");
    //console.log("viewed=", viewed);
    viewed.classList.add("button");
    //1 check for existing in some list and set a label and action attribute
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
    updateCardsList(arr) {
        this.clearCardsList();
        this.cardsRender(arr);
    }

    handlePagination(event) {
        if (event.target.nodeName !== "BUTTON") return;
        let btnType = event.target.attributes.btnname.value;
        let currPage = event.target.attributes.currPage.value;
        let numPages = event.target.attributes.numpages.value;
        // console.log("event=",event);
        // console.log("btnType=",btnType);
        // console.log("currPage=", currPage);
        // console.log("numPages=", numPages);
        // console.log("this=", this);
        return this.emit("onPagination", btnType, currPage, numPages);
    }

    createPaginationButton(btnName, currPage, numPages) {
        // console.log('object');
        // console.log("btnName=", btnName);
        //notactiveBtn
        const btn = document.createElement("button");
        btn.classList.add("button");
        btn.setAttribute("btnName", btnName);
        btn.setAttribute("currPage", currPage);
        btn.setAttribute("numPages", numPages);
        if (btnName === "Next" || btnName === "Prev") {
            btn.textContent = btnName;
            // console.log('this=',this);
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
        // console.log("btn in createPaginationButton=", btn);
        return btn;
    }

    clearStartMainPage() {
        const container = document.querySelector('.container');
        container.innerHTML = '';
    }

    makeFilmotekaPage() {
        const container = document.querySelector('.container');
        container.innerHTML = '';

        const buttons = document.createElement('div');
        buttons.classList.add('filmoteka-buttons');

        this.makeButton('Очередь просмотра', buttons);
        this.makeButton('Избранные', buttons);
        this.makeButton('Просмотренные', buttons);

        container.append(buttons);
        this.cardList(container);

        const firstBtn = buttons.querySelector('button');
        firstBtn.autofocus = true;
    }

    deleteAutofocus() {
        const firstBtn = document.querySelector('button');
        firstBtn.autofocus = false;
    }

    ifNothingToRender() {
        const cardList = document.querySelector('.card-list');
        const message = document.createElement('p');

        message.classList.add('message');
        message.textContent = "Нет данных для отображения";

        cardList.append(message);
    }

    cardsRender(arr) {
        arr.forEach(element => {
            this.makeCard(element);
        });
    }

    //create film page
    getFilmID(event) {
        // console.log("event=", event);
        // let parenDiv=event.target.closest('div');
        // console.log("parenDiv=", parenDiv);
        let target = event.target.closest("a");
        // console.log("target=", target);
        let id = target.getAttribute("id");
        return this.emit("onFilmID", id);
        // console.log("id=", id);
    }

    //show film page
    createFilmPage(data, id) {
        // console.log('data in view=', data);
        this.t();
        this.startPage();
        this.makeCardPage(data, id);
    }
}
