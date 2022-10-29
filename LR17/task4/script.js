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
  const descriptionParagraph = document.createElement("p");

  headerRotator.classList.add("container_picture");
  leftSide.classList.add("algin_items_center");
  rightSide.classList.add("algin_items_center");

  numberPhotoFromList.textContent = `Фотографія ${i + 1} з ${list.length}`;
  descriptionParagraph.textContent = `${list[0].title} ${"\r\n"} ${
    list[0].description
  }`;
  btnPrev.textContent = "Назад";
  btnNext.textContent = "Вперед";
  image.src = list[0].url;

  btnPrev.addEventListener("click", () => {
    i--;

    if (i < 0) i = list.length - 1;
    numberPhotoFromList.textContent = `Фотографія ${i + 1} з ${list.length}`;
    descriptionParagraph.textContent = `${list[i].title} ${"\r\n"} ${
      list[i].description
    }`;
    image.src = list[i].url;
  });
  btnNext.addEventListener("click", () => {
    i++;

    if (i >= list.length) i = 0;
    numberPhotoFromList.textContent = `Фотографія ${i + 1} з ${list.length}`;

    descriptionParagraph.textContent = `${list[i].title} ${"\r\n"} ${
      list[i].description
    }`;

    image.src = list[i].url;
  });

  leftSide.appendChild(btnPrev);
  rightSide.appendChild(btnNext);

  headerRotator.appendChild(numberPhotoFromList);
  headerRotator.appendChild(image);
  headerRotator.appendChild(descriptionParagraph);

  rotator.appendChild(leftSide);
  rotator.appendChild(headerRotator);
  rotator.appendChild(rightSide);
}

initPhotoRotator("rotator", imagesList);