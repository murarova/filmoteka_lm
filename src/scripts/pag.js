// const content = {
//     index: "Главная страница сделать рендер Главная страница сделать рендер Главная страница сделать рендер Главная страница сделать рендер",
//     library: "Библиотека сделать рендерg Библиотека сделать рендерg Библиотека сделать рендерg",
//     movie: "Ирформация о фильме сделать рендер Ирформация о фильме сделать рендер Ирформация о фильме сделать рендер"
//   };
//   const contentSite = document.querySelector(".content");
//   const nav = document.querySelector(".nav");
  
//   function updateState(state) {
//     if (!state) return;
//     contentSite.innerHTML = content[state.page];
//   }
//   window.addEventListener("popstate", function(e) {
//     updateState(e.state);
//   });