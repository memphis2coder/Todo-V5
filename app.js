// select elements from the DOM
const clear = document.querySelector('.clear');
const dateElement = document.getElementById('date');
const list = document.getElementById('list');
const input = document.getElementById('input');

// variables
let LIST = [],
    id = 0;

// classes names
const CHECK = 'fa-check-circle';
const UNCHECK = 'fa-circle-thin';
const LINE_THROUGH = 'lineThrough';

// show todays date 
const today = new Date();
const options = {
    weekday: 'long',
    month: "short",
    day: "numeric"
}
dateElement.innerHTML = today.toLocaleDateString('en-US', options)

// add todo function
function addTodo(todo, id, done, trash) {

    if (trash) {
        return;
    }

    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : "";

    const item =
        `   <li class='item'>
            <i class="fa ${DONE} complete" job='complete' id="${id}"></i>
            <p class="text ${LINE}">${todo}</p>
            <i class="fa fa-trash-o delete" job="delete" id="${id}"></i>
            </li>    
        `
    const position = "beforeend";

    list.insertAdjacentHTML(position, item);
}

// add a item when user press enter key
document.addEventListener('keyup', function (event) {
    if (event.keyCode === 13) {
        const todo = input.value;

        // if the input isn't empty
        if (todo) {
            addTodo(todo, id, false, false)

            LIST.push({
                name: todo,
                id: id,
                done: false,
                trash: false
            });
            id++;
        }
        input.value = "";
    }
})


// complete todo function
function completeTodo(element) {
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector('.text').classList.toggle(LINE_THROUGH);

    LIST[element.id].done = LIST[element.id].done ? false : true;
}

// remove todo function
function removeTodo(element) {
    element.parentNode.parentNode.removeChild(element.parentNode);

    LIST[element.id].trash = true;
}

// target the items created dynamically
list.addEventListener("click", function (event) {
    const element = event.target; // return the clicked element inside list
    const elementJob = element.attributes.job.value; // complete or delete

    if (elementJob == 'complete') {
        completeTodo(element);
    } else if (elementJob == 'delete') {
        removeTodo(element);
    }
})

// reload the page when clicked
clear.addEventListener('click', function () {
    location.reload();
})