// add style.css to index.html
const newStyle = document.createElement("link");
newStyle.setAttribute("rel", "stylesheet");
newStyle.setAttribute(
  "href",
  "https://2k21.s3.ap-south-1.amazonaws.com/testingJavascript/index.css"
);
document.head.appendChild(newStyle);

// api

// add button with class fab to index.html
const newButton = document.createElement("button");
newButton.classList.add("fab");
newButton.innerHTML = "+";
document.body.appendChild(newButton);

// add div with class fab-modal to index.html then inside it add button with id close
const newDiv = document.createElement("div");
newDiv.classList.add("fab-modal");
newDiv.innerHTML = `<button id="close">Close</button>`;
document.body.appendChild(newDiv);

document.querySelector(".fab").addEventListener("click", function (e) {
  document.querySelector(".fab-modal").classList.add("open");
  document.querySelector(".fab").classList.add("close");
});

document.querySelector("#close").addEventListener("click", function (e) {
  document.querySelector(".fab-modal").classList.remove("open");
  document.querySelector(".fab").classList.remove("close");
});
