const backendCall = (url, method) => {
  let apiResponse;
  const xml = new XMLHttpRequest();

  xml.onreadystatechange = () => {
    if (xml.readyState === 4 && xml.status === 200) {
      apiResponse = JSON.parse(xml.responseText);
    }
  };
  xml.open(method, url, true);
  xml.send();
  return apiResponse;
};

// .addeventlistener('load',populateAllChar)

// const populateAllChar = () => {
//     let allCharData = backendCall('/get-all-char',"GET")
// allCharTable.textContent = allCharData
// }
