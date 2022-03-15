import InitCarousel from "../carousel.js";

const galleryPage = async (data, assetsPath) => {
  await data;
  await assetsPath;

  window.hidePreloader();

  const galleryList = data.gallery;
  let galArray = [];

  const getImages = () => {
    galleryList.map((image) => {
      galArray.push(image);
    });
  };

  getImages();
  const carousel = new InitCarousel("carouselContainer", galArray, 3);
};

export default galleryPage;
