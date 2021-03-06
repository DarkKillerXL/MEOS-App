const { ipcRenderer } = require("electron");
window.addEventListener('DOMContentLoaded', () => {
    
    // Send message to main.js
    document.getElementById('wetboek').addEventListener('click', (event) =>{
        ipcRenderer.send('doc', 'wetboekstrafrecht', 'Wetboek')
    })
    document.getElementById('wagenpark').addEventListener('click', (event) =>{
        ipcRenderer.send('doc', 'wagenpark', 'Wagenpark')
    })
    document.getElementById('voertuig').addEventListener('click', (event) =>{
        ipcRenderer.send('doc', 'informatie-innamesysteem-overheid', 'Voertuig Inname')
    })
    document.getElementById('inname').addEventListener('click', (event) =>{
        ipcRenderer.send('doc', 'rijbewijsinname', 'Rijbewijs Inname')
    })
    document.getElementById('medisch').addEventListener('click', (event) =>{
        ipcRenderer.send('doc', 'medisch-stappenplan', 'Medisch Stappenplan')
    })
    document.getElementById('handboek').addEventListener('click', (event) =>{
        ipcRenderer.send('doc', 'politiehandboek', 'Handboek')
    })
    document.getElementById('dreiging').addEventListener('click', (event) =>{
        ipcRenderer.send('doc', 'dreigingsniveau', 'Dreigings Niveau')
    })

    document.getElementById('minimize').addEventListener('click', (event) =>{
        ipcRenderer.send('asynchronous-message', 'action', 'min')
    })

    document.getElementById('maximize').addEventListener('click', (event) =>{
        ipcRenderer.send('asynchronous-message', 'action', 'max')
    })

    document.getElementById('restore').addEventListener('click', (event) =>{
        ipcRenderer.send('asynchronous-message', 'action', 'rest')
        document.getElementById('maximize').style.display = 'block';
        document.getElementById('restore').style.display = 'none';
    })

    document.getElementById('close').addEventListener('click', (event) =>{
        ipcRenderer.send('asynchronous-message', 'action', 'close')
    })

    document.getElementById('back').addEventListener('click', (event) =>{
        ipcRenderer.send('back')
    })
    document.getElementById('fwrd').addEventListener('click', (event) =>{
        ipcRenderer.send('fwrd')
    })
  
})

ipcRenderer.on('update', (event, back, fwrd) => {
    if (back) {
        document.getElementById('back').classList.add('enabled')
    } else {
        document.getElementById('back').classList.remove('enabled')
    }
    
    if (fwrd) {
        document.getElementById('fwrd').classList.add('enabled')
    } else {
        document.getElementById('fwrd').classList.remove('enabled')
    }

})

document.addEventListener('keyup', keypress);
function keypress(e) {
    if(`${e.code}` == 'Delete') {
        ipcRenderer.send('debug')
    }
}


ipcRenderer.on('maximize', () => {
    document.getElementById('maximize').style.display = 'none';
    document.getElementById('restore').style.display = 'block';
})
ipcRenderer.on('unmaximize', () => {
    document.getElementById('maximize').style.display = 'block';
    document.getElementById('restore').style.display = 'none';
})