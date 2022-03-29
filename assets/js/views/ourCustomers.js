const ourCustomersPage = (data, assetsPath) => {
  let pageContent = "";

  window.hidePreloader();

  const iconsList = () => {
    let listofNodes = "";
    const listCustomers = data.customers;
    listCustomers.map((item) => {
      listofNodes += `
        <div id="cust-${item.id}" class="colw-12">
          <h1><span class="icon-${item.icon}"></span></h1>
          <h5>${item.title}</h5>
        </div>
      `;
    });
    return listofNodes;
  };

  const dataCustomers = `
    <section class="dataCustomers flex jc-c ai-c fd-c fw fh">
      <h1>${data.slogon}</h1>
      <div class="customersList flex jc-c ai-c fw-w">${iconsList()}</div>
    </section>
  `;

  pageContent = dataCustomers;

  return pageContent;
};
export default ourCustomersPage;
