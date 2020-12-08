import { Component, OnInit } from '@angular/core';

function getSelectionText() {
  var text = ""; if (window.getSelection) {text = window.getSelection().toString();}
  return text;
}

@Component({
  selector: 'app-doc-viewer',
  templateUrl: './doc-viewer.component.html',
  styleUrls: ['./doc-viewer.component.scss']
})
export class DocViewerComponent implements OnInit {
  ngOnInit() {
    var isDown = false, docContainer = document.getElementById('document-container');
    if (docContainer != null) {
      var docContainerChildren = docContainer.children.length;
      for (var i = 0; i < docContainerChildren; i++) {
        docContainer.children[i].addEventListener('mousedown', function() {isDown = true;});
        docContainer.children[i].addEventListener('mouseup', function() {
          if (isDown) {
            var selection = getSelectionText(); if (selection !== "") {
              console.log(selection);
              var range; if (window.getSelection && window.getSelection().getRangeAt) {
                range = window.getSelection().getRangeAt(0);
                range.deleteContents();
                var wrapper = document.createElement("div");
                wrapper.innerHTML = "<b>"+selection+"</b>";
                var frag = document.createDocumentFragment(), child;
                while (child = wrapper.firstChild) {frag.appendChild(child);}
                range.insertNode(frag);
              }
            }
            isDown = false;
          }
        });
      }
    }
  }
}