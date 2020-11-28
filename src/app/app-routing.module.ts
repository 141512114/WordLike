import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ControlPanelComponent } from './control-panel/control-panel.component';
import { DocViewerComponent } from './doc-viewer/doc-viewer.component';

const routes: Routes = [
  {
    path: '',
    component: ControlPanelComponent
  },
  {
    path: 'docViewer',
    component: DocViewerComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {useHash: true})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
