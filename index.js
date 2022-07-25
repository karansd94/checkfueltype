const numberPlates = ['r44mkv', 'ke18hww', 'bj65typ', 'dy62yju'];
  const url = 'https://www.checkcardetails.co.uk/cardetails';

  const urlsforNumber = numberPlates.map(
    (number) => `${url}/${number}`,
  );

  const fetchAll = async (urls) => {
    console.log(urls);
    const res = await Promise.all(urls.map((u) => fetch(u)));
    const html = await Promise.all(res.map((r) => r.text()));
    return html;
  };

  const convertStringToDocumentObject = (string) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(string, 'text/html');

    return doc;
  };
  const getValuesFromPDPDomElements = (domElement) =>
    domElement.querySelector('#fuelType').innerText;

  fetchAll(urlsforNumber).then((data) => {
    data.forEach((el, index) => {
      const element = convertStringToDocumentObject(el);
      const type = getValuesFromPDPDomElements(element);
      console.log(numberPlates[index], type);
    });
  });