import React, { Component } from 'react';
import { getItems } from '../Data/items'

class Admin extends Component {
    state = {
        inventory: [],
        name: '',
        imageUrl: '',
        price: '',
        newItem: [],
        updatedName: '',
        updatedImageUrl: '',
        updatedPrice: '',

    }
    async componentDidMount() {
        //try {
        const inventory = await getItems();
        this.setState({
        inventory,
        })
    }
    handleChange = (event) => {
        const target = event.target;
        const value = event.value;
        const name = event.name;
        this.setState({
            [name]: value
        })
    }
    addItemToInventory = () => new Promise((resolve, reject) => {
        const newObject = {
            name: this.state.name,
            image: this.state.url,
            price: this.state.price,
        }
        fetch("http://localhost:4000/items", {
            method: "POST",
            headers: { "content-Type": "application/json" },
            body: JSON.stringify(newObject)
        })
            .then(inventory => {
                resolve(inventory.json())
            }).catch(reject)
    })

    updateInventory = (name) => () => {
        this.updateInventoryItem(name)
            .then(inventory =>
                this.setState({
                    inventory: inventory
                }))
            .then(
                this.clearUpdateInputs
            )
    }
    removeFromInventory = (name) => () => {
        const data = JSON.stringify ({
            inventory: this.state.inventory
        })
        this.removeInventoryItem(name)
            .then(inventory =>
                this.setState({
                    inventory: inventory
                })).then (
                    fetch("http://localhost:4000/items", {
                        method: "DELETE",
                        headers: { "content-Type": "application/json" },
                        body: data 

                })).then (
                    console.log("data", data)
                )
              
            }
    

    render() {
        return (
            <div className="Admin">
            <h1>Admin</h1>
                <ul style={{ display: 'flex', flexDirection: 'column', lineHeight: .05 }}>
                    {this.state.inventory.map((item) => (
                        <div>
    
                            <li style={{
                                display: 'flex', flexDirection: 'row', flexWrap: 'wrap'
                            }}>
                                <div style={{ display: 'flex', flexDirection: 'row' }}>
                                <p style={{ paddingRight: 5 }}>Name: {item.name} </p>
                                
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'row' }}>
                                    <p style={{ paddingRight: 5, paddingLeft: 5 }}>Price: </p>
                                    <input class='inventory' value={item.price} style={{ width: 80, fontSize: 16, height: 20, paddingTop: 5 }}></input>
                                </div>
                                <img src = {item.image}
                                width="50px" height="50px"/>
                                <button style={{
                                    color: '#07AAFF',
                                    backgroundColor: '#282c34',
                                    height: 25,
                                    width: 80,
                                    fontWeight: 'bold',
                                    cursor: 'pointer',
                                    alignSelf: 'center',
                                    marginRight: 5
                                }} onClick={this.removeFromInventory(item)}>Remove</button>
                            </li>
                        </div>
                    ))}
                </ul>

            </div>
        );
    }
}

export default Admin;
