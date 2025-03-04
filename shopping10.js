const itemForm = document.getElementById('item-form');
const itemList = document.getElementById('item-list');
const itemInput = document.getElementById('item-input');
const clearBtn = document.getElementById('clear');
const itemFilter = document.getElementById('filter');
const formBtn = document.querySelector('.btn');
let isEditMode = false;

function onDisplay(){

    let itemFromStorage = getItemsFromStorage();
    itemFromStorage.forEach((item) => addItemToDom(item));
    checkUI();

}

function onAddSubmitItem(e){

    e.preventDefault();

    const newItem = itemInput.value;
    if(itemInput.value === ''){

        alert('Please add an item');
        return;

    }

    else{

        if(isEditMode){

            const itemToEdit = itemList.querySelector('.edit-mode');
            removeItemFromStorage(itemToEdit.textContent);
            itemToEdit.classList.remove('edit-mode');
            itemToEdit.remove();
        }
        else{

            if(checkIfItemExists(newItem)){
                alert('Item already exists');
                itemInput.value = '';
                return;

            }

        }


    }

        addItemToDom(newItem);
        addItemToStorage(newItem);
    


    itemInput.value = '';
    checkUI();

}

function createButton(classes){

    const button = document.createElement('button');
    button.className = classes;
    const icon = createIcon('fa-solid fa-xmark');
    button.appendChild(icon);
    return button;

}


function createIcon(classes){

    const icon = document.createElement('i');
    icon.className = classes;
    return icon;


}



function addItemToDom(item){

    const li = document.createElement('li');
    li.appendChild(document.createTextNode(item));
    const button = createButton('remove-item btn-link text-red');
    li.appendChild(button);
    itemList.appendChild(li);

}

function addItemToStorage(item){

    const itemFromStorage = getItemsFromStorage();
    itemFromStorage.push(item);
    localStorage.setItem('items',JSON.stringify(itemFromStorage));



}


function getItemsFromStorage(){

    let itemFromStorage;
    if(localStorage.getItem('items') === null){

        itemFromStorage = [];

    }
    else{

        itemFromStorage = JSON.parse(localStorage.getItem('items'));
    }

    return itemFromStorage;



}

function onClick(e){

    e.preventDefault();

   
        if(e.target.parentElement.classList.contains('remove-item')){

            removeItem(e.target.parentElement.parentElement);

        }
        else{

            setItemToEdit(e.target);
        }

}

function setItemToEdit(item){

    isEditMode = true;
    itemList.querySelectorAll('li').forEach((i) => i.classList.remove('edit-mode'));

    item.classList.add('edit-mode');
    formBtn.innerHTML = '<i class="fa-solid fa-pen"></i> Update Item';
    formBtn.style.backgroundColor = 'green';
    itemInput.value = item.textContent;



}

function checkIfItemExists(item){

    let itemFromStorage = getItemsFromStorage();
    return itemFromStorage.includes(item);


}

function removeItem(item){

    if(confirm('Are you Sure?')){
        
        item.remove();
        removeItemFromStorage(item.textContent);

    }
    

    alert('Successfully remove an Item');
    checkUI();
}

function removeItemFromStorage(item){


    let itemFromStorage = getItemsFromStorage();
    itemFromStorage = itemFromStorage.filter((i) => i !== item);
    localStorage.setItem('items',JSON.stringify(itemFromStorage));

}

function clearAllItems(){

    if(confirm('Are you Sure?')){

        while(itemList.firstChild){

            itemList.removeChild(itemList.firstChild);

        }
        
    }
    localStorage.removeItem('items');

        alert ('Successfully removed all items');
        checkUI();
}



function addFilter(e){

    const items = document.querySelectorAll('li');
    const filterChar = e.target.value.toLowerCase();
    items.forEach((item) => {

        const itemName = item.firstChild.textContent.toLocaleLowerCase();
        if(itemName.includes(filterChar)){

            item.style.display = 'flex';

        }
        else{

            item.style.display = 'none';
        }

    })


}

function checkUI(){


const items = document.querySelectorAll('li');
if(items.length === 0){

    itemFilter.style.display = 'none';
    clearBtn.style.display = 'none';

}
else{

    itemFilter.style.display = 'block';
    clearBtn.style.display = 'block';
}

    formBtn.innerHTML = '<i class="fa-solid fa-plus"></i> Add Item';
    formBtn.style.backgroundColor = 'black';
    itemInput.value = '';
    isEditMode = false;
    
}

itemForm.addEventListener('submit',onAddSubmitItem);
itemList.addEventListener('click',onClick);
clearBtn.addEventListener('click',clearAllItems);
itemFilter.addEventListener('input',addFilter);
document.addEventListener('DOMContentLoaded', onDisplay);

checkUI();