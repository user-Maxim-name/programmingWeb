let aboutProducts = [
  {
    name: "Samsung UE43AU7100UXUA",
    salePrice: "null",
    price: "null",
    novelty: "true",
    topSale: "false",
    img: "https://content.rozetka.com.ua/goods/images/big/222749452.jpg",
    available: "false",
    chapter: "МАТЕМАТИКА",
    urlProduct: "https://rozetka.com.ua/samsung_ue43au7100uxua/p297596238/",
  },
  {
    name: "Samsung QE55Q80AAUXUA",
    salePrice: "39999",
    price: "42999",
    novelty: "false",
    topSale: "false",
    img: "https://content.rozetka.com.ua/goods/images/big/222749452.jpg",
    available: "true",
    chapter: "Подарунок",
    urlProduct: "https://rozetka.com.ua/samsung_qe55q80aauxua/p297618978/",
  },
  {
    name: "Philips 50PUS7556/12 (6722501)",
    salePrice: "14999",
    price: "16590",
    novelty: "false",
    topSale: "true",
    img: "https://content2.rozetka.com.ua/goods/images/big/261175862.jpg",
    available: "true",
    chapter: "Усний рахунок",
    urlProduct: "https://rozetka.com.ua/338695789/p338695789/",
  },

  {
    name: "Bravis LED-39G5000 + T2A",
    salePrice: "null",
    price: "4900",
    novelty: "false",
    topSale: "true",
    img: "https://content.rozetka.com.ua/goods/images/big/261176280.jpg",
    available: "true",
    chapter: "Букви та читання",
    urlProduct: "https://rozetka.com.ua/328756675/p328756675/",
  },
  {
    name: "Bravis LED-39G5000 + T2A",
    salePrice: "null",
    price: "4900",
    novelty: "false",
    topSale: "true",
    img: "https://content.rozetka.com.ua/goods/images/big/261176280.jpg",
    available: "true",
    chapter: "Букви та читання",
    urlProduct: "https://rozetka.com.ua/328756675/p328756675/",
  },
  {
    name: "Bravis LED-39G5000 + T2A",
    salePrice: "null",
    price: "4900",
    novelty: "false",
    topSale: "true",
    img: "https://content.rozetka.com.ua/goods/images/big/261176280.jpg",
    available: "true",
    chapter: "Букви та читання",
    urlProduct: "https://rozetka.com.ua/328756675/p328756675/",
  },
];

const basket = document.querySelector(".basket");

const modalWindow = document.getElementById("modal_window");

const basketCountShow = document.getElementById("countItems");

const wrap = document.querySelector(".glider");

let basketCount = 0;

const basketItems = JSON.parse(localStorage.getItem("basketItems")) || {};
let btnsToBasket = null;

let glider = null;

fetch("https://user-maxim-name.github.io/productList/products/products.json")
  .then((data) => data.json())
  .then((listProducts) => {
    aboutProducts = listProducts;

    for (let i = 0; i < aboutProducts.length; i++) {
      wrap.insertAdjacentHTML("beforeend", createCard(aboutProducts[i]));
    }
    btnsToBasket = document.querySelectorAll(".to_basket");
    btnsToBasket.forEach((btn) =>
      btn.addEventListener("click", addItemTobasket)
    );
    glider = new Glider(document.querySelector(".glider"), {
      slidesToShow: 4,

      draggable: true,
      rewind: true,
      arrows: {
        prev: ".left_arrow",
        next: ".right_arrow",
        rewind: true,
      },
    });
  });

document.addEventListener("DOMContentLoaded", (e) => {
  let storageCount = +localStorage.getItem("basketCount") || null;
  if (storageCount) {
    basketCount = storageCount;
    basketCountShow.style.display = "flex";
    basketCountShow.textContent = basketCount;
  }
});

function disableScroll() {
  document.body.style.overflow = "hidden";
}
function enableScroll() {
  document.body.style.overflow = "initial";
}

modalWindow.addEventListener("click", (e) => {
  if (e.target.id == "modal_window") {
    enableScroll();
    modalWindow.style.display = "none";
  }
});

function createModalWindow(content) {
  disableScroll();
  modalWindow.firstElementChild.innerHTML = " ";
  modalWindow.firstElementChild.insertAdjacentElement("afterbegin", content);
  modalWindow.style.display = "flex";
}

function validateValue(element) {
  const reg = new RegExp("^[1-9]{1}[0-9]{0,}$");
  let val = element.value;

  if (!reg.test(val)) {
    element.previousElementSibling.textContent = "Введіть коректне значення";
    element.previousElementSibling.classList.add("fail");
    return -1;
  }
}

