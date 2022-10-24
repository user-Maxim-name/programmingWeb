// Task 6
const paragraphs = document.querySelectorAll("p");
const btnChangePositionElements = document.getElementById("start");
const table = document.querySelector("table");
const picture = document.querySelector(".image");

btnChangePositionElements.addEventListener("click", () => {
  const rows = table.tBodies[0].rows;

  for (let i = 0; i < rows.length; i++) {
    rows[i].cells[0].insertAdjacentElement("afterbegin", paragraphs[i]);
  }

  table.insertAdjacentElement("beforebegin", picture);
});
