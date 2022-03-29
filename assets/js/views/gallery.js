const galleryPage = async (data) => {
  const main = document.getElementById('pageContent')
  const getData = await data;
    
  window.hidePreloader();

  const galleryList = getData.gallery;
  let galArray = '';

    const getImages = () => {
      galleryList.map((image, index) => {
        galArray += `<div><img src="${image}" /></div>`
      });
    };

    getImages();

    return `
      <div id="gallery-Carousel"  class="my-slider">
        ${galArray}
      </div>
    `;

  
};

export default galleryPage;
