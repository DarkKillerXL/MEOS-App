const { ipcRenderer } = require("electron");

window.addEventListener('DOMContentLoaded', () => {

    list = document.getElementsByTagName("li");
    for (let i = 0; i < list.length; i++) {
        if (list[i].innerHTML.includes('Wetboek')) {
            list[i].style.display = 'none' // Hide 'Wetboek' button
            break;
        }
    };

    links = document.getElementsByTagName('a');
    for (let i = 0; i < links.length; i++) {
        if (links[i].innerHTML == 'hier') links[i].target = '_blank'; 
    }

    spanItems = document.getElementsByTagName('span')
    for (let i = 0; i < spanItems.length; i++) {
        if (spanItems[i].innerHTML == '<u>Dashboard</u>') {
            spanItems[i].innerHTML = 'Dasboard'
        }
    }
    
    ipcRenderer.send('pageChange')
    
  
})
  