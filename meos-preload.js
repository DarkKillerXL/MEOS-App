const { ipcRenderer } = require("electron");

window.addEventListener('DOMContentLoaded', () => {
    var styles = `
        #dreigingLink {
            color: #007bff;
            cursor: pointer;
        }
        #dreigingLink:hover {
            color: #0056b3;
            text-decoration: underline;
        }
    `

    var styleSheet = document.createElement("style")
    styleSheet.innerText = styles
    document.head.appendChild(styleSheet)


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
        console.log(links[i].href)
        if (links[i].href.includes("dreigingsniveau")) {
            links[i].removeAttribute("href");
            links[i].id = 'dreigingLink';
            links[i].addEventListener('click', (event) =>{
                ipcRenderer.send('doc', 'dreigingsniveau', 'Dreigings Niveau')
            })

        }
        
    }

    spanItems = document.getElementsByTagName('span')
    for (let i = 0; i < spanItems.length; i++) {
        if (spanItems[i].innerHTML == '<u>Dashboard</u>') {
            spanItems[i].innerHTML = 'Dasboard'
        }
    }
    
    ipcRenderer.send('pageChange')
    
  
})
  