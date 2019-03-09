import React from "react";

export const Cart = ({ items, removeFromCart }) => (
  <div>
    <h4>Cart</h4>
    <ul>
      {items.map((item, index) => (
        <li key={index} onClick={removeFromCart(index)}>
          {item}
        </li>
      ))}
    </ul>
  </div>
);

