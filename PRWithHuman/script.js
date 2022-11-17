const basket = document.querySelector(".basket");

const modalWindow = document.getElementById("modal_window");

const basketCountShow = document.getElementById("countItems");

let basketCount = 0;

const basketItems = JSON.parse(localStorage.getItem("basketItems")) || {};

const btnsToBasket = document.querySelectorAll(".to_basket");

document.addEventListener("DOMContentLoaded", (e) => {
  let storageCount = +localStorage.getItem("basketCount") || null;
  if (storageCount) {
    basketCount = storageCount;
    basketCountShow.style.display = "flex";
    basketCountShow.textContent = basketCount;
  }
});



modalWindow.addEventListener("click",(e)=>{
  if(e.target.id=="modal_window"){

    modalWindow.style.display = "none"
  }
})

btnsToBasket.forEach((btn) => btn.addEventListener("click", addItemTobasket));

function createModalWindow(content) {
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

  closeSpan.addEventListener(
    "click",
    (e) => (modalWindow.style.display = "none")
  );
  return closeSpan;
}
