const electron = require('electron');
const ffmpeg = require('fluent-ffmpeg')

const { app, BrowserWindow, ipcMain } = electron;
let mainWindow;
app.on('ready', () => {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        darkTheme: true,
        webPreferences: { backgroundThrottling: false }
    });
    mainWindow.loadURL(`file://${__dirname}/src/index.html`);
});

ipcMain.on('videos:added', (event, videos) => {
    // console.log(event);
    // console.log(videos);
    const promise = new Promise((resolve, reject) => {
        ffmpeg.ffprobe(videos[0].path, (err, metadata) => {
            // console.log(metadata);
            // console.log(err);
            resolve(metadata);
        });
    });
    promise.then((metadata)=>{console.log(metadata)})
});