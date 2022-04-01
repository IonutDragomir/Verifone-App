import "../CSS/Cart.css";
import { useState, useEffect } from "react";
import { AddedProduct } from "./AddedProduct";

export function Cart(props) {
  //create state to contain final price of the product,
  // if the user if the user changes the quantity
  const [productPrice, setProductPrice] = useState(0);
  //create state to contain final price of all the products
  const [totalAll, setTotalAll] = useState(0);

  //create state to highlight that a value has been changed and
  //to retain the final price of the product
  const [changedQuantity, setChangedQuantity] = useState({
    changed: false,
    oldValue: 0,
  });

  //when the quantity has changed
  useEffect(() => {
    if (changedQuantity.changed == true) {
      //from the total value of all products we delete the former final price
      setTotalAll(parseFloat(totalAll) - changedQuantity.oldValue);
    }
  }, [changedQuantity]);

  //when the final price of the product changes because the quantity has changed
  useEffect(() => {
    //add the modified price
    setTotalAll((parseFloat(totalAll) + parseFloat(productPrice)).toFixed(2));
    setChangedQuantity({
      changed: false,
      oldValue: 0,
    });
  }, [productPrice]);

  //no products selected, show just message
  if (props.selectedProduct == "") {
    return (
      <div className="cart-container heightAdded">
        <p className="cart-title">No products in your shopping cart</p>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <p className="cart-title">Products in your shopping cart</p>
      <div className="cart-labels">
        <p>Product</p>
        <p>Quantity</p>
        <p>Value</p>
      </div>
      <hr className="cart-firstLine" />
      {props.selectedProduct.map((element) => {
        let symbol = "$";
        let price;
        if (props.exchangeRate != "") {
          symbol = props.exchangeRate.symbol;

          price = (props.exchangeRate.conversion_rate * element.price).toFixed(
            2
          );
        } else if (props.exchangeRate == "") {
          price = element.price.toFixed(2);
        }

        return (
          <AddedProduct
            name={element.name}
            price={price}
            symbol={symbol}
            key={element.id}
            added={true}
            description={element.description}
            selectedProduct={props.selectedProduct}
            setSelectedProduct={props.setSelectedProduct}
            exchangeRate={props.exchangeRate}
            productPrice={productPrice}
            setProductPrice={setProductPrice}
            setChangedQuantity={setChangedQuantity}
          />
        );
      })}
      <hr className="cart-secondLine" />
      <p className="cart-total">
        {
          //change the price and symbol if the currency was changed
        }
        Total: {props.exchangeRate != "" ? props.exchangeRate.symbol : "$"}
        {props.exchangeRate != ""
          ? parseFloat(
              (totalAll * props.exchangeRate.conversion_rate).toFixed(2)
            )
          : totalAll}
      </p>
      <button className="next">Continue</button>
    </div>
  );
}
