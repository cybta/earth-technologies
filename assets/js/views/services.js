import { tns } from "/node_modules/tiny-slider/src/tiny-slider.js"

const app = document.getElementById("app");
const getServices = async () => {
  let htmlData = "";
  let hashedVal = window.location.hash.replace("#Service", "");
  let hasArr = Array.from(hashedVal.replace("-", ""));
  const categ = hasArr[0];
  const subCateg = hasArr[1];

  const response = await fetch("./assets/json/data.json");
  const data = await response.json();
  const serviceData = data.pages[0].view.services[categ].data[subCateg];
  let imagesList = "";

  const windowHeight = () => {
    const winH = window.innerHeight;
    return winH;
  };

  window.onresize = windowHeight();

  const getDataService = () => {

    const gallerArray = serviceData.gallery
    let listGallery = ''
    gallerArray.map(item => {
      listGallery += `
        <div>
          <img src="${item}" />
        </div>
      `
    })

    htmlData = `
      <div class="servicesPage flex jc-c ai-c fd-c" style="height:${windowHeight()}px">
        <div><h1>${serviceData.title}</h1></div>
        <div class="flex jc-c ai-c fw-w">
          <div class="colw-50">
            <div id="servicesCarousel">${listGallery}</div>
          </div>
          <div class="colw-50 pl-25">${serviceData.text}</div>
        </div>
      </div>
    `;

    app.innerHTML = htmlData;
  }

  const renderGallery = async () => {
    await getDataService()

    tns({
      container: '#servicesCarousel',
      items: 1,
    });
  }
  renderGallery()
  
};

getServices();
