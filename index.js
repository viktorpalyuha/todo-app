let input = document.querySelector("input");
let addButton = document.querySelector("button");
let ulList = document.querySelector("ul");

addButton.addEventListener("click", (event) => {
    event.preventDefault();
    let text = input.value;

    if(text.trim() === "") { 
        alert("Please, type something")
        return;
    }

    let newLiElement = document.createElement("li");
    let newSpan = document.createElement("span");
    newSpan.innerHTML = "\u00D7";
    newSpan.className = "close";

    newLiElement.innerHTML = text;
    newLiElement.append(newSpan);
    ulList.append(newLiElement);
    input.value = "";
});

ulList.addEventListener("click", event => {
    if(event.target.tagName === "LI") {
        event.target.classList.toggle("checked");
    } else if(event.target.tagName === "SPAN") {
        event.target.parentElement.remove();
    }
})