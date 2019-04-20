import { EventEmitter } from "events";

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
    // this.makeFilmotekaPage();
    // this.makeCardPage(card);

    this.form = this.app.querySelector(".form");
    // console.log('this.form=', this.form);
    this.form.addEventListener("submit", this.handleSearch.bind(this));
  }

  startPage() {
    this.header(app);
    this.footer(app);
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
    myFilmoteka.addEventListener("click", function(e) {
      if (e.target.tagName !== "A") return;

      const state = {
        page: e.target.getAttribute("href")
      };
      history.pushState(state, "", state.page);
      //   updateState(state);
      e.preventDefault();
    });
    mainPage.addEventListener("click", function(e) {
      if (e.target.tagName !== "A") return;
      const state = {
        page: e.target.getAttribute("href")
      };
      history.pushState(state, "", state.page);
      //   updateState(state);
      e.preventDefault();
    });

    // function updateState(state) {
    //   if (!state) return;
    //   const container = this.container(this.app);
    //   container.innerHTML = "123";
    // }
    // window.addEventListener("popstate", function(e) {
    //   updateState(e.state);
    // });

    // const content = {
    //   index:
    //     "Render main",
    //   library:
    //     "Render library",
    //   movie:
    //     "Render movie"
    // };
    // const contentSite = document.querySelector(".content");

    // function updateState(state) {
    //   if (!state) return;
    //   contentSite.innerHTML = content[state.page];
    // }
    // end routing
    header.classList.add("header");
    logo.classList.add("logo");
    i.classList.add("logo-icon");
    menu.classList.add("menu");
    menuItemOne.classList.add("menu-item");
    menuItemTwo.classList.add("menu-item");
    mainPage.classList.add("menu-link");
    myFilmoteka.classList.add("menu-link");

    mainPage.setAttribute("href", "mainPage");
    myFilmoteka.setAttribute("href", "filmoteka");
    logo.setAttribute("href", "#");

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
    const form = document.createElement("form");
    const input = document.createElement("input");

    form.classList.add("form");
    input.classList.add("input");

    form.append(input);
    root.append(form);
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
    const cardList = this.cardList(container);
    // this.makeCard(a, cardList);
    // this.makeCard(a, cardList);
    // this.makeCard(a, cardList);
    // this.makeCard(a, cardList);
    // this.makeCard(a, cardList);
    // this.makeCard(a, cardList);
  }

  makeCard(card, root) {
    const item = document.createElement("div");
    const title = document.createElement("p");
    const img = document.createElement("img");
    const link = document.createElement("a");

    item.classList.add("item");
    title.classList.add("card-title");
    img.classList.add("image");
    link.classList.add("card-link");

    img.setAttribute("src", card.Poster);
    link.setAttribute("href", "#");

    title.textContent = card.Title;

    item.append(link);
    link.append(title);

    link.append(img);
    root.append(item);

    return item;
  }

  makeCardPage(card) {
    const container = this.container(this.app);

    const shownProp = {
      Awards: card.Awards,
      Rating: `${card.Ratings[0].Value}  (${card.imdbVotes} votes)`,
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

    //
    buttons.classList.add("buttons");

    img.setAttribute("src", card.Poster);

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

    this.makeButton("Удалить из просмотренных", buttons);
    this.makeButton("Запланировать просмотр", buttons);
    this.makeButton("Добавить в избранное", buttons);

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

  makeButton(text, root) {
    const button = document.createElement("button");
    button.classList.add("button");
    // for my filmoteka
    button.classList.add("btn-filmoteka");
    button.textContent = text;
    root.append(button);
  }
  makeFilmotekaPage() {
    const container = this.container(this.app);
    // const divBtn = document.createElement("div");

    this.makeButton("Очередь просмотра", container);
    this.makeButton("Избранные", container);
    this.makeButton("Просмотренные", container);

    const line = document.createElement("div");
    line.classList.add("line");
    container.append(line);
  }

  //handle search methods
  clearInput(event) {
    return (event.target[0].value = "");
  }

  handleSearch(event) {
    event.preventDefault();
    let input = event.target[0];
    let inputFilmName = input.value;
    this.emit("onInputFilmName", inputFilmName);
    this.clearInput(event);
    // console.log('inputFilmName=', inputFilmName);
  }

  updateCardsList(model) {
    console.log("model in view", model);
    // console.log('model.queryFilmList=', model.queryFilmList);
    // console.log('lastQueryTotal=', lastQueryTotal);
    console.log("model.queryFilmList=", model.queryFilmList);
    if (model.queryFilmList && model.lastQueryTotal) {
      const cardList = this.cardList(container);
      model.queryFilmList.forEach(element => {
        this.makeCard(element, cardList);
      });
    }
  }
}
