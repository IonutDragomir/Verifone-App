export async function getCurrencyRate(baseCurrency, selectedCurrency) {
  let url = `https://v6.exchangerate-api.com/v6/3725d1edb275e5c9a8b41f36/pair/${baseCurrency}/${selectedCurrency}`;
  let response = await fetch(url);
  let data = response.json();

  return data;
}
