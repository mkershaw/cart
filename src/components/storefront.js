import React, { Component } from 'react';
import '/Users/michellekershaw/helio/practice02/newcart';
import { getCart, addItemToCart, removeItemFromCart } from '../components/cartfunction';
import {items} from 'http://localhost:3001/items';


    class Storefront extends Component {
        state = {
            inventory: [],
            cartItems: []
        }


        checkoutAlert = () => {
            alert(`Are you sure you're ready to check out?`)
        }

        async componentDidMount() {
            const items = await getItems();
            const cart = await getCart();
            this.setState({
                inventory: items,
                cartItems: cart || []
            })
        }

        addToCart = (item) => () => {
            addItemToCart(item)
                .then(cart =>
                    this.setState({
                        cartItems: cart
                    }))

        }

        removeItem = (item) => () => {
            removeItemFromCart(item.id)
                .then(cart =>
                    this.setState({
                        cartItems: cart
                    }))
        }



        render() {
            return (
                <div className="App">
                    <section style={{ display: 'flex' }}>
                        <div style={{ float: 'left', height: '90vh' }}>
                            <ul style={{
                                listStyle: 'none',
                                padding: 0,
                                display: 'flex',
                                flexWrap: 'wrap',
                                margin: 0,
                                justifyContent: 'center'
                            }}>
                                {this.state.inventory.map((item) => (
                                    <div style={{
                                        border: '2px solid gray',
                                        width: '140px',
                                        fontWeight: 'bold',
                                        margin: 5,
                                        display: 'grid',
                                        gridTemplateRows: '.5fr 2fr 1fr .5fr',
                                        alignItems: 'center',
                                        justifyItems: 'center'
                                    }}>
                                        <li >{item.name} </li>
                                        <img style={{
                                            width: 120
                                        }}
                                            src={item.image}
                                        />
                                        <p>Price = ${item.price}</p>
                                        <AddToCartButton style={{
                                            color: '#07AAFF',
                                            backgroundColor: '#282c34',
                                            height: 25,
                                            width: 140,
                                            fontWeight: 'bold',
                                            cursor: 'pointer'
                                        }}
                                            onClick={this.addToCart(item)}
                                        />
                                    </div>
                                ))}
                            </ul>
                        </div>
                        <div style={{
                            float: 'right',
                            width: '40em',
                            height: 'auto',
                            borderLeft: '2px solid gray',
                        }}>


                            {/*-------------THIS IS THE CART -------------------  */}

                            <h2 style={{
                                textDecoration: 'underline',
                                fontSize: 34
                            }}
                            >Cart</h2>
                            <ul style={{
                                listStyle: 'none',
                                paddingLeft: 0
                            }}>
                                {this.state.cartItems.map((item, id) => (
                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}>
                                        <li style={{
                                            paddingRight: 10,
                                            width: 120,
                                            fontWeight: 'bold',
                                            paddingTop: 10,
                                            fontSize: 22,
                                            border: '1px solid black',
                                            background: 'lightblue',
                                            margin: 5,
                                            lineHeight: 1
                                        }}>
                                            {item.name} <p style={{ fontSize: 16, lineHeight: .1 }}>{item.quantity} x ${item.price}</p>
                                        </li>
                                        <button style={{
                                            color: 'black',
                                            backgroundColor: 'lightgray',
                                            width: 30,
                                            height: 20,
                                            border: '2px solid black',
                                            fontWeight: 'bold',
                                            cursor: 'pointer'
                                        }}
                                            onClick={this.removeItem(item)}>X</button>
                                    </div>))}
                            </ul>
                            <h3>You have {this.state.cartItems.length} items in your cart.</h3>
                            <button
                                style={{
                                    backgroundColor: 'gold',
                                    border: '2px solid black',
                                    fontSize: 16,
                                    fontWeight: 'bold',
                                    width: 120,
                                    cursor: 'pointer'
                                }}
                                onClick={this.checkoutAlert}>Complete Purchase</button>
                        </div>
                    </section>
                </div>
            );
        }
    }
    export default Storefront;