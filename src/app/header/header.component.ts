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
    let currentWindow = this._electronService.remote.BrowserWindow.getFocusedWindow();

    switch (action) {
        case 'closeWindow':
            currentWindow.close();
            break;

        case 'minimize':
          currentWindow.minimize();
            break;

        case 'maximize':
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
