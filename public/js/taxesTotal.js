let taxSwitch = document.querySelector("#flexSwitchCheckDefault");
let pricesBefore = document.querySelectorAll("#price-before");
let pricesAfter = document.querySelectorAll("#price-after");

taxSwitch.addEventListener("change", () => {
  if (taxSwitch.checked) {
    pricesBefore.forEach((price) => price.classList.add("none"));
    pricesAfter.forEach((price) => price.classList.remove("none"));
  } else {
    pricesBefore.forEach((price) => price.classList.remove("none"));
    pricesAfter.forEach((price) => price.classList.add("none"));
  }
});
