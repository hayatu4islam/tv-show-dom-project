let allShows;
let allEpisodes;
const showUrl = "https://api.tvmaze.com/shows";
let newShowUrl;
let episodeUrl;
let rootElem = document.getElementById("root");
rootElem.className = "root";
let matchEpisodeDisplay;

const setup = async () => {
    try {
        const response = fetch(showUrl);
        let shows = await (await response).json();
        allShows = shows.sort(function (a, b) {
        const n1 = a.name,
          n2 = b.name;
        if (n1 < n2) return -1;
        if (n1 > n2) return 1;
        return 0;
      });
      populateShowList(allShows);
      let firstShow = allShows[0];
      console.log(firstShow);
      let showId = firstShow.id;
      episodeUrl = `https://api.tvmaze.com/shows/${showId}/episodes`;
      console.log(episodeUrl);
      
      // let allEpisodes;
      fetch(episodeUrl)
        .then(function (response) {
          return response.json();
        })
        .then(function (json) {
          allEpisodes = json;
          populateEpisodeList(allEpisodes);
          makePageForEpisodes(allEpisodes);
          // console.log(allEpisodes);
        });
    } 
    catch(error){
        console.log(error);
    }
}



function makePageForEpisodes(episodeList) {
  // console.log(episodeList); 
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


const populateShowList = (allShows) => {
  var showCount = 0;
  // allShows.sort((a, b) => {return a - b});
  allShows.forEach((show) => {
    const opt = document.createElement("option");
    opt.value = showCount;
    if(showCount === 0){
      opt.selected = "selected";
    }
    showCount++;
    opt.text = `${show.name}`;
    selectShow.appendChild(opt);
  });
};

const populateEpisodeList = (episodes) => {
  let epiCount = 1;
  episodes.forEach((episode) => {
    const opt = document.createElement("option");
    opt.value = epiCount;
    epiCount++;
    opt.text = `${episodeCode(episode.season, episode.number)} - ${episode.name}`;
    selectEpisode.appendChild(opt);
  })
}

const fetchEpisodeData = (url) => {
  fetch(url)
    .then((response) => response.json())
    .then((episodes) => {
      allEpisodes = episodes;
      console.log(allEpisodes);
    });

  // return allEpisodes;
};


var containerHead = document.createElement("div");
containerHead.setAttribute("class", "container-head");
containerHead.style.backgroundColor ="#ffff23";
document.body.prepend(containerHead);

const selectShow = document.createElement("select");
selectShow.style.marginLeft = "70px";
selectShow.style.marginRight = "70px";

containerHead.appendChild(selectShow);
const showOption = document.createElement("option");
showOption.value = -20;
showOption.text = "All Shows";
selectShow.appendChild(showOption);

let showCount = 0;
// allShows.sort((a, b) => {return a - b});
// allShows.forEach((show) => {
//   const opt = document.createElement("option");
//   opt.value = showCount;
//   showCount++;
//   opt.text = `${show.name}`;
//   selectShow.appendChild(opt);
// });


const selectEpisode = document.createElement("select");
selectEpisode.id = "select-episode";
selectEpisode.height = "150px";
// selectShow.style.marginLeft = "70px";
selectShow.style.paddingLeft = "30px";
containerHead.appendChild(selectEpisode);
const option = document.createElement("option");
option.value = -10;
option.text = "All Episodes";
selectEpisode.appendChild(option);

const searchField = document.createElement("input");
searchField.id = "input";
searchField.setAttribute("autocomplete", "off");
searchField.setAttribute("placeholder", "Search for episodes");
containerHead.appendChild(searchField);

matchEpisodeDisplay = document.createElement("label");
matchEpisodeDisplay.innerHTML = " ";
matchEpisodeDisplay.setAttribute("class", "display-label");
containerHead.appendChild(matchEpisodeDisplay);




selectShow.addEventListener("change", (e) => {
  let selectedShow = "";
  // let newShowUrl;
  let allEpisodes;
  if(selectShow.value >= 0){
    selectedShow = [allShows[selectShow.value]];
  }else{
    selectedShow = allShows;
  }
  rootElem.innerHTML = "";
  // populateEpisodeList();
  console.log(selectedShow[0].id);
  newShowUrl = `https://api.tvmaze.com/shows/${selectedShow[0].id}/episodes`;
  fetch(newShowUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      allEpisodes = json;
      clearOptions("select-episode");
      populateEpisodeList(allEpisodes);
      makePageForEpisodes(allEpisodes);
      console.log(allEpisodes);
    });
})

selectEpisode.addEventListener("change", (e) => {
  let selectedEpisode = "";
  if(selectEpisode.value >= 0){
    selectedEpisode = [allEpisodes[selectEpisode.value]];
  } else{
    selectedEpisode = allEpisodes;
  }
  rootElem.innerHTML = "";
  makePageForEpisodes(selectedEpisode);
})

searchField.addEventListener("keyup", (e) => {
  fetch(newShowUrl)
  .then(function (response) {
    return response.json();
  })
  .then((episodes) => {
    allEpisodes = episodes;
  }).catch((error) => console.log(error));
  // console.log(allEpisodes);
  let episodesFound = "";
  let currentValue = e.target.value.toLowerCase();
  rootElem.innerHTML = "";
  episodesFound = allEpisodes.filter(
    (epi) =>
      epi.name.toLowerCase().includes(currentValue) ||
      epi.summary.toLowerCase().includes(currentValue)
  );
  matchEpisodeDisplay.innerHTML =  ` Displaying ${episodesFound.length} / ${allEpisodes.length} episodes`;
  makePageForEpisodes(episodesFound);
});

function clearOptions(selectId){
  var select = document.getElementById(selectId);
  var length = select.options.length;
  for (i = length - 1; i >= 1; i--) {
    select.options[i] = null;
  }
}

const episodeCode = (season, number) => {
  season = season < 10 ? "0" + season : season;
  number = number < 10 ? "0" + number : number;
  return `S${season}E${number}`;
}

window.onload = setup;