function addItemTobasket(event) {
  const priceItem =
    event.target.previousElementSibling.querySelector(
      ".only_price"
    ).textContent;

  const nameItem =
    event.target.parentElement.querySelector(".name_product").textContent;

  const imgProduct =
    event.target.parentElement.querySelector(".image_product").src;

  const container = document.createElement("div");

  container.classList.add("count_products_order");

  const iCountProducts = document.createElement("input");
  iCountProducts.setAttribute("type", "number");
  iCountProducts.setAttribute("value", 1);
  iCountProducts.setAttribute("min", 1);

  const btnAddToBasket = document.createElement("div");

  const infoActionSpan = document.createElement("span");
  infoActionSpan.textContent = "Введіть кількість товару";
  infoActionSpan.classList.add("txt_action");

  btnAddToBasket.textContent = "Додати до кошика";
  btnAddToBasket.classList.add("btn_add_basket");

  const closeSpan = document.createElement("span");
  closeSpan.classList.add("close");
  closeSpan.textContent = "X";

  closeSpan.addEventListener(
    "click",
    (e) => (modalWindow.style.display = "none")
  );
  container.appendChild(infoActionSpan);
  container.appendChild(iCountProducts);
  container.appendChild(btnAddToBasket);
  container.appendChild(closeSpan);

  btnAddToBasket.addEventListener("click", (e) => {
    if (validateValue(iCountProducts) == -1) {
      return;
    }

    let added = false;

    for (let key in basketItems) {
      if (basketItems[key].name == nameItem) {
        basketItems[key].quantity += +iCountProducts.value;
        added = true;
      }
    }

    if (!added) {
      const id = new Date().getTime();

      basketItems[id] = {
        id,
        name: nameItem,
        price: priceItem,
        quantity: +iCountProducts.value,
        imgProduct,
      };
      added = false;
      basketCount++;
      basketCountShow.style.display = "flex";
      basketCountShow.textContent = basketCount;
      localStorage.setItem("basketCount", basketCount);
    }

    localStorage.setItem("basketItems", JSON.stringify(basketItems));

    const wrapChose = document.createElement("div");
    wrapChose.classList.add("rltv");
    const controlBtns = document.createElement("div");

    controlBtns.classList.add("next_action_choose");

    const btnBackToShop = document.createElement("div");

    const successText = document.createElement("span");
    successText.classList.add("success_txt");
    successText.textContent = "Товар успішно доданий!";

    const successImage = document.createElement("div");
    successImage.classList.add("img_info");

    const btnGoToBasketPage = document.createElement("div");

    btnBackToShop.classList.add("btn_control");

    btnBackToShop.textContent = "Повернутися до покупок";

    btnGoToBasketPage.classList.add("btn_control");

    btnGoToBasketPage.textContent = "Перейти до корзини";

    controlBtns.appendChild(btnBackToShop);
    controlBtns.appendChild(btnGoToBasketPage);

    wrapChose.appendChild(successText);
    wrapChose.appendChild(successImage);
    wrapChose.appendChild(controlBtns);
    wrapChose.appendChild(closeModal());

    btnBackToShop.addEventListener(
      "click",
      (e) => (modalWindow.style.display = "none")
    );
    btnGoToBasketPage.addEventListener("click", (e) => {
      openBasketWindow(e);
    });

    createModalWindow(wrapChose);
  });
  createModalWindow(container);
}

basket.addEventListener("click", (e) => {
  if (basketCount == 0) {
    const container = document.createElement("div");

    container.classList.add("rltv");

    const infoMsg = document.createElement("p");

    infoMsg.textContent = "Кошик порожній ";
    infoMsg.classList.add("info_txt");
    infoMsg.style.backgroundImage = "url('icons/shopping-cart_empty.png')";
    container.appendChild(infoMsg);

    container.appendChild(closeModal());

    createModalWindow(container);
    return;
  }
  openBasketWindow(e);
});

function openBasketWindow(e) {
  window.location = "basketPage.html";
}

function closeModal() {
  const closeSpan = document.createElement("span");
  closeSpan.classList.add("close");
  closeSpan.textContent = "X";

  closeSpan.addEventListener("click", (e) => {
    enableScroll();
    modalWindow.style.display = "none";
  });
  return closeSpan;
}

function createCard(item) {
  const card = `
  
  <div class="card  ${
    item.topSale == "true"
      ? "sticker_top_sales"
      : item.novelty == "true"
      ? "sticker_new"
      : ""
  }">
  <div class="chapter">
    <p class="chapter_name">${item.chapter}</p>
  </div>
 <a href="${item.urlProduct}" target="_blank"> <img
    src="${item.img}"
    alt=""
    class="image_product"
  /></a>

  <a href="${item.urlProduct}" target="_blank" class="name_product">${
    item.name
  }</a>
  <div class="price_product">${
    item.salePrice != "null" && item.available == "true"
      ? `<p class="current_price"><span class="old_price"> ${item.price} ГРН   </span><span class="only_price">${item.salePrice}</span>  ГРН</p>`
      : item.available == "true"
      ? `  <p class="currnet_price"><span class="only_price ">${item.price}</span> ГРН</p>`
      : ""
  }</div>
  ${
    item.available == "true"
      ? `<div class="to_basket">У корзину</div>`
      : `<div class="not_available">незабаром у продажі</div>`
  }
  </div>
 
  
`;

  return card;
}
