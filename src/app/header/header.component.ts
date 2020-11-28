import { Component } from '@angular/core';
import { ElectronService } from 'ngx-electron';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(private _electronService: ElectronService) {}

  taskBarActions(action:string) {
    switch (action) {
        case 'closeApp':
            this._electronService.remote.app.exit(0);
            break;

        case 'minimize':
            this._electronService.remote.BrowserWindow.getFocusedWindow().minimize();
            break;

        case 'maximize':
            let currentWindow = this._electronService.remote.BrowserWindow.getFocusedWindow();

            if (currentWindow.isMaximizable()) {
              if (currentWindow.isMaximized()) {
                currentWindow.unmaximize();
              } else {
                  currentWindow.maximize();
              }
            }
            break;
    }
  }
}
