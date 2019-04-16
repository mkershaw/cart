import React from "react";


export const ItemForm = (handleSubmit) => (
    <form submit={handleSubmit}>
        <label> Name:</label>
        <input type="text"placeholder="Item Name"/>
        <label> Price:</label>
        <input type="text"placeholder="Price"/>
        <label> Image:</label>
        <input type="text"placeholder="Image"/>

        
        </form>

)