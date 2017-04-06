const {
    app,
    BrowserWindow
} = require('electron')

if(process.env.HANGOUTS_PROXY){
    app.commandLine.appendSwitch('proxy-server', process.env.HANGOUTS_PROXY);
}

let mainWindow;

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        height: 600,
        width: 800,
        icon: __dirname + '/icon.png',
        title: 'Google Hangouts'
    });
    mainWindow.webContents.session.clearStorageData([], function() {});

    let organization, hangout;
    if (process.defaultApp) {
        organization = process.argv[1];
        hangout = process.argv[2];
    } else {
        organization = process.argv[2];
        hangout = process.argv[3];
    }
    if(!organization || !hangout){
         console.log("Usage: hangout <orgaization> <hangout>");
         process.exit(-1);
    }
    mainWindow.loadURL('https://hangouts.google.com/hangouts/_/' + organization + '/' + hangout);
    mainWindow.maximize();
    mainWindow.on('close', function() {
        mainWindow.webContents.session.clearStorageData([], function() {});
    });
});
