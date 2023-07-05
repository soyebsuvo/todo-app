const container = document.querySelector(".container");
const todoForm = document.querySelector(".todo-form");
const inputTodo = document.querySelector("#inputTodo");
const addTodoButton = document.querySelector("#addTodoButton");
const lists = document.querySelector(".lists");
const message = document.querySelector("#message");


const showMessage = (text , style) => {
    message.innerHTML = text;
    message.classList.add(`bg-${style}`);
    setTimeout(()=> {
        message.innerHTML = "";
        message.classList.remove(`bg-${style}`);
    },1000);
};

const getTodoesFromLocalStorage = () => {
    return localStorage.getItem("my-todoes") ? JSON.parse(localStorage.getItem("my-todoes")) : [] ;
}


const createTodo = (todoId, todoValue) => {
    newElement = document.createElement("li");
    newElement.id = todoId;
    newElement.classList.add("li-style");
    newElement.innerHTML = `
    <span>${todoValue}</span> 
    <span><button class="btn" id="deleteButton"><i class="fa fa-trash"></i></button></span>
    `;
    lists.appendChild(newElement);
    showMessage("todo is created" , "success");
    inputTodo.value = "";

    const todoes = getTodoesFromLocalStorage();
    todoes.push({todoId , todoValue});
    localStorage.setItem("my-todoes" , JSON.stringify(todoes));

    const deleteButton = newElement.querySelector("#deleteButton");
    deleteButton.addEventListener("click" , deleteTodo);
};

const deleteTodo = (event) => {
    const selectedTodo = event.target.parentElement.parentElement.parentElement;
    lists.removeChild(selectedTodo);

    showMessage("todo is deleted" , "danger");


    let todoes = getTodoesFromLocalStorage();
    todoes = todoes.filter((todo) => todo.todoId != selectedTodo.id);
    localStorage.setItem("my-todoes" , JSON.stringify(todoes));
}


const addTodo = (event) => {
    event.preventDefault();
    todoValue = inputTodo.value;
    todoId = Date.now();
    

    // create a todo

    createTodo(todoId , todoValue);
};

const todoLoad = () => {
    const todoes = getTodoesFromLocalStorage();
    todoes.map((todo) => createTodo(todo.todoId , todo.todoValue));
};


todoForm.addEventListener("submit", addTodo);
window.addEventListener("DOMContentLoaded", todoLoad);