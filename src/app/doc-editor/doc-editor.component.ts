import { Component } from '@angular/core';

@Component({
  selector: 'app-doc-editor',
  templateUrl: './doc-editor.component.html',
  styleUrls: ['./doc-editor.component.scss']
})
export class DocEditorComponent {
  openToolWindow(e: any) {
    var allOpenEl = document.getElementsByClassName('open');
    if (allOpenEl.length > 0) {
      for (var i = 0; i < allOpenEl.length; i++) {
        if (allOpenEl[i].id !== e) {
          allOpenEl[i].classList.remove('open');
        }
      }
    }

    var element = document.getElementById(e);
    if (element.classList.contains('open')) {
      element.classList.remove('open');
    } else {
      element.classList.add('open');
    }
  }
}
