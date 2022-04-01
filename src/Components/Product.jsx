import { useEffect, useState } from "react";
import "../CSS/Product.css";
import cart from "../images/cart.png";

export function Product(props) {
  //create state for price and symbol to update if the currency changes
  const [price, setPrice] = useState();
  const [symbol, setSymbol] = useState("$");

  useEffect(() => {
    if (props.exchangeRate != "") {
      setPrice((props.price * props.exchangeRate.conversion_rate).toFixed(2));
      setSymbol(props.exchangeRate.symbol);
    } else if (props.exchangeRate == "") {
      setPrice(props.price);
    }
  }, [props.exchangeRate]);

  return (
    <div className="product-container">
      <p className="product-name">{props.name}</p>
      <div className="priceButton-container">
        <p className="price">
          Price:
          <span>
            {symbol}
            {price}
          </span>
        </p>
        <button
          className="addButton"
          onClick={() => {
            //if the user chooses this product,
            //we update selectedProduct state with the properties of this product
            props.setSelectedProduct([
              ...props.selectedProduct,
              {
                name: props.name,
                price: price,
                id: props.id,
                description: props.description,
                symbol: symbol,
              },
            ]);
          }}
        >
          <img src={cart} />
          Add to cart
        </button>
      </div>
    </div>
  );
}
