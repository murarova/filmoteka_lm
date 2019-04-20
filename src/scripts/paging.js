import callApi from './services/callApi';
let numberOfPages = 5;
let currentPage = 1;

const container = document.querySelector('#app');
const prev = document.createElement('button');
const next = document.createElement('button');
const pageNum = document.createElement('p');

prev.textContent = 'Previous';
prev.addEventListener('click', prevPage);
prev.disabled = true;
next.textContent = 'Next';
next.addEventListener('click', nextPage);

function paging() {

    // callApi('iron', currentPage).then(data => {
    //     let nop = data.totalResults;
    //     console.log(nop);
    //     numberOfPages = Math.ceil(nop / 10);
    console.log(numberOfPages);
    localStorage.setItem('numPages', numberOfPages);

    pageNum.textContent = currentPage + ' / ' + localStorage.getItem('numPages');

    container.append(prev);
    container.append(pageNum);
    container.append(next);
    // })

}

function nextPage() {
    currentPage++;
    pageNum.textContent = currentPage + ' / ' + localStorage.getItem('numPages');
        prev.disabled = false;
    if (currentPage == localStorage.getItem('numPages')) {
        next.disabled = true;
    }
}

function prevPage() {
    currentPage--;
    pageNum.textContent = currentPage + ' / ' + localStorage.getItem('numPages');
        next.disabled = false;
    if (currentPage == 1) {
        prev.disabled = true;
    }
}


paging();
