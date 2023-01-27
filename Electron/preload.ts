import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("browserWindow", {
    versions: () => ipcRenderer.invoke("versions"),
    systemClose: () => ipcRenderer.invoke('systemClose'),
    systemMinimize: () => ipcRenderer.invoke('systemMinimize'),
    systemMaximizeToggle: () => ipcRenderer.invoke('systemMaximizeToggle'),
});

contextBridge.exposeInMainWorld('appSettings', {
    getConfig: (key: string) => ipcRenderer.invoke('getConfig', key),
    setConfig: (key: string, value: string) => ipcRenderer.invoke('setConfig', key, value),
})

contextBridge.exposeInMainWorld('electronApi', {
    startWatchingPoeLogFile: (filePath: string) => ipcRenderer.invoke('startWatchingPoeLogFile', filePath),
    onPoeLogFileUpdate: (callback: any) => ipcRenderer.on('poe-log-file-updated', callback),
    openLink: (link: string) => ipcRenderer.invoke('openLink', link),
})