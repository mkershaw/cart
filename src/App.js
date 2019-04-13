import React, { Component } from 'react';
import './App.css'
import { getCart, addItemToCart, removeItemFromCart } from './components/cartfunction'
import { getItems } from './Data/items'
import { List } from "./components/List";
import { Cart } from "./components/Cart";

class App extends Component {

  state = {
    items: [],
    cart: [],


  }


  async componentDidMount() {
    try {
      const items = await getItems();
      const cart = await getCart();
      console.log(items)
      console.log(cart)
      this.setState({
        items: items,
        cart: cart
      })
    }
    catch (err) {
      console.log(err)
    }
  }
  addToCart = (item) => () => {
    addItemToCart(item)
      .then(cart =>
        this.setState({
          cart: cart
        }))
  }
  removeFromCart = (item) => () => {
    removeItemFromCart(item.id)
      .then(cart =>
        this.setState({
          cart: cart
        }))
  }
  render() {
    return (
      <div className="App">
        <h1>  My Store </h1>
        <ul>
          {this.state.items.map((item) =>
            <li>
              {item.name}
              <img src={item.image} />
              <button onClick={this.addToCart(item)}>Add to Cart</button>
            </li>
          )}
        </ul>

        <h1> My Cart </h1>
        <ul>
          {this.state.cart.length > 0 ?
            this.state.cart.map((item, id) =>
              <li>
                {item.name}
                <button onClick={this.removeFromCart(item)}>Remove</button>
              </li>
            )
            :
            <p> Cart is empty</p>
          }
        </ul>





      </div>
    );
  }
}

export default App;
