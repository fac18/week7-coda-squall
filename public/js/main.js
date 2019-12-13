// * FUNCTION DECLARATIONS *

// define DOM injection function for populating leaderboard with all characters
const populateAllChar = getResult => {
  let allCharData = getResult;
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
    battleCryCell.textContent = character.battle_cry;
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

const populateWelcome = getResult => {
  let char = getResult[0];
  let welcomeHeading = document.querySelector('.welcome-section__heading');
  let welcomeText = document.querySelector('.welcome-section__text');
  welcomeHeading.textContent = `Welcome, ${char.name}`
  welcomeText.textContent = `Your current score is ${char.score}`
  
}

// * EVENT LISTENERS *

// populate welcome and leaderboard
window.onload = () => {
  backendCall("/get-all-char", "GET", null, res => {
    populateAllChar(res);
  });
  if (/player/.test(document.cookie)) {
    backendCall(`/get-char`, "POST", document.cookie, res => {
      populateWelcome(res);
    });
  }
};
