export function sortProducts(array) {
  //sort by price
  let sortedArray = [];
  let biggestPrice = 0;
  let oldPrice = [];

  while (sortedArray.length < array.length) {
    //in for each we look for the biggest price
    array.forEach((element) => {
      //if we have a price in the sorted array already we skip it
      if (!oldPrice.includes(element.price)) {
        if (element.price > biggestPrice) {
          biggestPrice = element.price;
        }
      }
    });

    //when we found biggest price we add it to array
    sortedArray.push(
      array.filter((element) => element.price == biggestPrice)[0]
    );
    oldPrice.push(biggestPrice);
    biggestPrice = 0;
  }
  return sortedArray;
}
