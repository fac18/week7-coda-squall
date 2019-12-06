// * ESSENTIAL NODES *

const postButton = document.querySelector(".char-form__submit");
const getButton = document.querySelector(".return-form__submit");

// * FUNCTION DECLARATIONS *

// define DOM injection function for populating leaderboard with all characters
const populateAllChar = res => {
  let allCharData = res;
  let tableBody = document.getElementById("table-body");
  allCharData.map(character => {
    let row = document.createElement("tr");
    let nameCell = document.createElement("td");
    let talismanCell = document.createElement("td");
    let battleCryCell = document.createElement("td");
    let powerCell = document.createElement("td");
    let powerImageCell = document.createElement("td");
    let powerImage = document.createElement("img");

    nameCell.textContent = character.name;
    talismanCell.textContent = character.talisman;
    battleCryCell.textContent = character.battleCry;
    powerCell.textContent = character.powers_name;
    powerImage.src = `public/img/${character.image_path}`;
    powerImage.alt = "power image icon";
    powerImage.classList.add("power-image-table");

    tableBody.appendChild(row);
    row.appendChild(nameCell);
    row.appendChild(talismanCell);
    row.appendChild(battleCryCell);
    row.appendChild(powerCell);
    row.append(powerImageCell);
    powerImageCell.append(powerImage);
  });
};

//define function for finding existing player
const getExistingPlayer = name => {
  backendCall(`/get-char?name=${name}`, "GET", null, res => {
    populatePlayer(res[0]);
  });
};

const killAllChildren = parentNode => {
  while (parentNode.firstChild) {
    parentNode.removeChild(parentNode.firstChild);
  }
};

// define function for populating .player-section with character info
const populatePlayer = char => {
  console.log(char);
  const playerSection = document.querySelector(".player-section");

  killAllChildren(playerSection);

  const playerName = document.createElement("h3");
  const playerTalisman = document.createElement("p");
  const playerBattleCry = document.createElement("p");
  const playerPowerName = document.createElement("p");
  const playerPowerImg = document.createElement("img");

  playerName.textContent = char.name;
  playerTalisman.textContent = `Talisman: ${char.talisman}`;
  playerBattleCry.textContent = `Battle Cry: ${char.battle_cry}`;
  playerPowerName.textContent = `Power Name: ${powerMap[char.powers_id]}`;

  playerSection.appendChild(playerName);
  playerSection.appendChild(playerTalisman);
  playerSection.appendChild(playerBattleCry);
  playerSection.appendChild(playerPowerName);
  playerSection.appendChild(playerPowerImg);
};

const powerMap = {
  1: "Electricity",
  2: "Radiation",
  3: "Punch",
  4: "Clairvoyance",
  5: "Telekinesis",
  6: "Shape shifting",
  7: "Time manipulation"
};

// * EVENT LISTENERS *

// populate leaderboard with all characters on loading of page
window.onload = () => {
  backendCall("/get-all-char", "GET", null, res => {
    populateAllChar(res);
  });
};

// fetch given player on submission of first form
getButton.addEventListener("click", e => {
  e.preventDefault();
  const name = document.querySelector(".return-form__field").value;
  getExistingPlayer(name);
});

// on submission of create char form, assemble character and post to backend
// then populate DOM with same character object
postButton.addEventListener("click", e => {
  // prevent form's in built POST request
  e.preventDefault();

  // assemble character querystring to send to backend, and obj for population
  const name = document.querySelector("#char-form-name").value;
  const talisman = document.querySelector("#char-form-talisman").value;
  const battleCry = document.querySelector("#char-form-battle-cry").value;
  const power = document.querySelector(".char-form__radio-input").value;
  let charQuery = `name=${name}&talisman=${talisman}&battle_cry=${battleCry}&powers_id=${power}`;
  let charObj = {
    name,
    talisman,
    battle_cry: battleCry,
    powers_id: power,
    score: 0
  };

  // make post request with backendCall
  backendCall("/create-char", "POST", charQuery, res => {
    // console.log(res)
  });

  // populate DOM with char info
  populatePlayer(charObj);

  // scroll to player-section
  // IMPLEMENT
});
