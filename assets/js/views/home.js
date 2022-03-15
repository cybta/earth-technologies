const homePage = (data, assetsPath) => {
  let pageContent = "";

  window.hidePreloader();

  const windowHeight = () => {
    const winH = window.innerHeight;
    return winH;
  };

  window.onresize = windowHeight();

  const getQuote = () => {
    return `
        <div class="homeQuote">
            <div class="quote">
                <h2>
                  ${
                    data.quote !== undefined
                      ? data.quote
                      : "Simplicity is the Ultimate form of sophistication"
                  }
                </h2>
            </div>
          <div class="author">
            <h3 class="main-color">
              ${data.author ? data.author : "Unknown"}
            </h3>
          </div>
        </div>
      `;
  };

  const getServices = () => {
    let servicesContainer = "";
    const serviesList = data.services;

    serviesList.map((service, index) => {
      servicesContainer += `
            <div id="${service.icon}" data-tab="${index}">
                <span class="icon-${service.icon}"></span>
                <h5>${service.title}</h5>
            </div>
        `;
    });
    return servicesContainer;
  };

  getServices();

  pageContent += `
    <div class="landingPage" style="height: ${windowHeight()}px">
      <img src="assets/img/logo.svg" />
      <div class="scrollIcon scrollDown" id="scrollIcon">
        <div class="mousey">
          <div class="scroller"></div>
        </div>
      </div>
    </div>
    <div class="homepage" id="homepage" style="height: ${windowHeight()}px">
        <div></div> 
        <div class="quote">${getQuote()}</div>
        <div class="servicesList">${getServices()}</div>
    </div>
  `;

  return pageContent;
};
export default homePage;
