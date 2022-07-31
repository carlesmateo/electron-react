import { contextBridge, ipcRenderer } from "electron";

declare global {
  interface Window {
    Main: typeof api;
    isRenderer: typeof ipcRenderer;
  }
}

const api = {
  sendMsg: (msg: string) => ipcRenderer.send("send-msg", msg),
  getMsgs: () => ipcRenderer.invoke("get-msgs"),
  onMsg: (callback: any) => ipcRenderer.on("on-msg", callback),
};

contextBridge.exposeInMainWorld("Main", api);
