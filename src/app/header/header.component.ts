import { Component, OnInit } from '@angular/core';
import { ElectronService } from 'ngx-electron';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor(private _electronService: ElectronService) {}

  ngOnInit(): void {
    let currentWindow = this._electronService.remote.getCurrentWindow();
    if (!currentWindow.isMaximizable()) {
      let maximizeBtn = document.getElementById('maximize-app');
      maximizeBtn.classList.add('deactivated');
      maximizeBtn.title = "Not maximizable";
    }
  }

  taskBarActions(action:string) {
    let focusedWindow = this._electronService.remote.BrowserWindow.getFocusedWindow();

    switch (action) {
        case 'closeWindow':
          focusedWindow.close();
          break;

        case 'minimize':
          focusedWindow.minimize();
          break;

        case 'maximize':
          if (focusedWindow.isMaximizable()) {
            if (focusedWindow.isMaximized()) {
              focusedWindow.unmaximize();
            } else {
              focusedWindow.maximize();
            }
          }
          break;
    }
  }
}
