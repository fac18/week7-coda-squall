const backendCall = (url, method, data, cb) => {
  const xml = new XMLHttpRequest();
  xml.onload = () => {
    if (xml.status.toString().startsWith('2')) {
      if (xml.responseText) {
      let apiResponse = JSON.parse(xml.responseText);
      cb(apiResponse);
      }
    }
  };
  xml.open(method, url, true);
  xml.send(data);
};
