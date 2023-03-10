import { app, BrowserWindow, BrowserWindowConstructorOptions, ipcMain, screen, shell, clipboard } from "electron";
import path from "path";
import fs from 'fs';
import { isDev } from "./config";
import { appConfig } from "./ElectronStore/Configuration";
import AppUpdater from "./AutoUpdate";
import readLastLines from 'read-last-lines';
import StringGenerator from "./StringGenerator";

async function setup(buildsDirectory: string) {
    // Check if build directory exists and create one if not
    if (!fs.existsSync(buildsDirectory)) {
        fs.mkdirSync(buildsDirectory)
    }
}

async function createWindow() {
    
    const buildsDirectory = path.join(app.getPath('userData'), 'poe-builds/')
    await setup(buildsDirectory);

    const { width, height } = screen.getPrimaryDisplay().workAreaSize;
    const appBounds: any = appConfig.get("setting.appBounds");
    const BrowserWindowOptions: BrowserWindowConstructorOptions = {
        width: 2000,
        minWidth: 900,
        height: 1300,
        minHeight: 600,

        webPreferences: {
            preload: __dirname + "/preload.js",
            devTools: isDev,
            webSecurity: false,
            webviewTag: true
        },
        show: false,
        alwaysOnTop: false,
        frame: false,
    };

    if (appBounds !== undefined && appBounds !== null) Object.assign(BrowserWindowOptions, appBounds);
    const mainWindow = new BrowserWindow(BrowserWindowOptions);

    // auto updated
    if (!isDev) AppUpdater();

    ipcMain.handle('versions', () => {
        return {
            node: process.versions.chrome,
            chrome: process.versions.chrome,
            electron: process.versions.electron,
            version: app.getVersion(),
            name: app.getName(),
        };
    });

    ipcMain.handle('systemClose', () => {
        app.quit();
    });

    ipcMain.handle('systemMinimize', () => {
        mainWindow.minimize();
    });

    ipcMain.handle('systemMaximizeToggle', () => {
        mainWindow.isMaximized() ? mainWindow.unmaximize() : mainWindow.maximize();
    });

    ipcMain.handle('getConfig', (event, key) => {
        return appConfig.get(key)
    });

    ipcMain.handle('setConfig', (event, key, value) => {
        appConfig.set(key, value)
    });

    ipcMain.handle('resetConfig', (event, key, value) => {
        fs.unlinkSync(appConfig.path)
        app.relaunch()
        app.exit()
    });

    ipcMain.handle('startWatchingPoeLogFile', (event, filePath: string) => {
        fs.watchFile(filePath, function(event, filename) {
            readLastLines.read(filePath, 1).then((line) => {
                mainWindow.webContents.send('poe-log-file-updated', line)
            })
        });
    });

    ipcMain.handle('openLink', (event, link: string) => {
        shell.openExternal(link)
    });

    ipcMain.handle('build-save', (event, build: string) => {
        const name = StringGenerator.generate(15) + '.json'
        fs.writeFileSync(path.join(buildsDirectory, name), build)
    })

    ipcMain.handle('build-list', () => {
        const buildsList: Array<any> = []
        const buildsFiles = fs.readdirSync(buildsDirectory);

        buildsFiles.forEach(file => {
            var data = fs.readFileSync(path.join(buildsDirectory, file), 'utf8');
            var buildContent = JSON.parse(data)
            buildContent.uid = file.replace('.json', '')
            buildsList.push(buildContent)
        })

        return buildsList
        
    })

    ipcMain.handle('build-remove', (event, uid: string) => {
        const file = uid + '.json'
        fs.unlinkSync(path.join(buildsDirectory, file))
    })
    
    ipcMain.handle('copy-to-clipboard', (event, clipboardText: string) => {
        clipboard.writeText(clipboardText)
    })

    // and load the index.html of the app.
    // win.loadFile("index.html");
    await mainWindow.loadURL(isDev ? "http://localhost:3000" : `file://${path.join(__dirname, "./index.html")}`);

    if (appBounds !== undefined && appBounds !== null && appBounds.width > width && appBounds.height > height) mainWindow.maximize();
    else mainWindow.show();

    // this will turn off always on top after opening the application
    setTimeout(() => {
        mainWindow.setAlwaysOnTop(false);
    }, 1000);

    // Open the DevTools.
    if (isDev) {
        mainWindow.webContents.openDevTools();
    }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(async () => {
    // if dev
    if (isDev) {
        try {
            const { installExt } = await import("./installDevTool");
            await installExt();
        } catch (e) {
            console.log("Can not install extension!");
        }
    }

    createWindow();
    app.on("activate", function () {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });

});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});
