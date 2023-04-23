function convert() {
  const currencyFrom = document.getElementById("currency-from").value;
  const currencyTo = document.getElementById("currency-to").value;
  const amount = document.getElementById("amount").value;

  const url = `https://api.exchangerate-api.com/v4/latest/${currencyFrom}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const rate = data.rates[currencyTo];
      const result = amount * rate;
      document.getElementById("result").value = result.toFixed(2);
    })
    .catch(error => console.error(error));
}

const currencyFromSelect = document.getElementById("currency-from");
const currencyToSelect = document.getElementById("currency-to");

fetch("https://api.exchangerate-api.com/v4/latest/USD")
  .then(response => response.json())
  .then(data => {
    for (const currency in data.rates) {
      const option = document.createElement("option");
      option.value = currency;
      option.textContent = `${currency} - ${getCurrencySymbol(currency)}`;
      currencyFromSelect.appendChild(option);
    }

    for (const currency in data.rates) {
      const option = document.createElement("option");
      option.value = currency;
      option.textContent = `${currency} - ${getCurrencySymbol(currency)}`;
      currencyToSelect.appendChild(option);
    }
  })
  .catch(error => console.error(error));

const amountInput = document.getElementById("amount");

amountInput.addEventListener("input", convert);

function getCurrencySymbol(currencyCode) {
  switch (currencyCode) {
    case "USD":
      return "$";
    case "EUR":
      return "€";
    case "JPY":
      return "¥";
    case "GBP":
      return "£";
    case "AUD":
      return "A$";
    case "CAD":
      return "C$";
    case "CHF":
      return "Fr.";
    case "CNY":
      return "¥";
    case "HKD":
      return "HK$";
    case "NZD":
      return "NZ$";
    default:
      return "";
  }
}
