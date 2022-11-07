document.addEventListener("DOMContentLoaded", () => showTab(0));
let rtl = document.getElementById("rtl");

let rtr = document.getElementById("rtr");

let rbr = document.getElementById("rbr");

let rbl = document.getElementById("rbl");

let textBlock = document.querySelector("textarea");

let ttl = document.getElementById("ttl");

let ttr = document.getElementById("ttr");

let tbr = document.getElementById("tbr");

let tbl = document.getElementById("tbl");

let block = document.getElementById("block");

let alignParam = document.querySelector(".align_param");

let alignBlock = document.querySelector(".container_align");

const decoratedValue = document.querySelector(".decorate_value");

const decoratedText = document.querySelector(".decorated_text");

rtl.addEventListener("input", generate);

rtr.addEventListener("input", generate);

rbr.addEventListener("input", generate);

rbl.addEventListener("input", generate);

alignParam.addEventListener("change", (e) => {
  alignBlock.style.textAlign = alignParam.value;
  alignParam.nextElementSibling.textContent = `text-align: ${alignParam.value};`;
});

decoratedValue.addEventListener("change", (e) => {
  decoratedText.style.textDecoration = decoratedValue.value;
  decoratedValue.nextElementSibling.textContent = `text-decoration: ${decoratedValue.value};`;
});

function generate(e) {
  ttl.value = +rtl.value;
  ttr.value = +rtr.value;
  tbr.value = +rbr.value;
  tbl.value = +rbl.value;

  let result =
    ttl.value +
    "px " +
    ttr.value +
    "px " +
    tbr.value +
    "px " +
    tbl.value +
    "px";

  block.style.borderRadius = result;
  textBlock.value = "border-radius: " + result + ";";
}

document.querySelector(".tab-header").addEventListener("click", (e) => {
  if (!e.target.classList.contains("tab-h")) return;

  showTab(e.target.dataset.tab);
});

function showTab(index) {
  let indexTab = index;

  let tabsWithHeader = document.querySelectorAll(".tab-h");

  let tabWithContents = document.querySelectorAll(".tabContent");

  for (let i = 0; i < tabsWithHeader.length; i++) {
    tabsWithHeader[i].classList.remove("active");

    if (i == indexTab) tabWithContents[i].style.display = "block";
    else tabWithContents[i].style.display = "none";
  }
  tabsWithHeader[indexTab].classList.add("active");
}
