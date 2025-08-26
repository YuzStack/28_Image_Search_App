"use strict";

// Unsplash API access key for integration and tracking
const accessKey = "RZEIOVfPhS7vMLkFdd2TSKGFBS4o9_FmcV1Nje3FSjw";

const formEl = document.querySelector("form");
const inputEl = document.querySelector("#search-input");
const searchResultsEl = document.querySelector(".search-results");
const showMoreBtnEl = document.querySelector("#show-more-button");
const clearInputBtn = document.querySelector(".clear-button");

let page = 1;

async function searchImages() {
  const searchQuery = inputEl.value;

  if (searchQuery === "") {
    alert("Please input something!");

    // Sets focus to the input element
    inputEl.focus();
  } else {
    // Construct the full API request URL
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${searchQuery}&client_id=${accessKey}`;

    const response = await fetch(url);

    // Convert the raw response into JavaScript object (data)
    const data = await response.json();
    // console.log(data);

    // Clears the old search query results
    if (page === 1) searchResultsEl.innerHTML = "";

    // Extracts just the results array from the API response.
    const results = data.results;

    // Hint: Each result is one image object from Unsplash
    results.map((result) => {
      const cardContainer = document.createElement("div");
      cardContainer.classList.add("search-result");

      const image = document.createElement("img");
      image.src = result.urls.small;
      image.alt = result.alt_description;

      const imageLink = document.createElement("a");
      imageLink.href = result.links.html;
      imageLink.target = "_blank";
      imageLink.textContent = result.alt_description;

      cardContainer.append(image, imageLink);
      searchResultsEl.append(cardContainer);

      page++;

      if (page > 1) showMoreBtnEl.style.display = "block";
    });
  }
}

formEl.addEventListener("submit", (e) => {
  e.preventDefault();

  page = 1;

  searchImages();
});

showMoreBtnEl.addEventListener("click", searchImages);

/* // The clear input button functionality (Error: CSS, not resposive)‼️
inputEl.addEventListener('input', () => {
  clearInputBtn.style.display = 'block';
});

clearInputBtn.addEventListener('click', () => {
  inputEl.value = '';
  inputEl.focus();
  clearInputBtn.style.display = 'none';
}); */
