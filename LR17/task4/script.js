let imagesList = [
  {
    url: "https://img.championat.com/s/735x490/news/big/l/u/robert-levandovski-proshyol-medobsledovanie-v-barselone_1658186124168294860.jpg",
    title: "Роберт Левандовський",
    description: "Нападаючий",
  },
  {
    url: "https://www.dynamomania.com/images/store/galleries/0130/1621/post612857_9195a_content.jpg",
    title: "Роман Яремчук",
    description: "Нападаючий",
  },
  {
    url: "https://s.ill.in.ua/i/news/630x373/456/456402.jpg",
    title: "Артем Довбик",
    description: "Нападаючий",
  },
];

function initPhotoRotator(identificator, list) {
  let i = 0;

  const rotator = document.getElementById(identificator);

  const headerRotator = document.createElement("div");
  const numberPhotoFromList = document.createElement("p");
  const image = document.createElement("img");

  const leftSide = document.createElement("div");
  const rightSide = document.createElement("div");

  const btnPrev = document.createElement("button");
  const btnNext = document.createElement("button");
  const titleParagraph = document.createElement("p");
  const descriptionParagraph = document.createElement("p");

  headerRotator.classList.add("container_picture");
  leftSide.classList.add("algin_items_center");
  rightSide.classList.add("algin_items_center");
  titleParagraph.classList.add("title");
  descriptionParagraph.classList.add("description");

  numberPhotoFromList.textContent = `Фотографія ${i + 1} з ${list.length}`;
  titleParagraph.textContent = list[0].title;
  descriptionParagraph.textContent = list[0].description;
  btnPrev.textContent = "Назад";
  btnNext.textContent = "Вперед";
  image.src = list[0].url;

  btnPrev.disabled = true;

  btnPrev.addEventListener("click", () => {
    btnNext.disabled = false;
    i--;

    if (i == 0) btnPrev.disabled = true;
    numberPhotoFromList.textContent = `Фотографія ${i + 1} з ${list.length}`;
    titleParagraph.textContent = list[i].title;
    descriptionParagraph.textContent = list[i].description;

    image.src = list[i].url;
  });

  btnNext.addEventListener("click", () => {
    btnPrev.disabled = false;
    i++;
    if (i == list.length - 1) btnNext.disabled = true;

    numberPhotoFromList.textContent = `Фотографія ${i + 1} з ${list.length}`;

    titleParagraph.textContent = list[i].title;
    descriptionParagraph.textContent = list[i].description;

    image.src = list[i].url;
  });

  leftSide.appendChild(btnPrev);
  rightSide.appendChild(btnNext);

  headerRotator.appendChild(numberPhotoFromList);
  headerRotator.appendChild(image);
  headerRotator.appendChild(titleParagraph);
  headerRotator.appendChild(descriptionParagraph);

  rotator.appendChild(leftSide);
  rotator.appendChild(headerRotator);
  rotator.appendChild(rightSide);
}

initPhotoRotator("rotator", imagesList);
