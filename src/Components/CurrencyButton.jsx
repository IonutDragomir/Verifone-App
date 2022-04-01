import "../CSS/CurrencyButton.css";
import { useState } from "react";
import { OutsideAlerter } from "./OutsideAlerter";
import { getCurrencyRate } from "../functions/getCurrencyRate";

export function CurrencyButton(props) {
  const [display, setDisplay] = useState("none");
  const [currency, setCurrency] = useState("USD $");

  async function changeCurrency(selectedCurrency, symbol) {
    // select base currency to change from
    let baseCurrency = currency.split(" ")[0];

    let conversion = await getCurrencyRate(baseCurrency, selectedCurrency);
    //set conversion rate to a value to multiply with
    props.setExchangeRate({
      conversion_rate: conversion.conversion_rate,
      symbol: symbol,
    });
    setCurrency(`${selectedCurrency} ${symbol}`);
    setDisplay("none");
  }

  return (
    <OutsideAlerter display={display} setDisplay={setDisplay}>
      <p
        className="currency"
        onClick={() => {
          if (display === "none") {
            setDisplay("block");
          } else {
            setDisplay("none");
          }
        }}
      >
        Selected currency <span>{currency}</span>
      </p>
      <div className="currency-option" style={{ display: display }}>
        <p className="first" onClick={() => changeCurrency("USD", "$")}>
          USD $
        </p>
        <p className="second" onClick={() => changeCurrency("EUR", "€")}>
          EUR €
        </p>
        <p className="third" onClick={() => changeCurrency("GBP", "£")}>
          GBP £
        </p>
      </div>
    </OutsideAlerter>
  );
}
