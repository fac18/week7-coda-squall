const charPw = document.getElementById("char-form-password");
const charName = document.getElementById("char-form-name");
const charConfirmPw = document.getElementById("char-form-confirmedPassword");
const charForm = document.getElementsByTagName("form")[1];
const pwErr = document.getElementById("passwordErr");
const nameErr = document.getElementById("nameErr");
const confirmPwErr = document.getElementById("confirmPwErr");
const battleCry = document.getElementById("char-form-battle-cry");
const talisman = document.getElementById("char-form-talisman");
const talismanErr = document.getElementById("talismanErr");
const battleErr = document.getElementById("battleErr");
const powerErr = document.getElementById("powerErr");
const power1 = document.getElementById("power-id-1");
const power2 = document.getElementById("power-id-2");
const power3 = document.getElementById("power-id-3");
const power4 = document.getElementById("power-id-4");
const power5 = document.getElementById("power-id-5");
const power6 = document.getElementById("power-id-6");
const power7 = document.getElementById("power-id-7");

let checkPw = () => {
  if (charPw.validity.patternMismatch) {
    displayErr(
      pwErr,
      "Password must contain at least eight characters, including one letter and one number"
    );
  } else if (charPw.validity.valueMissing) {
    displayErr(pwErr, "Please enter a password");
  } else {
    displayErr(pwErr, "");
    return true;
  }
};

const checkConfirmPw = () => {
  console.log("Are you running?");
  if (charPw.value != charConfirmPw.value) {
    displayErr(confirmPwErr, "Passwords do not match");
  } else if (charConfirmPw.validity.valueMissing) {
    displayErr(confirmPwErr, "Please confirm your password");
  } else {
    displayErr(confirmPwErr, "");
    return true;
  }
};

const checkBattle = () => {
  if (!battleCry.value) {
    displayErr(battleErr, "Please enter a battle cry");
  } else {
    displayErr(battleErr, "");
    return true;
  }
};

const checkTalisman = () => {
  if (!talisman.value) {
    displayErr(talismanErr, "Please enter a talisman");
  } else {
    displayErr(talismanErr, "");
    return true;
  }
};

const checkUniqueUser = cb => {
  backendCall(`/get-char?=${charName.value}`, "GET", null, char => {
    cb(char);
  });
};

const checkForm = () => {
  if (!checkName()) {
    event.preventDefault();
  }
  if (!checkPw()) {
    event.preventDefault();
  }
  if (!checkConfirmPw()) {
    event.preventDefault();
  }
  if (!checkBattle()) {
    event.preventDefault();
  }
  if (!checkTalisman()) {
    event.preventDefault();
  }
  if (
    power1.checked ||
    power2.checked ||
    power3.checked ||
    power4.checked ||
    power5.checked ||
    power6.checked ||
    power7.checked
  ) {
    displayErr(powerErr, "Please choose a power");
    event.preventDefault();
  } else {
    displayErr(powerErr, "");
  }
};

function displayErr(errElem, errMsg) {
  errElem.innerText = errMsg;
}

const checkName = () => {
  checkUniqueUser(char => {
    console.log(char);
    if (char.length != 0) {
      displayErr(nameErr, "Player name is already taken");
    } else if (!charName.value) {
      displayErr(nameErr, "Please enter a name");
    } else {
      displayErr(nameErr, "");
      return true;
    }
  });
};

charPw.addEventListener("focusout", checkPw);
charName.addEventListener("focusout", checkName);

charConfirmPw.addEventListener("focusout", checkConfirmPw);
battleCry.addEventListener("focusout", checkBattle);
talisman.addEventListener("focusout", checkTalisman);

charForm.addEventListener("submit", checkForm);
