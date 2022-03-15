import homePage from "./views/home.js";
import referencesPage from "./views/references.js";
import galleryPage from "./views/gallery.js";
import milestonesPage from "./views/milestones.js";
import ourCustomersPage from "./views/ourCustomers.js";
import InitCarousel from "./carousel.js";

window.state = {
  activeView: "home",
};

if (window.location.hash) {
  window.state.activeView = window.location.hash.replace("#", "");
}

const windowHeight = () => {
  const winH = window.innerHeight;
  return winH;
};

window.onresize = windowHeight();

const showLoadingScreen = () => {
  const loadingScreen = document.createElement("div");
  loadingScreen.id = "loading-screen";
  loadingScreen.classList = "loading";
  loadingScreen.innerHTML = `
    <div>
      <h1><span class="icon-icon"></span></h1>
    </div>
  `;
  window.app.appendChild(loadingScreen);
  setTimeout(() => {
    loadingScreen.classList.add("active");
  });
};

const render = (data) => {
  window.app.innerHTML = `
    <header>
      <span class="logo icon-${data.icon}"></span>
      <menu id="menu"></menu>
    </header>
    <main id="pageContent" style="height: ${windowHeight()}px"></main>
    <div id="siteMode" class="siteMode">
      <div class="flex">
        <div>
          <input type="radio" name="mood" id="light" value="light" checked />
          <label for="light"></label>
        </div>
        <div>
          <input type="radio" name="mood" id="dark" value="dark" />
          <label for="dark"></label>
        </div>
        <div class="toggle__pointer"></div>
        <small id="modetext" class="modetext"></small>
      </div>
    </div>
  `;

  // Check if user have chosen a Day/Night mode
  const toggle__pointer = document.querySelector(".toggle__pointer");
  const modetext = document.getElementById("modetext");
  if (
    localStorage.getItem("mood") === null ||
    localStorage.getItem("mood") === undefined
  ) {
    localStorage.setItem("mood", "light");
  } else {
    if (localStorage.getItem("mood") === "dark") {
      document.getElementsByTagName("body")[0].classList.add("dark");
      document.getElementById("dark").checked = true;
      modetext.innerHTML = "Light Mode";
    } else {
      document.getElementsByTagName("body")[0].classList.remove("dark");
      document.getElementById("light").checked = true;
      modetext.innerHTML = "Dark Mode";
    }
  }

  // Changing the Day/Night mode
  const siteMode = document.getElementById("siteMode");
  const siteModeCheckbox = siteMode.querySelectorAll("input[type=radio]");
  siteModeCheckbox.forEach((radio) => {
    radio.addEventListener("change", (e) => {
      if (e.target.value === "dark") {
        toggle__pointer.classList.add("dark");
        document.getElementsByTagName("body")[0].classList.add("dark");
        localStorage.setItem("mood", "dark");
        modetext.innerHTML = "Light Mode";
      } else {
        toggle__pointer.classList.remove("dark");
        document.getElementsByTagName("body")[0].classList.remove("dark");
        localStorage.setItem("mood", "light");
      }
    });
  });

  const menu = document.getElementById("menu");
  const main = document.getElementById("pageContent");

  const assetsPath = data.assets;
  const pages = data.pages;

  window.hidePreloader = () => {
    setTimeout(() => {
      const loadingScreen = document.getElementById("loading-screen");
      if (loadingScreen !== null) {
        loadingScreen.style.opacity = 0;
        setTimeout(() => {
          loadingScreen.remove();
        }, 700);
      }
    }, 1500);
  };

  const fh = windowHeight();

  const pageScrollDown = () => {
    main.scroll({
      top: fh,
      left: 0,
      behavior: "smooth",
    });
    scrollIcon.classList.remove("scrollDown");
    scrollIcon.classList.add("scrollUp");
  };

  const pageScrollUp = () => {
    main.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
    scrollIcon.classList.remove("scrollUp");
    scrollIcon.classList.add("scrollDown");
  };

  document.addEventListener("mousewheel", function (event) {
    const fh = windowHeight();
    if (event.wheelDelta >= 0) {
      pageScrollUp();
    } else {
      pageScrollDown();
    }
  });

  const activateView = (activeView) => {
    switch (activeView) {
      case "home":
        pages.map((page) => {
          if (page.id === "home") {
            main.innerHTML = homePage(page.view, assetsPath);
            const scrollIcon = document.getElementById("scrollIcon");
            if (scrollIcon) {
              scrollIcon.addEventListener("click", () => {
                if (scrollIcon.classList.contains("scrollDown")) {
                  pageScrollDown();
                } else {
                  pageScrollUp();
                }
              });
            }
          }
        });

        break;

      case "references":
        pages.map((page) => {
          if (page.id === "references") {
            main.innerHTML = referencesPage(page.view, assetsPath);
          }
        });

        break;

      case "gallery":
        pages.map((page) => {
          if (page.id === "gallery") {
            main.innerHTML = "";

            const carouselContainer = document.createElement("div");
            carouselContainer.id = "carouselContainer";
            carouselContainer.className = "carouselContainer";

            main.appendChild(carouselContainer);

            galleryPage(page.view, assetsPath);
          }
        });
        break;

      case "milestones":
        pages.map((page) => {
          if (page.id === "milestones") {
            main.innerHTML = milestonesPage(page.view, assetsPath);
          }
        });
        break;

      case "ourCustomers":
        pages.map((page) => {
          if (page.id === "ourCustomers") {
            main.innerHTML = ourCustomersPage(page.view, assetsPath);
          }
        });
        break;
    }

    const allActive = document.querySelectorAll(".active");

    allActive.forEach((active) => {
      active.classList.remove("active");
    });

    window.location = "#" + activeView;

    document
      .querySelector("div[data-navigation=" + activeView + "]")
      .classList.add("active");

    if (activeView === "home") {
      const servicesBtns = document.querySelectorAll(".servicesList > div");
      const homepage = document.getElementById("homepage");

      servicesBtns.forEach((servBtn) => {
        const i = servBtn.dataset.tab;

        servBtn.addEventListener("click", () => {
          homepage.classList.add("servOpen");
          const getServDetail = (servDetails) => {
            const getServiceData = pages[0].view.services[i].data;
            servDetails.classList.remove("animate");

            setTimeout(() => {
              servDetails.innerHTML = '<div id="subServList"></div>';
              const subServList = document.getElementById("subServList");
              getServiceData.map((serv, index) => {
                subServList.innerHTML += `
                  <div class="servTitle" id="${i + "-" + index}">
                      ${serv.title}
                  </div> 
                `;
              });


              const servTitles = document.querySelectorAll('.servTitle');

              const createFillIframe = (el) =>{
                const closeBtn = document.createElement('div')
                const iframe = document.createElement("iframe");
                iframe.id = 'servIframe'
                iframe.className = 'servIframe'
                closeBtn.id = 'closeBtn'
                closeBtn.className = 'closeBtn'
                closeBtn.innerHTML = 'Back'
                iframe.src = 'service.html#Service' + el

                app.appendChild(iframe)
                app.appendChild(closeBtn)

                document.getElementById('closeBtn').addEventListener('click', () => {
                  collapseIframe()
                })
              }

              const collapseIframe = () =>{
                const iframe = document.getElementById("servIframe");
                const closeBtn = document.getElementById('closeBtn')
                iframe.remove()
                closeBtn.remove()
              }

              servTitles.forEach(serv => {
                serv.addEventListener('click', (e) => {
                  const thisLink = e.target.id
                  createFillIframe(thisLink)
                })
              })

            }, 300);

            

            if (servDetails.classList.contains("activate")) {
              setTimeout(() => {
                servDetails.classList.add("animate");
              }, 600);
            } else {
              setTimeout(() => {
                servDetails.classList.add("activate");
              }, 10);

              setTimeout(() => {
                servDetails.classList.add("animate");
              }, 310);
            }
          };

          const serviceDetails = document.getElementById("serviceDetails");
          if (serviceDetails === null) {
            const servDiv = document.createElement("div");
            servDiv.id = "serviceDetails";
            servDiv.className = "serviceDetails";
            homepage.appendChild(servDiv);
            getServDetail(servDiv);
          } else {
            getServDetail(serviceDetails);
          }
        });
      });
    }
  };

  pages.map((page) => {
    menu.innerHTML += `
        <div data-navigation="${page.id}" id="${page.id}">
            ${page.name}
        </div>
      `;

    const menuItem = menu.querySelectorAll("div");

    menuItem.forEach((item) => {
      item.addEventListener("click", (e) => {
        e.target.classList.add("active");
        window.state.activeView = e.target.dataset.navigation;
        activateView(window.state.activeView);
        if (window.location.hash === window.state.activeView) {
        } else {
          showLoadingScreen();
        }
      });
    });
  });

  activateView(window.state.activeView);
};

export default render;
