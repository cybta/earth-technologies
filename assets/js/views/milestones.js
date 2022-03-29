const milestonesPage = (data, assetsPath) => {
  let pageContent = "";

  window.hidePreloader();

  const listMilestones = data.listofmilestones
  let getData = ''
  const getMilestones = () => {
    listMilestones.map(milestone => {
      getData += `
        <div id="${milestone.id}">
          <span class="icon-${milestone.icon}"></span>
          <h4>${milestone.title}</h4>
          <img src="${milestone.image}" />
          <div class="txt-edit"><small>${milestone.text}</small></div> 
        </div>
      `
    })
  }
  getMilestones()

  return getData;
};
export default milestonesPage;
