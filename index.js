let input = document.querySelector("input");
let addButton = document.querySelector("button");
let ulList = document.querySelector("ul");
let liItems = document.getElementsByTagName("li");
let items = {};
let id = localStorage.length;

function addItemLocalStorage() {
  localStorage.setItem(id, JSON.stringify(items[id]));
}

function createItem(text) {
  let item = {
    newLiElement: text,
    checked: false,
  };
  items[id] = item;
  addItemLocalStorage();
  id++;
}

addButton.addEventListener("click", (event) => {
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

ulList.addEventListener("click", (event) => {
  const liIndex = [...ulList.children].indexOf(event.target);
  if (event.target.tagName === "LI") {
    event.target.classList.toggle("checked");
    items[liIndex].checked ? (items[liIndex].checked = false) : (items[liIndex].checked = true);
  } else if (event.target.tagName === "SPAN") {
    const spanIndex = [...ulList.children].indexOf(event.target.parentElement);
    const key = localStorage.key(spanIndex);
    localStorage.removeItem(localStorage.key(spanIndex));
    event.target.parentElement.remove();
  }
});

window.onload = () => {
  let keys = Object.keys(localStorage);
  for(let key of keys) {
    let item = JSON.parse(localStorage[key]).newLiElement;
    let li = document.createElement("li");
    let span = document.createElement("span");
    span.innerHTML = "\u00D7";
    span.className = "close";
    li.innerHTML = item;
    li.append(span);
    ulList.append(li);
  }
};
