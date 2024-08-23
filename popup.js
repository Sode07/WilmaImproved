let colors = [
    "#eaea60", "#b4c6e7", "#ffc577", "#ffccff", "#d6dce4",
    "#c6e0b4", "#ff0000", "#0066ff", "#ffffff", "#DC143C"
  ];
  
  function createColorOptions() {
    const colorOptions = document.getElementById('color-options');
    colorOptions.innerHTML = '';
    colors.forEach((color, index) => {
      const option = document.createElement('div');
      option.className = 'color-option';
      option.style.backgroundColor = color;
      option.setAttribute('data-index', index);
      option.onclick = function() { selectColor(index); };
      colorOptions.appendChild(option);
    });
  }
  
  function selectColor(index) {
    const newColor = document.getElementById('custom-color').value;
    colors[index] = newColor;
    updateColors();
  }
  
  function updateColors() {
    createColorOptions();
    chrome.storage.sync.set({colors: colors}, function() {
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {action: "updateColors", colors: colors});
      });
    });
  }
  
  document.addEventListener('DOMContentLoaded', function() {
    chrome.storage.sync.get(['colors'], function(result) {
      if (result.colors) {
        colors = result.colors;
      }
      createColorOptions();
    });
  });