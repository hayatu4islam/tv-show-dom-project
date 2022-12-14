//You can edit ALL of the code here
/*
fetch("https://api.tvmaze.com/shows")
    // Get the response and extract the JSON
    .then(function (response) {
      return response.json();
    })
    // Do something with the JSON
    .then((episodes) => {
      console.log(episodes);
      allEpisodes = episodes;
      makePageForEpisodes(allEpisodes);
      selectFunc();
    })
    // If something goes wrong
    .catch((error) => console.log(error));
  // const oneEpi = getOneEpisode();
*/
let allShows;
let allEpisodes;
function setup() {
  // var allEpisodes = getAllEpisodes();

  // fetch("https://api.tvmaze.com/shows/82/episodes")
  fetch("https://api.tvmaze.com/shows")
    // Get the response and extract the JSON
    .then(function (response) {
      return response.json();
    })
    // Do something with the JSON
    .then((shows) => {
      console.log(shows);
      allShows = shows;
      // makePageForEpisodes(allShows);
      makePageForShows(allShows);
      //   selectFunc();
      selectShowFunc();
    })
    // If something goes wrong
    .catch((error) => console.log(error));
  // const oneEpi = getOneEpisode();
}

var containerHead = document.createElement("div");
containerHead.setAttribute("class", "container-head");
document.body.prepend(containerHead);

const selectShow = document.createElement("select");
selectShow.marginLeft = "170px";
containerHead.appendChild(selectShow);
const showOption = document.createElement("option");
showOption.value = -20;
showOption.text = "All Shows";
selectShow.appendChild(showOption);

const selectEpisode = document.createElement("select");
selectShow.style.marginLeft = "70px";
containerHead.appendChild(selectEpisode);
const option = document.createElement("option");
option.value = -10;
option.text = "All Episodes";
selectEpisode.appendChild(option);

var showCount = 0;
const selectShowFunc = () => {
  allShows.forEach((show) => {
    const opt = document.createElement("option");
    opt.value = showCount;
    showCount++;
    opt.text = `${show.name}`;
    selectShow.appendChild(opt);
  });
};

// var counter = 0;
// // select.firstElementChild('[value="basic"]').remove();
// // allEpisodes = getAllEpisodes();
// const selectFunc = () => {
//   allEpisodes.forEach((episode) => {
//     const opt = document.createElement("option");
//     opt.value = counter;
//     counter++;
//     // opt.innerText = `${episodeCode(episode.season, episode.number)} - ${episode.name}`;
//     opt.text = `${episodeCode(episode.season, episode.number)} - ${
//       episode.name
//     }`;
//     select.appendChild(opt);
//   });
// };

const searchShowsField = document.createElement("input");
searchShowsField.id = "input";
searchShowsField.setAttribute("autocomplete", "off");
searchShowsField.setAttribute("placeholder", "Search for episodes");
containerHead.appendChild(searchShowsField);

//--------------POPULATE THE SHOW LIST -----------------

// ----------UPDATE EPISODE LISTS ON INPUT-----------------------

const rootElement = document.getElementById("root");
const matchEpisodeDisplay = document.createElement("label");
// matchEpisodeDisplay.innerHTML = " Displaying 73 / 73 episodes";
matchEpisodeDisplay.innerHTML = " ";
matchEpisodeDisplay.setAttribute("class", "displayLabel");
containerHead.appendChild(matchEpisodeDisplay);

searchShowsField.addEventListener("keyup", (e) => {
  let episodesFound = "";
  // let allEpisodes = getAllEpisodes();
  let currentValue = e.target.value.toLowerCase();
  rootElement.innerHTML = "";
  episodesFound = allEpisodes.filter(
    (epi) =>
      epi.name.toLowerCase().includes(currentValue) ||
      epi.summary.toLowerCase().includes(currentValue)
  );
  makePageForEpisodes(episodesFound);
  matchEpisodeDisplay.innerHTML = ` Displaying ${episodesFound.length} / ${allEpisodes.length} episodes`;
});

selectShow.addEventListener("change", (e) => {
  let selectedShow = "";
  matchEpisodeDisplay.innerHTML = " ";
  // let allEpisodes = getAllEpisodes();
  if (selectShow.value >= 0) {
    selectedShow = [allShows[selectShow.value]];
    // selectedEpisode = allEpisodes;
  } else {
    selectedShow = allShows;
    
  }
  rootElement.innerHTML = "";
  makePageForShows(selectedShow);
});

var counter = 0;
// select.firstElementChild('[value="basic"]').remove();
// allEpisodes = getAllEpisodes();
const selectFunc = () => {
  allEpisodes.forEach((episode) => {
    const opt = document.createElement("option");
    opt.value = counter;
    counter++;
    // opt.innerText = `${episodeCode(episode.season, episode.number)} - ${episode.name}`;
    opt.text = `${episodeCode(episode.season, episode.number)} - ${
      episode.name
    }`;
    select.appendChild(opt);
  });
};

