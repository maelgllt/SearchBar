const key = "n_aoknPpJnxtWjz37EIv0dsUv83U2ud2zyUtOxLFABg";

const formElt = document.querySelector("form");
const searchInput = document.querySelector("#search-input");
const searchResults = document.querySelector(".search-results");
const showMoreButton = document.querySelector("#show-more");

let inputData = "";
let page = 1;

async function searchImages() {
    inputData = searchInput.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&lang=fr&client_id=${key}`;

    const res = await fetch(url);
    const data = await res.json();
    if (page === 1){
        searchResults.innerHTML = "";
    }

    const results = data.results;

    results.map((result) => {
        const imgDiv = document.createElement("div");
        imgDiv.classList.add("search-result");

        const imgLink = document.createElement("a");
        imgLink.href = result.links.html;
        imgLink.target = "_blank";

        const img = document.createElement("img");
        img.src = result.urls.small;
        if (result.description) {
            img.alt = result.description;
        } else {
            img.alt = "Image sans description";
        }

        imgLink.appendChild(img); 
        imgDiv.appendChild(imgLink); 

        searchResults.appendChild(imgDiv);
    });

    page++;

    if(page > 1){
        showMoreButton.style.display = "block";
    }
}

formElt.addEventListener("submit", (e) => {
    e.preventDefault();
    page = 1;
    searchImages();
});

showMoreButton.addEventListener("click", () => {
    searchImages();
});


formElt.addEventListener("submit", (e) => {
    e.preventDefault();
    page = 1;
    searchImages();
});

showMoreButton.addEventListener("click", () => {
    searchImages();
})