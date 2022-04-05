const { app, BrowserWindow, BrowserView, ipcMain } = require('electron');
const PDFWindow = require('electron-pdf-window')
const path = require('path');

const MEOS = () => {
    const meosWin = new BrowserWindow({
        width: 800,
        height: 600,
        frame: false,
        webPreferences: {
            preload: path.join(__dirname, 'main/preload.js')
        },
        title: 'Politie Groningen - MEOS'
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

const open = (page) => {
    const win = new PDFWindow({
        width: 800,
        height: 600,
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
    MEOS();
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});


// Receive messages and open page in new window
ipcMain.on("asynchronous-message", (event, arg, arg2) => {
    if (arg == 'doc') {
        open(arg2);
    } else if (arg == 'action') {
        if (arg2 == 'min') {
            BrowserWindow.getFocusedWindow().minimize()
        } else if (arg2 == 'max') {
            BrowserWindow.getFocusedWindow().maximize()
        } else if (arg2 == 'rest') {
            BrowserWindow.getFocusedWindow().restore()
        } else if (arg2 == 'close') {
            app.quit()
        }
    }
  
});

ipcMain.on('debug', () => {
    console.log('Opening Debug')
    openDebug()
})
