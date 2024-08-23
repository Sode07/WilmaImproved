let colors = [
  "#eaea60", "#b4c6e7", "#ffc577", "#ffccff", "#d6dce4",
  "#c6e0b4", "#ff0000", "#0066ff", "#ffffff", "#DC143C"
];

let ClassElementNumber = 0;
let ClassModule;

function FindClass() {
  const ClassElement = document.getElementsByClassName("block")[ClassElementNumber];
  if (!ClassElement) return;

  const ClassInformation = ClassElement.getElementsByClassName("info")[0];
  const ClassName = ClassInformation.getElementsByClassName("no-underline-link")[0].innerHTML;
  ClassModule = parseInt(ClassName.slice(1, 3));

  if (!isNaN(ClassModule)) {
    ChangeColor();
  }
}

function ChangeColor() {
  const ClassElement = document.getElementsByClassName("block")[ClassElementNumber];
  ClassElement.style.backgroundColor = colors[ClassModule - 1] || '#ffffff';
  ClassElementNumber++;
  FindClass();
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === "updateColors") {
    colors = request.colors;
    ClassElementNumber = 0;
    FindClass();
  }
});

chrome.storage.sync.get(['colors'], function(result) {
  if (result.colors) {
    colors = result.colors;
  }
  setTimeout(FindClass, 1000);
});