const input = document.querySelector("#input");
const addButton = document.querySelector(".add-button");
const list = document.querySelector(".list");

// storage list
const itemsArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : []

console.log(itemsArray)

class GroceryList {
    constructor (item) {
        this.item = item
    }

    createItem() {
        if (input.value !== '') {  // won't send if there is no input
        itemsArray.push(input.value);  // adding input to storage list
        this.updateLocalStorage();
        this.displayItems();
        }
    }

    deleteItem(i) {
        itemsArray.splice(i, 1);  //  removing just this one item from storage list
        this.updateLocalStorage();
        this.displayItems();
    }

    editItems(i) {
        const listItem = list.children[i];
        const item = listItem.querySelector("p");

        item.contentEditable = true;  // making it possible to edit item text
        item.focus();  // highlights the editable item text

        const editButton = listItem.querySelector(".editBtn"); 
        const saveButton = listItem.querySelector(".saveBtn"); 

        editButton.style.display = "none";  // hiding edit button
        saveButton.style.display = "inline-block";  // displaying save button
    }

    saveItem(i) {
        const listItem = list.children[i];  
        const item = listItem.querySelector("p");
        itemsArray[i] = item.textContent.trim();  // returns the updated string
        this.updateLocalStorage();
        this.displayItems();
        this.hideSaveBtn();
    }

    hideSaveBtn() {
        const saveButtons = document.querySelectorAll(".saveBtn");
        saveButtons.forEach((saveButton) => {
        saveButton.style.display = "none";
    });

    }

    displayItems() {
        let items = ""; // starting with an emtpy string to further be able to add dom content
        for (let i = 0; i < itemsArray.length; i++) {  // adding each item in the storage list to the html content
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

    updateLocalStorage() {
        localStorage.setItem("items", JSON.stringify(itemsArray));
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
    const listItem = e.target.closest("li");
    const itemIndex = Array.from(list.children).indexOf(listItem);

    if (e.target.classList.contains('deleteBtn')) {
        listItem.remove();
        app.deleteItem(itemIndex);
        location.reload()
    }

    if (e.target.classList.contains("editBtn")) {
        const editButton = listItem.querySelector(".editBtn"); 
        const saveButton = listItem.querySelector(".saveBtn"); 

        app.editItems(itemIndex);
        editButton.style.display = "none";
        saveButton.style.display = "inline-block";
    }

    if (e.target.classList.contains("saveBtn")) {
        app.saveItem(itemIndex);
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



