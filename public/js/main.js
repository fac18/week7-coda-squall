const makeMe = document.getElementById("makeme");

const populateAllChar = () => {
  backendCall("/get-all-char", "GET", null, res => {
    console.log(res);
  });
};

makeMe.addEventListener("click", () => {
  populateAllChar();
});
