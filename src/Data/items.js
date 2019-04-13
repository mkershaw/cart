export const getItems = async () => {
    const response = await fetch("http://localhost:3001/items")
    return response.json();
    


}

