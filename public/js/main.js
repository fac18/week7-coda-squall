const postButton = document.querySelector('.char-form__submit')
const getButton = document.querySelector('.return-form__submit')

// define DOM injection function for populating leaderboard with all characters
const populateAllChar = res => {
  console.log(res);
};

// define function for populating .player-section with character info
const populatePlayer = char => {

}

// populate leaderboard with all characters on loading of page
window.onload = () => {
  backendCall("/get-all-char", "GET", null, res => {
    populateAllChar(res);
  });
};

// on submission of create char form, assemble character and post to backend
// then populate DOM with same character object
postButton.addEventListener('onclick', e => {
  // prevent form's in built POST request
  e.preventDefault();

  // assemble character querystring to send to backend, and obj for population
  const name = document.querySelector('#char-form-name').value
  const talisman = document.querySelector('#char-form-talisman').value
  const battleCry = document.querySelector('#char-form-battle-cry').value
  const.power = document.querySelector('input[name="power-id"]:checked').value
  let charQuery = `name=${name}&talisman=${talisman}&battle_cry=${battleCry}&power=${power-id}`;
  let charObj = { name, talisman, battleCry, power , score: 0};

  // make post request with backendCall
  backendCall("/create-char",'POST',charQuery, res => {
    // res = response confirming successful post (we hope)
  })

  // populate DOM with char info
  populatePlayer(charObj);

  // scroll to player-section
  // ??

})
