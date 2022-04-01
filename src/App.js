import "./CSS/App.css";
import { getProducts } from "./functions/getPoducts";
import { sortProducts } from "./functions/sortProducts";
import { Product } from "./Components/Product";
import { useEffect, useState } from "react";
import { Cart } from "./Components/Cart";
import { CurrencyButton } from "./Components/CurrencyButton";

function App() {
  //create state for products returned from api
  const [items, setItems] = useState(null);
  //create state for selected products to add in cart
  const [selectedProduct, setSelectedProduct] = useState("");
  //create state to get the exchanged rate between currency
  const [exchangeRate, setExchangeRate] = useState("");

  //get all the data from api
  async function generateData() {
    let result = await getProducts(
      "http://private-32dcc-products72.apiary-mock.com/product"
    );
    //sort products descending based on prices
    setItems(sortProducts(result));
  }
  useEffect(() => {
    generateData();
  }, []);

  return (
    <div className="mainPage">
      <div className="display-products">
        <h1 className="title">Checkout page</h1>
        <hr className="selected" />
        {
          //component to change currency
        }
        <CurrencyButton setExchangeRate={setExchangeRate} />

        {items != null
          ? items.map((product) => {
              let isInCart = false;
              //check between items array and selectedProduct array to see if
              //they have identical products to skip them from displaying
              if (selectedProduct != "") {
                selectedProduct.map((element) => {
                  if (product.name === element.name) {
                    isInCart = true;
                  }
                });
              }
              if (isInCart == false) {
                return (
                  //each product
                  <Product
                    key={product.id}
                    name={product.name}
                    price={product.price}
                    id={product.id}
                    description={product.description}
                    exchangeRate={exchangeRate}
                    selectedProduct={selectedProduct}
                    setSelectedProduct={setSelectedProduct}
                  />
                );
              }
            })
          : ""}
      </div>
      {
        //the cart
      }
      <Cart
        exchangeRate={exchangeRate}
        selectedProduct={selectedProduct}
        setSelectedProduct={setSelectedProduct}
      />
    </div>
  );
}

export default App;
