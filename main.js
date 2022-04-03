const { app, BrowserWindow, BrowserView, ipcMain } = require('electron');
const PDFWindow = require('electron-pdf-window')
const path = require('path');

const createWindow = () => {
    const meosWin = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        },
        title: 'Politie Groningen - MEOS'
    });
    meosWin.loadFile('bookmarks.html')

    const view = new BrowserView({
        webPreferences: {
            preload: path.join(__dirname, 'meos-preload.js')
        },
    });
    meosWin.setBrowserView(view);
    view.webContents.loadURL('https://meos.grpfivem.nl');
    view.setBounds({
        x: 0,
        y: 30,
        width: 784,
        height: 570
    });
    view.setAutoResize({
        width: true,
        height: true
    });
    meosWin.setBounds({
        width: 1200,
        height: 750
    });
    meosWin.center();

    /*
    view.webContents.on('page-title-updated', (event, title, explicitSet) => {
        view.webContents.executeJavaScript(`list = document.getElementsByTagName("li"); for (let i = 0; i < list.length; i++) { if (list[i].includes('Wetboek') ) { alert(i) } }; wetboek.style.display = 'none';`)
    })
    */
    
};

const open = (page) => {
    const win = new PDFWindow({
        width: 800,
        height: 600
    });
    win.loadURL(`https://meos.grpfivem.nl/files/${page}.pdf`)

}

const openDebug = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'debug/preload.js')
        }
    });
    
    win.loadFile('debug/index.html');
}


app.whenReady().then(() => {
    createWindow();
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});


// Receive messages and open page in new window
ipcMain.on("asynchronous-message", (event, arg, doc) => {
    if (arg == 'doc') {
        open(doc);
    } else if (arg == 'debug') {
        openDebug();
        console.log('Opening Debug')
    }
  
});