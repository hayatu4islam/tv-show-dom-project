//You can edit ALL of the code here
let allEpisodes;
function setup() {
  // var allEpisodes = getAllEpisodes();
  
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
  
}

var containerHead = document.createElement("div");
containerHead.setAttribute("class", "container-head");
document.body.prepend(containerHead);

const select = document.createElement("select");
select.style.marginLeft = "70px";
containerHead.appendChild(select);
const option = document.createElement("option");
option.value = -10;
option.text = "All Episodes";
select.appendChild(option);

var counter = 0;
// select.firstElementChild('[value="basic"]').remove();
// allEpisodes = getAllEpisodes();
const selectFunc = () => {
  allEpisodes.forEach((episode) => {
  const opt = document.createElement("option");
  opt.value = counter;
  counter++;
  // opt.innerText = `${episodeCode(episode.season, episode.number)} - ${episode.name}`;
  opt.text = `${episodeCode(episode.season, episode.number)} - ${episode.name}`;
  select.appendChild(opt);
});
}

const searchField = document.createElement("input");
searchField.id = "input";
searchField.setAttribute("autocomplete", "off");
searchField.setAttribute("placeholder", "Search for episodes");
containerHead.appendChild(searchField);

// ----------UPDATE EPISODE LISTS ON INPUT-----------------------

const rootElement = document.getElementById("root");
const matchEpisodeDisplay = document.createElement("label");
// matchEpisodeDisplay.innerHTML = " Displaying 73 / 73 episodes";
matchEpisodeDisplay.innerHTML = " ";
matchEpisodeDisplay.setAttribute("class", "displayLabel");
containerHead.appendChild(matchEpisodeDisplay);

searchField.addEventListener("keyup", (e) => {
  let episodesFound = "";
  let allEpisodes = getAllEpisodes();
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

select.addEventListener("change", (e) => {
  let selectedEpisode = "";
  matchEpisodeDisplay.innerHTML = " ";
  let allEpisodes = getAllEpisodes();
  if (select.value >= 0) {
    selectedEpisode = [allEpisodes[select.value]];
    // selectedEpisode = allEpisodes;
  } else {
    selectedEpisode = allEpisodes;
    matchEpisodeDisplay.innerHTML = " Displaying 73 / 73 episodes";
    // selectedEpisode = [allEpisodes[select.value]];
  }
  rootElement.innerHTML = "";
  makePageForEpisodes(selectedEpisode);
});

// ---------------MAKE PAGE FOR EPISODES FUNCTION---------------------
function makePageForEpisodes(episodeList) {
  // console.log(episodeList);
  const rootElem = document.getElementById("root");
  rootElem.className = "root";
  // rootElem.textContent = `Got ${episodeList.length} episode(s)`;
  // var counter = 0;
  // // select.firstElementChild('[value="basic"]').remove();
  // let allEpisodes = getAllEpisodes();
  // allEpisodes.forEach((episode) => {
  //   const opt = document.createElement("option");
  //   opt.value = counter;
  //   counter++;
  //   // opt.innerText = `${episodeCode(episode.season, episode.number)} - ${episode.name}`;
  //   opt.text = `${episodeCode(episode.season, episode.number)} - ${episode.name}`;
  //   select.appendChild(opt);
  // });

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

function episodeCode(season, number) {
  season = season < 10 ? "0" + season : season;
  number = number < 10 ? "0" + number : number;
  return `S${season}E${number}`;
}

window.onload = setup;
