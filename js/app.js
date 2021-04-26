// Elements
const clear = document.querySelector(".clear");
const addItem = document.querySelector(".add-to-do");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");


// Classes 
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const EDIT = "fa-pencil";
const LINE_THROUGH = "lineThrough";

// Variables
let LIST, id;

// Get item from localstorage
let data = localStorage.getItem("TODO");

// Check if data is not empty
if(data){

    LIST = JSON.parse(data);
    id = LIST.length; // Set the id to the last item  on the list
    loadList(LIST); // Load the list to the user's interface

}else{
    // If data isn't empty
    LIST = [];
    id = 0;
}

// Load items to the user's interface
function loadList(array){

    array.forEach(function(item){
        addToDo(item.name, item.id, item.done, item.trash);
    });
}

// Clear the local storage
clear.addEventListener("click", function(){

    localStorage.clear();
    location.reload();
});

// Shows today's date
const options = {weekday : "long", month:"short", day:"numeric"};
const today = new Date();

dateElement.innerHTML = today.toLocaleDateString(undefined, options);

// Add to do item function
function addToDo(toDo, id, done, trash){
    
    if(trash){ return; }
    
    const DONE = done ? CHECK : UNCHECK;
    const EDIT = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : "";
    
    const item = `<li class = "item">
                    <i class = "fa ${DONE} co" job = "complete" id = "${id}"></i>
                    <p class = "text ${LINE}">${toDo}</p>
                    <i class = "fa fa-trash-o de" job = "delete" id = "${id}"></i>
                    <i class = "fa fa-pencil ed" aria-hidden = "edit" id = "${id}"></i>
                  </li>
                `;
    
    const position = "beforeend";
    
    list.insertAdjacentHTML(position, item);
}

// Add an item to the list user the enter key
document.addEventListener("keyup",function(event){

    if(event.keyCode == 13){

        const toDo = input.value;
        
        // If the input isn't empty
        if(toDo){
            addToDo(toDo, id, false, false);
            
            LIST.push({
                name : toDo,
                id : id,
                done : false,
                trash : false
            });
            
            // Add item to localstorage
            localStorage.setItem("TODO", JSON.stringify(LIST));
            
            id++;
        }
        input.value = "";
    }
});

// Add an item to the list clicking the "plus" button
addItem.addEventListener("click", function(){

    const toDo = input.value;

    if(toDo){
                addToDo(toDo, id, false, false);
                
                LIST.push({

                    name : toDo,
                    id : id,
                    done : false,
                    trash : false
                });
                
                // Add item to localstorage 
                localStorage.setItem("TODO", JSON.stringify(LIST));
                
                id++;
            }
            input.value = "";
});

// Complete to do
function completeToDo(element){

    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);
    
    LIST[element.id].done = LIST[element.id].done ? false : true;
}

// Remove to do
function removeToDo(element){

    element.parentNode.parentNode.removeChild(element.parentNode);
    
    LIST[element.id].trash = true;
}

list.addEventListener("click", function(event){

    const element = event.target; // Return the clicked element inside list
    const elementJob = element.attributes.job.value; // Complete or delete
    
    elementJob == "complete" ? completeToDo(element) : removeToDo(element);

    // Add item to localstorage

    localStorage.setItem("TODO", JSON.stringify(LIST));
});


















