const basketItems = JSON.parse(localStorage.getItem("basketItems")) || null;

const basketContainer = document.querySelector(".basket_container");

const showOrderPrice = document.getElementById("sumOrder");

const payPanel = document.querySelector(".total_pay");

let countItemsInBasket = 0;

const orderBtn = document.querySelector(".order_btn");

const showMessageEmptyBasket = document.querySelector(".total_none");

document.addEventListener("DOMContentLoaded", (e) => {
  countItemsInBasket = +localStorage.getItem("basketCount");
  ShowContentBsket();
});

orderBtn.addEventListener("click", (e) => {
  localStorage.clear();
});

if (basketItems !== null) {
  showProductsBuskets();
  calculateSumOrder();
} else {
  showMessageEmptyBasket.getElementsByClassName.display = "block";
}

function showProductsBuskets() {
  const keys = Object.keys(basketItems);
  for (let i = 0; i < keys.length; i++) {
    const item = createItem(basketItems[keys[i]]);

    basketContainer.insertAdjacentElement("afterbegin", item);
  }
}

function createItem(item) {
  const container = document.createElement("div");
  container.classList.add("basket_item");
  const img = document.createElement("img");
  img.src = item.imgProduct;
  img.classList.add("img_product");
  const productNameSpan = document.createElement("span");
  productNameSpan.classList.add("name_product");
  productNameSpan.textContent = item.name;
  const priceSpan = document.createElement("span");
  priceSpan.textContent = item.price * item.quantity + "₴";
  priceSpan.classList.add("price_item");

  const removeItem = document.createElement("div");
  removeItem.textContent = " ";
  removeItem.classList.add("remove_item");
  container.setAttribute("data-article", item.id);

  removeItem.addEventListener("click", (e) => {
    const itemProduct = e.target.parentElement;
    delete basketItems[itemProduct.dataset.article];
    basketContainer.removeChild(itemProduct);
    countItemsInBasket--;
    ShowContentBsket();

    calculateSumOrder();
  });

  container.append(
    img,
    productNameSpan,
    createQuantity(item.quantity),
    priceSpan,
    removeItem
  );
  return container;
}

function createQuantity(quantity = 1) {
  const container = document.createElement("div");
  container.classList.add("qty");
  const btnIncrease = document.createElement("button");
  const iValue = document.createElement("input");
  const btnDecrease = document.createElement("button");

  iValue.setAttribute("type", "number");
  iValue.classList.add("count_product");

  iValue.value = quantity;

  btnDecrease.textContent = "─";
  btnIncrease.textContent = "+";

  if (quantity == 1) {
    btnDecrease.disabled = true;
    btnDecrease.style.color = "silver";
  }

  iValue.addEventListener("focusout", (e) => {
    if (validateValue(iValue) == -1 || +iValue.value == 1) {
      iValue.value = 1;
      btnDecrease.disabled = true;
      btnDecrease.style.color = "silver";
    }

    if (+iValue.value > 1) {
      btnDecrease.disabled = false;
      btnDecrease.style.color = "#3e77aa";
    }

    let id = e.target.closest(".basket_item").dataset.article;

    basketItems[id].quantity = +iValue.value;
    localStorage.setItem("basketItems", JSON.stringify(basketItems));
    e.target.parentElement.nextElementSibling.textContent =
      basketItems[id].quantity * basketItems[id].price + "₴";
    calculateSumOrder();
  });

  btnIncrease.addEventListener("click", (e) => {
    iValue.value = +iValue.value + 1;

    if (+iValue.value > 1) btnDecrease.style.color = "#3e77aa";

    const sumOfProduct = e.target.parentElement.nextSibling;

    const id = e.target.parentElement.parentElement.dataset.article;

    sumOfProduct.textContent = +iValue.value * basketItems[id].price + "₴";

    basketItems[id].quantity = +iValue.value;

    localStorage.setItem("basketItems", JSON.stringify(basketItems));
    calculateSumOrder();
    if (iValue.value > 1) {
      btnDecrease.disabled = false;
    }
  });

  btnDecrease.addEventListener("click", (e) => {
    iValue.value = +iValue.value - 1;

    if (validateValue(iValue) == -1 || iValue.value == 1) {
      iValue.value = 1;
      btnDecrease.style.color = "silver";
      btnDecrease.disabled = true;
    }

    const sumOfProduct = e.target.parentElement.nextSibling;

    const id = e.target.parentElement.parentElement.dataset.article;

    sumOfProduct.textContent = +iValue.value * basketItems[id].price + "₴";

    basketItems[id].quantity = +iValue.value;

    localStorage.setItem("basketItems", JSON.stringify(basketItems));
    calculateSumOrder();
  });

  container.append(btnDecrease, iValue, btnIncrease);
  return container;
}

function calculateSumOrder() {
  let sum = 0;

  const keys = Object.keys(basketItems);

  keys.forEach((key) => {
    const product = basketItems[key];
    sum += product.price * product.quantity;
  });
  showOrderPrice.textContent = sum + "₴";
}

function ShowContentBsket() {
  if (basketItems == null || Object.keys(basketItems).length == 0) {
    localStorage.clear();
    payPanel.style.display = "none";
    showMessageEmptyBasket.style.display = "flex";
  } else {
    localStorage.setItem("basketCount", countItemsInBasket);
    localStorage.setItem("basketItems", JSON.stringify(basketItems));
  }
}

function validateValue(element) {
  const reg = new RegExp("^[1-9]{1}[0-9]{0,}$");
  let val = +element.value;

  if (!reg.test(val)) {
    return -1;
  }
}
