const powerMap = {
  1: "Electricity",
  2: "Radiation",
  3: "Punch",
  4: "Clairvoyance",
  5: "Telekinesis",
  6: "Shape shifting",
  7: "Time manipulation"
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
  const playerScore = document.createElement('p');
  const playerScoreLabel = document.createElement('span');
  const playerScoreValue = document.createElement('span');

  //add classes to labels so they can be formatted
  playerTalismanLabel.classList.add("selected-player-field-label");
  playerBattleCryLabel.classList.add("selected-player-field-label");
  playerPowerNameLabel.classList.add("selected-player-field-label");
  playerScoreLabel.classList.add('selected-player-field-label');

  //add text to fields
  playerName.textContent = char.name;
  playerTalismanLabel.textContent = `Talisman: `;
  playerTalismanValue.textContent = `${char.talisman}`;
  playerBattleCryLabel.textContent = `Battle Cry: `;
  playerBattleCryValue.textContent = `${char.battle_cry}`;
  playerPowerNameLabel.textContent = `Power Name: `;
  playerPowerNameValue.textContent = `${powerMap[char.powers_id]}`;
  playerScoreLabel.textContent = `Score: `
  console.log(char.score.toString())
  playerScoreValue.textContext = char.score.toString();

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
  playerSection.appendChild(playerScore);
  playerScore.appendChild(playerScoreLabel);
  playerScore.appendChild(playerScoreValue);

  window.location.href = "#player-section";
};

//define function for finding existing player
const getExistingPlayer = cookieString => {
  backendCall(`/get-char`, "POST", cookieString, char => {
    populatePlayer(char[0]);
  });
};

// populate player profile
window.onload = () => {
  const allCookies = document.cookie;
  getExistingPlayer(allCookies)
};
