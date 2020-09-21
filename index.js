let input = document.querySelector("input");
let addButton = document.querySelector("button");
let ulList = document.querySelector("ul");
let liItems = document.getElementsByTagName("li");
let items = {};
let id = localStorage.length;
let keys = Object.keys(localStorage).sort();

function addItemLocalStorage(index) {
  localStorage.setItem(index, JSON.stringify(items[index]));
}

function createItem(text) {
  let item = {
    newLiElement: text,
    checked: false,
  };
  items[id] = item;
  addItemLocalStorage(id);
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

  keys.push(id);
  //create item object and add it to items
  createItem(text);
});

ulList.addEventListener("click", (event) => {
  const liIndex = [...ulList.children].indexOf(event.target);
  if (event.target.tagName === "LI") {
    event.target.classList.toggle("checked");
    items[keys[liIndex]].checked
      ? (items[keys[liIndex]].checked = false)
      : (items[keys[liIndex]].checked = true);
    
    addItemLocalStorage(keys[liIndex]);
  } else if (event.target.tagName === "SPAN") {
    const spanIndex = [...ulList.children].indexOf(event.target.parentElement);
    const key = keys[spanIndex];
    localStorage.removeItem(key);
    keys = keys.filter(item => item !== key);
    event.target.parentElement.remove(); 
  }
});

window.onload = () => {
  for (let key of keys) {
    items[key] = JSON.parse(localStorage[key]); //add item from storage to object
  }

  localStorage.clear();

  for (let key in items) {
    let item = items[key].newLiElement;
    let checked = items[key].checked;

    let li = document.createElement("li");
    let span = document.createElement("span");
    span.innerHTML = "\u00D7";
    span.className = "close";
    li.innerHTML = item;
    li.append(span);
    if (checked) li.classList = "checked";
    ulList.append(li);
  }

  for (let key of keys) {
    addItemLocalStorage(key, items[key]);
  }
};
