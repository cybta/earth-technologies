export default class InitCarousel {
  constructor(containerID, arrayofItems, slidesToSHow, carouselWidth) {
    this.containerID = containerID;
    this.arrayofItems = arrayofItems;
    this.slidesToSHow = slidesToSHow;
    this.carouselWidth = carouselWidth;
    this._init();
  }

  _init() {
    const carousel = document.getElementById(this.containerID);
    carousel.innerHTML = `
          <div id="carouselSlider"></div>
          <div id="nav" class="carouselNav">
              <div id="prev"><span class="icon-prev"></span></div>
              <div id="next"><span class="icon-next"></span></div>
          </div>
      `;

    const carouselSlider = document.getElementById("carouselSlider");
    const nav_cont = document.getElementById("nav");
    const next = document.getElementById("next");
    const prev = document.getElementById("prev");

    const getFocusedThumb = () => {
      if (this.slidesToSHow > 1) {
        return Math.round((this.slidesToSHow - 0.2) / 2);
      } else {
        return 0;
      }
    };

    const initialIndex = getFocusedThumb();
    let focusedElIndex = getFocusedThumb();

    const listThumbs = this.arrayofItems;

    const preloadImages = async (array) => {
      await listThumbs.map(img => {
        const imgpreload = new Image()
        imgpreload.src = img
        imgpreload.decode();
      })

      array.map((item, index) => {
        carouselSlider.innerHTML += `<div id="thumb-${index}" data-thumb="${index}" class="thumbnail"><img src="${item}" /></div>`;
      });

      const thumbId = 'thumb-' + focusedElIndex
      document.getElementById(thumbId).classList.add('active')

      carouselSlider.innerHTML;
      let direction;
      const carouselWidth = this.carouselWidth ? this.carouselWidth : 1600;

      const slidesToShow = this.slidesToSHow ? this.slidesToSHow : 3;
      const thumbWidh = carouselWidth / slidesToShow;

      carousel.style.width = carouselWidth + "px";
      nav_cont.style.width = carouselWidth + "px";
      carouselSlider.style.width = carouselWidth * listThumbs.length + "px";

      const itemsList = document.querySelectorAll(".thumbnail");

      for (let i = 0; i < itemsList.length; i++) {
        itemsList[i].style.width = thumbWidh + "px";
        itemsList[i].style.flexBasis = thumbWidh + "px";
      }

      prev.addEventListener("click", function () {
        if (direction === "next") {
          carouselSlider.appendChild(carouselSlider.firstElementChild);
          direction = "prev";
        } else if (direction === undefined) {
          carouselSlider.appendChild(carouselSlider.firstElementChild);
          direction = "prev";
        }
  
        if (focusedElIndex > 0) {
          focusedElIndex--;
        } else {
          focusedElIndex = listThumbs.length - 1;
        }
  
        carouselSlider.style.transform = `translateX(${thumbWidh}px)`;
        // carousel.style.justifyContent = 'flex-end'
      });
  
      next.addEventListener("click", function () {
        direction = "next";
  
        if (focusedElIndex < listThumbs.length - 1) {
          focusedElIndex++;
        } else {
          focusedElIndex = 0;
        }
  
        const thumbId = 'thumb-' + focusedElIndex
        const allThumbs = document.querySelectorAll('.thumbnail')
        allThumbs.forEach(thumb => {
          thumb.classList.remove('active')
        })
        
        document.getElementById(thumbId).classList.add('active')
  
        console.log("focused Thumb is " + thumbId);
  
        carouselSlider.style.transform = `translateX(-${thumbWidh}px)`; // translateX value should be calculated dinamicaly
        carousel.style.justifyContent = "flex-start";
      });
  
      carouselSlider.addEventListener("transitionend", function () {
        if (direction === "next") {
          carouselSlider.appendChild(carouselSlider.firstElementChild);
        } else if (direction === "prev") {
          carouselSlider.prepend(carouselSlider.lastElementChild);
        }
  
        carouselSlider.style.transition = "0s";
        carouselSlider.style.transform = "translate(0)";
        setTimeout(() => {
          carouselSlider.style.transition = "all .5s";
        });
      });
      
      console.log('all set')
    }
    preloadImages(listThumbs)
  }
}
