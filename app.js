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

    editItems(i) {
        const listItem = list.children[i];
        const item = listItem.querySelector("p");

        item.contentEditable = true;
        item.focus();

        const editButton = listItem.querySelector(".editBtn"); 
        const saveButton = listItem.querySelector(".saveBtn"); 

        editButton.style.display = "none";
        saveButton.style.display = "inline-block";
    }

    saveItem(i) {
        const listItem = list.children[i];
        const item = listItem.querySelector("p");
        itemsArray[i] = item.textContent.trim();
        localStorage.setItem("items", JSON.stringify(itemsArray));
        this.displayItems();
    }

    hideSaveBtn() {
        const saveButtons = document.querySelectorAll(".saveBtn");
        saveButtons.forEach((saveButton) => {
        saveButton.style.display = "none";
    });

    }

    displayItems() {
        const list = document.querySelector(".list"); 

        let items = "";
        for (let i = 0; i < itemsArray.length; i++) {
            items += `<li class="item">
                <p>${itemsArray[i]}</p>
                <div>
                <i class="fa-solid fa-floppy-disk saveBtn"></i>
                <i class="fa-regular fa-pen-to-square editBtn"></i>
                <i class="fa-regular fa-square-check deleteBtn"></i>
                </div>
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

    if (e.target.classList.contains("editBtn")) {
        const listItem = e.target.closest("li");
        const itemIndex = Array.from(list.children).indexOf(listItem);
        app.editItems(itemIndex);

        const editButton = listItem.querySelector(".editBtn"); 
        const saveButton = listItem.querySelector(".saveBtn"); 

        editButton.style.display = "none";
        saveButton.style.display = "inline-block";
    }

    if (e.target.classList.contains("saveBtn")) {
        const listItem = e.target.closest("li");
        const itemIndex = Array.from(list.children).indexOf(listItem);
        app.saveItem(itemIndex);
        app.hideSaveBtn()
        location.reload()
    }
});

window.onload = function() {
    app.displayItems()
    app.hideSaveBtn()
}

input.addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        e.preventDefault();
        addButton.click();
    }
});



