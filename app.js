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
        itemsArray.push(input.value);
        localStorage.setItem('items', JSON.stringify(itemsArray));
        this.displayItems();
    }

    deleteItem(i) {
        itemsArray.splice(i, 1);
        localStorage.setItem("items", JSON.stringify(itemsArray));
        this.displayItems();
    }

    displayItems() {
        let items = "";
        for (let i = 0; i < itemsArray.length; i++) {
            items += `<li class="item">
                <p>${itemsArray[i]}</p>
                <i class="fa-regular fa-square-check deleteBtn"></i>
            </li>`;
        }
        list.innerHTML = items;
    }

}

let app = new GroceryList();

addButton.addEventListener('click', (e) => {
    e.preventDefault()
    app.createItem(input.value)
    input.value = ""
    location.reload()
}) 


list.addEventListener('click', (e) => {
    e.preventDefault();

    if (e.target.classList.contains('deleteBtn')) {
        const listItem = e.target.closest('li');
        const itemIndex = Array.from(list.children).indexOf(listItem);
        listItem.remove();
        app.deleteItem(itemIndex);
        location.reload()
    }
});

window.onload = function() {
    app.displayItems()
    }

input.addEventListener("keypress", function(e) {
        if (e.key === "Enter") {
            e.preventDefault();
            addButton.click();
        }
});