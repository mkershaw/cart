import React from "react";

export const List = ({ addToCart, items }) => (
  <div>
    <h4>Store</h4>
    <ul>
      {items.map((item, key) => (
        <li key={key} onClick={addToCart(item)}>
          {item}
        </li>
      ))}
    </ul>
  </div>
);

