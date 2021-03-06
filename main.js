const { app, BrowserWindow, BrowserView, ipcMain } = require('electron');
const path = require('path');

require('update-electron-app')()

const MEOS = () => {
    const meosWin = new BrowserWindow({
        width: 800,
        height: 600,
        frame: false,
        webPreferences: {
            preload: path.join(__dirname, 'main/preload.js')
        },
        title: 'Politie Groningen - MEOS',
        icon: 'app-icon.ico'
    });
    meosWin.loadFile('main/index.html')

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
        width: 800,
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

    ipcMain.on('back', () => {
        view.webContents.goBack();
    })
    ipcMain.on('fwrd', () => {
        view.webContents.goForward();
    })

    ipcMain.on('pageChange', () => {
        var back = view.webContents.canGoBack()
        var fwrd = view.webContents.canGoForward()

        meosWin.send('update', back, fwrd)
    })

    meosWin.on('maximize', () => {
        meosWin.send('maximize')
    })
    meosWin.on('unmaximize', () => {
        meosWin.send('unmaximize')
        meosWin.center()
    })
    meosWin.on('close', () => {
        app.quit()
    })
};

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
    if(require('electron-squirrel-startup')) app.quit();
    MEOS();
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});


// Receive messages and open page in new window
ipcMain.on("asynchronous-message", (event, arg, arg2) => {
    if (arg == 'action') {
        if (arg2 == 'min') {
            BrowserWindow.getFocusedWindow().minimize()
        } else if (arg2 == 'max') {
            BrowserWindow.getFocusedWindow().maximize()
        } else if (arg2 == 'rest') {
            BrowserWindow.getFocusedWindow().restore()
        } else if (arg2 == 'close') {
            BrowserWindow.getFocusedWindow().close()
        }
    }
  
});

ipcMain.on("doc", (event, page, title) => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'pdf/renderer.js')
        },
        frame: false
    });
    win.loadURL(`file://${__dirname}/pdf/index.html?doc=${page}`)
    win.webContents.once('dom-ready', () => {
        win.title = `Politie Groningen - ${title}`
    })

    win.on('maximize', () => {
        win.send('maximize')
    })
    win.on('unmaximize', () => {
        win.send('unmaximize')
        win.center()
    })
})

ipcMain.on('debug', () => {
    console.log('Opening Debug')
    openDebug()
})
