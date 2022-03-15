import render from "./render.js";
window.app = document.getElementById("app");

const main = async () => {
  const response = await fetch("./assets/json/data.json");
  const data = await response.json();
  render(data);
};

main();
