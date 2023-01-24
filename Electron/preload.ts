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