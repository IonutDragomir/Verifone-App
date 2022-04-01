import { useEffect, useState } from "react";
import "../CSS/AddedProduct.css";

export function AddedProduct(props) {
  const [quantity, setQunatity] = useState(1);
  //state to toggle the product description from visible to none
  const [display, setDsiplay] = useState("none");
  //state to update if quantity changes
  const [finalPrice, setFinalPrice] = useState(0);

  useEffect(() => {
    props.setChangedQuantity({
      changed: true,
      oldValue: parseFloat(finalPrice),
    });
    setFinalPrice(parseFloat(props.price * quantity).toFixed(2));
  }, [quantity]);

  useEffect(() => {
    props.setProductPrice(finalPrice);
  }, [finalPrice]);

  function removeProduct() {
    //we set setProductPrice to the same value,
    //but negative to subtract it from the total value when the product is deleted
    props.setProductPrice(`-${finalPrice}`);
    //rearrange the list of products added to the cart
    props.setSelectedProduct(
      props.selectedProduct.filter((element) => element.name != props.name)
    );
  }

  return (
    <>
      <div className="addedProduct">
        <div className="removeButton-name-info-container">
          <button onClick={() => removeProduct()}>-</button>
          <p className="addedProduct-name">{props.name}</p>
          <div
            className="addedProduct-description"
            onMouseEnter={() => setDsiplay("block")}
            onMouseLeave={() => setDsiplay("none")}
          >
            i
          </div>
        </div>
        <div className="addedProduct-quantity-container">
          <button onClick={() => setQunatity(quantity + 1)}>+</button>
          <div className="addedProduct-quantity-number">{quantity}</div>
        </div>
        <p className="addedProduct-price">
          {props.symbol}
          {props.exchangeRate != ""
            ? parseFloat(
                (finalPrice * props.exchangeRate.conversion_rate).toFixed(2)
              )
            : finalPrice}
        </p>
        <div
          className="addedProduct-descriptionBox"
          style={{ display: display }}
        >
          {props.description != undefined ? (
            props.description
          ) : (
            <p style={{ fontStyle: "italic" }}>
              This product has no description
            </p>
          )}
        </div>
      </div>
    </>
  );
}
