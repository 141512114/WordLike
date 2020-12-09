import { Component, OnInit } from '@angular/core';

var selectionPart = null;

function getSelectionText() {
  var text = ""; if (window.getSelection) {text = window.getSelection().toString();}
  return text;
}

function executeTool(tool: string, editPart: any) {
  switch (tool) {
    case 'color-tool':
      editPart.style.color = '#000000';

      break;

    case 'font-change-tool':
      break;

    case 'font-size-tool':
      break;

    default:
      break;
  }
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
              var range; if (window.getSelection && window.getSelection().getRangeAt) {
                range = window.getSelection().getRangeAt(0);
                range.deleteContents();
                var wrapper = document.createElement("div");
                wrapper.innerHTML = "<span>"+selection+"</span>";
                var frag = document.createDocumentFragment(), child;
                while (child = wrapper.firstChild) {frag.appendChild(child);}
                range.insertNode(frag);
                selectionPart = window.getSelection().focusNode;
              }
            }
            isDown = false;
          }
        });
      }
    }
  }

  openToolWindow(tool: string) {
    var allOpenEl = document.getElementsByClassName('open');
    if (allOpenEl.length > 0) {
      for (var i = 0; i < allOpenEl.length; i++) {
        if (allOpenEl[i].id !== tool) {
          allOpenEl[i].classList.remove('open');
        }
      }
    }

    var element = document.getElementById(tool);
    if (element.classList.contains('open')) {
      element.classList.remove('open');
    } else {
      element.classList.add('open');
      executeTool(tool, selectionPart);
    }
  }
}