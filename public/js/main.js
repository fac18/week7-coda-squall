window.onload = () => {
  backendCall("/get-all-char", "GET", null, res => {
    populateAllChar(res);
  });
};

const populateAllChar = res => {
  console.log(res);
};
