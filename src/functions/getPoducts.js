export async function getProducts(url) {
  let response = await fetch(url);
  let products = await response.json();

  return await products;
}
