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

// define function to remove existing player when finding a new one
const killAllChildren = parentNode => {
  while (parentNode.firstChild) {
    parentNode.removeChild(parentNode.firstChild);
  }
};

// define function for populating .player-section with character info
const populatePlayer = char => {
  const playerSection = document.querySelector(".player-section");

  // if there is already a character showing, delete it
  killAllChildren(playerSection);

  //create all the elements for the new character
  const playerName = document.createElement("h3");
  const playerTalisman = document.createElement("p");
  const playerTalismanLabel = document.createElement("span");
  const playerTalismanValue = document.createElement("span");
  const playerBattleCry = document.createElement("p");
  const playerBattleCryLabel = document.createElement("span");
  const playerBattleCryValue = document.createElement("span");
  const playerPowerName = document.createElement("p");
  const playerPowerNameLabel = document.createElement("span");
  const playerPowerNameValue = document.createElement("span");

  //add classes to labels so they can be formatted
  playerTalismanLabel.classList.add("selected-player-field-label");
  playerBattleCryLabel.classList.add("selected-player-field-label");
  playerPowerNameLabel.classList.add("selected-player-field-label");

  //add text to fields
  playerName.textContent = char.name;
  playerTalismanLabel.textContent = `Talisman: `;
  playerTalismanValue.textContent = `${char.talisman}`;
  playerBattleCryLabel.textContent = `Battle Cry: `;
  playerBattleCryValue.textContent = `${char.battle_cry}`;
  playerPowerNameLabel.textContent = `Power Name: `;
  playerPowerNameValue.textContent = `${powerMap[char.powers_id]}`;

  //append all elements
  playerSection.appendChild(playerName);
  playerSection.appendChild(playerTalisman);
  playerTalisman.appendChild(playerTalismanLabel);
  playerTalisman.appendChild(playerTalismanValue);
  playerSection.appendChild(playerBattleCry);
  playerBattleCry.appendChild(playerBattleCryLabel);
  playerBattleCry.appendChild(playerBattleCryValue);
  playerSection.appendChild(playerPowerName);
  playerPowerName.appendChild(playerPowerNameLabel);
  playerPowerName.appendChild(playerPowerNameValue);

  window.location.href = "#player-select";
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

// populate leaderboard").value;
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
  const power = document.querySelector(".char-form__radio-input:checked").value;
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
