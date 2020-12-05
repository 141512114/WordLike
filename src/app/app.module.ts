import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { NgxElectronModule } from 'ngx-electron';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ControlPanelComponent } from './control-panel/control-panel.component';
import { HeaderComponent } from './header/header.component';
import { DocViewerComponent } from './doc-viewer/doc-viewer.component';
import { DocContainerComponent } from './doc-container/doc-container.component';
import { ToolBarComponent } from './tool-bar/tool-bar.component';
import { DocEditorComponent } from './doc-editor/doc-editor.component';

@NgModule({
  declarations: [
    AppComponent,
    ControlPanelComponent,
    HeaderComponent,
    DocViewerComponent,
    DocContainerComponent,
    ToolBarComponent,
    DocEditorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxElectronModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
