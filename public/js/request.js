const backendCall = (url, method, data, cb) => {
  const xml = new XMLHttpRequest();
  xml.onreadystatechange = () => {
    if (xml.readyState === 4 && (xml.status === 200 || xml.status === 201)) {
      let apiResponse = JSON.parse(xml.responseText);
      cb(apiResponse);
    }
  };
  xml.open(method, url, true);
  xml.send(data);
};
