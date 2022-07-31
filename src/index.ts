import {
  app,
  BrowserWindow,
  ipcMain,
  IpcMainEvent,
  Menu,
  Tray,
} from "electron";
import path from "path";
import config from "../assets/config.json";

declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

if (require("electron-squirrel-startup")) {
  app.quit();
}

let mainWindow: BrowserWindow = null;
let msgs: string[] = [];

const createWindow = (): void => {
  if (mainWindow) {
    mainWindow.close();
  }
  mainWindow = new BrowserWindow({
    height: 600,
    width: 800,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
  });

  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  mainWindow.webContents.openDevTools();
};

app.on("ready", createWindow);

app.whenReady().then(() => {
  const iconpath = path.resolve(__dirname, "main_window", config.icon);
  const tray = new Tray(iconpath);
  const menu = Menu.buildFromTemplate([
    {
      label: "Open",
      click: createWindow,
    },
    {
      label: "Quit",
      role: "quit",
    },
  ]);
  tray.setContextMenu(menu);
});

app.on("window-all-closed", () => {
  mainWindow = null;
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

ipcMain.handle("get-msgs", () => {
  return msgs;
});

ipcMain.on("send-msg", (event: IpcMainEvent, msg: string) => {
  msgs.push(msg);
  mainWindow.webContents.send("on-msg", msg);
});
