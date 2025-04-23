const { app, BrowserWindow } = require('electron');
const path = require('path');

let mainWindow;

// Create the main application window
app.on('ready', () => {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true, // Enable Node.js in renderer
            contextIsolation: false, // Disable context isolation
        },
    });

    // Load the main HTML file
    mainWindow.loadFile(path.join(__dirname, '../../index.html'));
    mainWindow.on('closed', () => (mainWindow = null));
});

// Quit the app when all windows are closed (except on macOS)
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});

// Recreate the window when the app is reactivated (macOS)
app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});