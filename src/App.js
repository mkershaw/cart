import React, { Component } from 'react';
import './App.css'
import { getCart, addItemToCart, removeItemFromCart } from './components/cartfunction'
import { getItems } from './Data/items'
import { Cart } from "./components/Cart";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import InventoryList from "./components/inventorylist";
import Admin from './Pages/admin';





class App extends Component {

  state = {
    items: [],
    cart: [],
}


  async componentDidMount() {
    try {
      const items = await getItems();
      // const cart = await getCart();
      console.log(items)
      // console.log(cart)
      this.setState({
        items,
        // cart
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
        <Router>
          <Link to="/admin">Admin</Link>
          <Link to="/">Home</Link>
          
          <Route path= "/admin" component= {Admin} />  
          <Route path="/" exact component={() => (
            <React.Fragment>
              <h1>  Scrapbooking Store </h1>
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
            </React.Fragment>
          )} />

        </Router>


      </div>
    );
  }
}

export default App;
