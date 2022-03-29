const referencesPage = (data, assetsPath) => {
  let pageContent = "";

  window.hidePreloader();

  const gallery = data.list
  let counterGal = 0

  gallery.map( (item) => {
    if(counterGal < 8){
      counterGal++
      if(counterGal < 5){
        pageContent += `
          <div class="refitem colw-25" data-desc="${item.desc}" data-img="${item.imgSrc}">
            <div>
              <img src="${item.imgSrc}" />
              <span>${item.title}</span>  
            </div>
          </div>
        `
      } else if(counterGal > 4 && counterGal < 8 ){
        pageContent += `
          <div class="refitem colw-33" data-desc="${item.desc}" data-img="${item.imgSrc}">
            <div>
              <img src="${item.imgSrc}" />
              <span>${item.title}</span>  
            </div>
          </div>
        `
      }
    } else{
      counterGal = 0
    }
  })

  return pageContent;
};
export default referencesPage;
