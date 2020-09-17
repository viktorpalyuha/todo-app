let input = document.querySelector("input");
let addButton = document.querySelector("button");
let ulList = document.querySelector("ul");
let items = {};
let id = localStorage.length;

function addItemLocalStorage() {
    localStorage.setItem(id, JSON.stringify(items[id]));
};

function createItem(text) {
  let item = {
    newLiElement: text,
    checked: false,
  };
  items[id] = item;
  addItemLocalStorage();
  id++;
};

addButton.addEventListener("click", event => {
  event.preventDefault();

  let text = input.value;

  //check if input is empty
  if (text.trim() === "") {
    alert("Please, type something");
    return;
  }

  //show new li element on page on button press
  let newLiElement = document.createElement("li");
  let newSpan = document.createElement("span");
  newSpan.innerHTML = "\u00D7";
  newSpan.className = "close";
  newLiElement.innerHTML = text;
  newLiElement.append(newSpan);
  ulList.append(newLiElement);

  input.value = "";

  //create item object and add it to items
  createItem(text);
});

ulList.addEventListener("click", event => {
  if (event.target.tagName === "LI") {
    event.target.classList.toggle("checked");
  } else if (event.target.tagName === "SPAN") {
    event.target.parentElement.remove();
  }
});

function renderLocalStorage() {
    let li = document.createElement("li");

}
window.onload = () => {
    for(let i = 0; i < localStorage.length; i++) {
        let item = JSON.parse(localStorage[i]).newLiElement;
        let li = document.createElement("li");
        li.innerHTML = item;
        ulList.append(li);
    };
};