selectEpisode.addEventListener("change", (e) => {
  let showNum = 0;
  let url = `https://api.tvmaze.com/shows/${showNum}/episodes`;
  fetch(url)
    // Get the response and extract the JSON
    .then(function (response) {
      return response.json();
    })
    // Do something with the JSON
    .then((episodes) => {
      console.log(episodes);
      allEpisodes = episodes;
      // makePageForEpisodes(allShows);
      makePageForEpisodes(allEpisodes);
      //   selectFunc();
      selectFunc();
    })
    // If something goes wrong
    .catch((error) => console.log(error));

  let selectedEpisode = "";
  matchEpisodeDisplay.innerHTML = " ";
  // let allEpisodes = getAllEpisodes();
  if (selectEpisode.value >= 0) {
    selectedEpisode = [allEpisodes[selectEpisode.value]];
    // selectedEpisode = allEpisodes;
  } else {
    selectedEpisode = allEpisodes;
    matchEpisodeDisplay.innerHTML = " Displaying 73 / 73 episodes";
    // selectedEpisode = [allEpisodes[select.value]];
  }
  rootElement.innerHTML = "";
  makePageForEpisodes(selectedEpisode);
});


function makePageForShows(showList) {
  // console.log(episodeList);
  const rootElem = document.getElementById("root");
  rootElem.className = "root";

  showList.forEach((show) => {
    const showsContainer = document.createElement("div");
    showsContainer.setAttribute("class", "episode-container");
    rootElem.appendChild(showsContainer);
    // rootElem.className = "root"
    const showName = document.createElement("h3");
    showName.className = "episode-name";
    showName.innerText = `${show.name}`;
    showsContainer.appendChild(showName);
    // Create an image
    const showImage = document.createElement("img");
    showImage.setAttribute("src", show.image.medium);
    showsContainer.appendChild(showImage);
    // Add the summary
    const showSummary = document.createElement("p");
    showSummary.innerHTML = show.summary;
    showSummary.className = "summary-text";
    showsContainer.appendChild(showSummary);
  });

  // Add footer container to state where the source of the data used.
  const footerContainer = document.createElement("div");
  footerContainer.setAttribute("class", "footer-container");
  rootElem.appendChild(footerContainer);
  const footerText = document.createElement("p");
  footerText.className = "footer-text";
  footerText.innerHTML =
    "The data used in this page is originally from <a href='https://www.tvmaze.com/'>TVMaze.com</a>";
  footerContainer.appendChild(footerText);
  footerText.style.textAlign = "center";
  footerText.style.color = "purple";
}

// ---------------MAKE PAGE FOR EPISODES FUNCTION---------------------
function makePageForEpisodes(episodeList) {
  // console.log(episodeList);
  const rootElem = document.getElementById("root");
  rootElem.className = "root";

  episodeList.forEach((episode) => {
    const episodesContainer = document.createElement("div");
    episodesContainer.setAttribute("class", "episode-container");
    rootElem.appendChild(episodesContainer);
    // rootElem.className = "root"
    const episodeName = document.createElement("h3");
    episodeName.className = "episode-name";
    episodeName.innerText = `${episode.name} - ${episodeCode(
      episode.season,
      episode.number
    )}`;
    episodesContainer.appendChild(episodeName);
    // Create an image
    const episodeImage = document.createElement("img");
    episodeImage.setAttribute("src", episode.image.medium);
    episodesContainer.appendChild(episodeImage);
    // Add the summary
    const episodeSummary = document.createElement("p");
    episodeSummary.innerHTML = episode.summary;
    episodeSummary.className = "summary-text";
    episodesContainer.appendChild(episodeSummary);
  });

  // Add footer container to state where the source of the data used.
  const footerContainer = document.createElement("div");
  footerContainer.setAttribute("class", "footer-container");
  rootElem.appendChild(footerContainer);
  const footerText = document.createElement("p");
  footerText.className = "footer-text";
  footerText.innerHTML =
    "The data used in this page is originally from <a href='https://www.tvmaze.com/'>TVMaze.com</a>";
  footerContainer.appendChild(footerText);
  footerText.style.textAlign = "center";
  footerText.style.color = "purple";
}
//--------------------END OF THE MAKEPAGEFOREPISODE() FUNCTION-------------------------

function showCode() {}

function episodeCode(season, number) {
  season = season < 10 ? "0" + season : season;
  number = number < 10 ? "0" + number : number;
  return `S${season}E${number}`;
}

window.onload = setup;
