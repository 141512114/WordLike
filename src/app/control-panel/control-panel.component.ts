import { Component, ViewEncapsulation } from '@angular/core';
import { ElectronService } from 'ngx-electron';

@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ControlPanelComponent {
  constructor(private _electronService: ElectronService) {}

  openDocViewer() {
    let win = new this._electronService.remote.BrowserWindow({
      title: "Starting...",
      width: 1100,
      height: 720,
      center: true,
      show: false,
      backgroundColor: '#272a57',
      webPreferences: {
          nodeIntegration: true,
          backgroundThrottling: false,
          enableRemoteModule: true
      },
      frame: false
    });
    win.webContents.openDevTools();
    win.loadURL('file://'+__dirname+'/index.html#/docViewer');
    win.once('ready-to-show', () => {
      win.show();
      win.maximize();
      this._electronService.remote.getCurrentWindow().close();
    });
    win.on('closed', () => {win = null;});
  }
}