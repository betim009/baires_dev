import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addStock } from '../app/counterSlice';

export default function StockCard(props) {
  const [quantity, setQuantity] = useState(0);
  const dispatch = useDispatch();

  function disabled() {
  }

  // Increment button should increment the quantity while decrement button should decrement the quantity
  //buy button should only be enabled if quantity is greater than 0 - compelete disabled function
  // onClick buy button should add quatity using addstock function (already imported)
  return (
    <div className="col-sm-4 mx-auto my-5">
      <div className="card width bg-dark">
        <div className="card-body text-light">
          <h5 className="card-title" data-testid={`${props.value.company}-stockcard`}>
            {props.value.company}
          </h5>
          <p className="card-text">Price :- {props.value.price}</p>
          <p className="card-text">
            Quantity :- <span data-testid="quantity">{quantity}</span>
          </p>
          <p className="card-text">
            Total Value ={' '}
            <span data-testid="totalPrice">{quantity * props.value.price}</span>
          </p>
          <button
            className="btn btn-primary text-light mx-1"
            data-testid="increment"
          >
            Increament
          </button>
          <button
            className="btn btn-primary text-light mx-1"
            disabled={disabled()}
            data-testid="decrement"
          >
            Decrement
          </button>
          <button
            className="btn btn-danger mx-auto my-3 buy"
            disabled={disabled()}
            data-testid = "buy"
          >
            Buy
          </button>
        </div>
      </div>
    </div>
  );
}
