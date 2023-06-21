const input = document.querySelector("#input");
const addButton = document.querySelector(".add-button");
const list = document.querySelector(".list");

const itemsArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : []

console.log(itemsArray)

class GroceryList {
    constructor (item) {
        this.item = item
    }

    createItem() {
        itemsArray.push(input.value)
        localStorage.setItem('items', JSON.stringify(itemsArray))
        location.reload()
    }

    
 displayItems() {
    let items = ""
    for(let i = 0; i < itemsArray.length; i++) {
        items += ` <li>${itemsArray[i]}</li>`
}

list.innerHTML = items
 }
}

let app = new GroceryList();

addButton.addEventListener('click', (e) => {
    e.preventDefault()
    app.createItem(input.value)
}) 

window.onload = function() {
    app.displayItems()
    }