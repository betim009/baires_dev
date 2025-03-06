import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { setStock,setQuantity } from '../app/counterSlice';

export default function Form(props) {
  const dispatch = useDispatch()  
  const value = useSelector((state) => state.counter.value);
  const [input, setInput] = useState(0);
  const handleSell = () => {
    //implement sell functionality
    // add or substact the value in user funds, add an alert if user try to sell more than the stock he owns

    props.handleChange();
  };
  return (
    <>
      <h1>Company Name :- {value[props.index].company}</h1>
      <h1>Stocks Owned :- {value[props.index].quantity}</h1>
      <label>
        <h1>Stocks want to sell :- </h1>
      </label>
      <input
        type="number"
        value={input}
        placeholder="0"
        onChange={(e) => {
          setInput(e.target.value);
        }}
        data-testid = "input-form"
      />
      <br />
      <button className="btn btn-danger" onClick={handleSell} data-testid = "sell-form">
        Sell
      </button>
      {/* <h1>Company Name :- {value[props.index].company}</h1> */}
    </>
  );
}
