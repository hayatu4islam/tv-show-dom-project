//You can edit ALL of the code here
function setup() {
  var allEpisodes = getAllEpisodes();
  const oneEpi = getOneEpisode();
  // console.log(oneEpi);
  makePageForEpisodes(allEpisodes);
}

var containerHead = document.createElement("div");
containerHead.setAttribute("class", "container-head");
document.body.prepend(containerHead);

const searchField = document.createElement("input");
searchField.id = "input";
searchField.setAttribute("autocomplete", "off");
searchField.setAttribute("placeholder", "Search for episodes");
containerHead.appendChild(searchField);


// ----------UPDATE EPISODE LISTS-----------------------
// const searchField = document.getElementById("input");
const rootElement = document.getElementById("root");
const matchEpisodeDisplay = document.createElement("label");
// matchEpisodeDisplay.innerHTML = "";
matchEpisodeDisplay.innerHTML = "73 / 73 Episodes are found";
matchEpisodeDisplay.setAttribute("class", "displayLabel");
containerHead.appendChild(matchEpisodeDisplay);

searchField.addEventListener("keyup", modifyEpisodes);
let episodesFound = "";

let allEpisodes = getAllEpisodes();
function modifyEpisodes(e){
  let currentValue = e.target.value.toLowerCase();
  rootElement.innerHTML = "";
  episodesFound = allEpisodes.filter(
    (ep) =>
    ep.name.toLowerCase().includes(currentValue) ||
    ep.summary.toLowerCase().includes(currentValue));
    console.log(episodesFound);
    makePageForEpisodes(episodesFound);
    matchEpisodeDisplay.innerHTML = ` ${episodesFound.length} / ${allEpisodes.length} Episodes are found`;
  }

  // searchField.addEventListener("keyup", (e) => {
  //   // console.log(e.target.value);
  //   const episodes = getAllEpisodes();
  //   let episodesFound = "";
  //   episodesFound = episodes.filter((epi) => {
  //     epi.name.toLowerCase().includes(e.target.value.toLowerCase()) || epi.summary.toLowerCase().includes(e.target.value.toLowerCase());
  //   });
  //   makePageForEpisodes(episodesFound);
  // });
// }


// ---------------MAKE PAGE FOR EPISODES FUNCTION---------------------
function makePageForEpisodes(episodeList) {
  // console.log(episodeList);
  const rootElem = document.getElementById("root");
  rootElem.className = "root";
  // rootElem.textContent = `Got ${episodeList.length} episode(s)`;

  episodeList.forEach((episode) => {
    const episodesContainer = document.createElement("div");
    episodesContainer.setAttribute("class", "episode-container");
    rootElem.appendChild(episodesContainer);
    // rootElem.className = "root"
    const episodeName = document.createElement("h3");
    episodeName.className = "episode-name";
    episodeName.innerText = `${episode.name} - ${episodeCode(episode.season, episode.number)}`;
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

  })
  

}

function episodeCode(season, number){
  season = season < 10 ? "0" + season : season;
  number = number < 10 ? "0" + number : number;
  return `S${season}E${number}`;
}

window.onload = setup;
