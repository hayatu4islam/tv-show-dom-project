//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}

const searchField = document.getElementById("search-field");
searchField.addEventListener("key", (e) => {
  console.log(e.target.value);
  const episodes = getAllEpisodes();
  const episodesFound = episodes.filter(episode => {
    episode.name.includes(e.target.value) || episode.summary.includes(e.target.value);
  })
  makePageForEpisodes(episodesFound);
})

function makePageForEpisodes(episodeList) {
  console.log(episodeList);
  const rootElem = document.getElementById("root");
  rootElem.className = "root";
  // rootElem.textContent = `Got ${episodeList.length} episode(s)`;

  episodeList.forEach(episode => {
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
