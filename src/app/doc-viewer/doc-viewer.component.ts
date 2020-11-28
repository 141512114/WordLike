import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-doc-viewer',
  templateUrl: './doc-viewer.component.html',
  styleUrls: ['./doc-viewer.component.scss']
})
export class DocViewerComponent implements OnInit {
  ngOnInit(): void {
    let sideBar = document.getElementById('sidebar');
    let openSideBarBtn = document.getElementById('sidebar-opener');
    let openerSVG = document.getElementById('opener-svg');
    openSideBarBtn.addEventListener('click', function() {
        if (sideBar.classList.contains('sidebar-open')) {
            sideBar.classList.remove('sidebar-open');
            openerSVG.classList.remove('rotate');
            openSideBarBtn.getElementsByTagName('button')[0].title = 'Open editor';
        } else {
            sideBar.classList.add('sidebar-open');
            openerSVG.classList.add('rotate');
            openSideBarBtn.getElementsByTagName('button')[0].title = 'Close editor';
        }
    });
  }
}