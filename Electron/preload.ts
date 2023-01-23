import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("browserWindow", {
    versions: () => ipcRenderer.invoke("versions"),
    systemClose: () => ipcRenderer.invoke('systemClose'),
    systemMinimize: () => ipcRenderer.invoke('systemMinimize'),
    systemMaximizeToggle: () => ipcRenderer.invoke('systemMaximizeToggle'),
});
