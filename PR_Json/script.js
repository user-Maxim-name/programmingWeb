const header = document.querySelector("header");
const section = document.querySelector("section");
const requestURL = "https://semegenkep.github.io/json/example.json";
const request = new XMLHttpRequest();

request.open("GET", requestURL);
request.responseType = "json";
request.send();

request.onload = function () {
  const superHeroes = request.response;
  populateHeader(superHeroes);
  showHeroes(superHeroes);
};

function populateHeader(res) {
  const headerText = document.createElement("h1");

  headerText.textContent = res.squadName;

  const descriptionCityParagraph = document.createElement("p");

  descriptionCityParagraph.textContent = `Hometown: ${res.homeTown} // Formed: ${res.formed}`;

  header.appendChild(headerText);

  header.appendChild(descriptionCityParagraph);
}

function showHeroes(res) {
  res.members.forEach((el) => {
    section.insertAdjacentHTML("beforeend", createCard(el));
  });
}

function createCard(superHeroe) {
  const card = `
<article>
<h2>${superHeroe.name}</h2>
<p>Secret identity: ${superHeroe.secretIdentity}</p>
<p>Age: ${superHeroe.age}</p>
<p>Superpowers: </p>
<ul>
${superHeroe.powers
  .map((el) => {
    return `<li>${el}</li>`;
  })
  .join("")}
</ul>
</article>
`;

  return card;
}
