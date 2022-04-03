window.addEventListener('DOMContentLoaded', () => {
    const {ipcRenderer} = require('electron')
    
    // Send message to main.js
    document.getElementById('wetboek').addEventListener('click', (event) =>{
        ipcRenderer.send('asynchronous-message', 'doc', 'wetboekstrafrecht')
    })
    document.getElementById('wagenpark').addEventListener('click', (event) =>{
        ipcRenderer.send('asynchronous-message', 'doc', 'wagenpark')
    })
    document.getElementById('inname').addEventListener('click', (event) =>{
        ipcRenderer.send('asynchronous-message', 'doc', 'rijbewijsinname')
    })
    document.getElementById('medisch').addEventListener('click', (event) =>{
        ipcRenderer.send('asynchronous-message', 'doc', 'medisch-stappenplan')
    })
    document.getElementById('handboek').addEventListener('click', (event) =>{
        ipcRenderer.send('asynchronous-message', 'doc', 'politiehandboek')
    })

    document.getElementById('debug').addEventListener('click', (event) =>{
        ipcRenderer.send('asynchronous-message', 'debug')
    })
  
  })
  