export const getItems = async () => {
    const response = await fetch("http://localhost:4000/items")
    return response.json();
    


}

