import { Component, OnInit } from '@angular/core';

var selectionEl = [], selectionText = null, range = null;

function getSelectionText() {
  var text = ""; if (window.getSelection) {text = window.getSelection().toString();}
  return text;
}

function executeTool(tool: string) {
  if (selectionEl !== null && selectionText !== null && range !== null) {
    switch (tool) {
      case 'color-tool':
        let color_val = (document.getElementById('color-code') as HTMLInputElement).value;
        changeSelectionText(color_val);
        break;
  
      case 'font-change-tool':
        break;
  
      case 'font-size-tool':
        break;
  
      default:
        break;
    }
  }
}

function changeSelectionText(value:any) {
  if (selectionEl['htmlEl'].tagName === "SPAN" && selectionEl['htmlText'] === selectionText) {
    let span_item = selectionEl['htmlEl'];
    span_item.style.color = value;
  } else {
    range.deleteContents();
    var wrapper = document.createElement("div");
    var frag = document.createDocumentFragment(), child;

    let span_item = document.createElement("span");
    span_item.innerHTML = selectionText;
    span_item.style.color = value;
    wrapper.appendChild(span_item);

    while (child = wrapper.firstChild) {frag.appendChild(child);}
    range.insertNode(frag);
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
            selectionText = getSelectionText(); if (selectionText !== "") {
              if (window.getSelection && window.getSelection().getRangeAt) {
                selectionEl['select'] = window.getSelection();
                selectionEl['htmlEl'] = selectionEl['select'].baseNode.parentNode;
                selectionEl['htmlText'] = selectionEl['htmlEl'].innerHTML;
                console.log(selectionEl['select']);
                range = selectionEl['select'].getRangeAt(0);
              }
            }
            isDown = false;
          }
        });
      }
    }

    const colorIcon = document.getElementById('color-icon');
    const colorCode = document.getElementById('color-code') as HTMLInputElement;
    colorCode.addEventListener('keydown', function onEvent(e:KeyboardEvent) {
      if (e.keyCode === 13) {
        colorIcon.style.backgroundColor = colorCode.value;
        executeTool('color-tool');
      }
    });
  }

  openToolWindow(tool: string) {
    const allOpenEl = document.getElementsByClassName('open');
    if (allOpenEl.length > 0) {
      for (var i = 0; i < allOpenEl.length; i++) {
        if (allOpenEl[i].id !== tool) {
          allOpenEl[i].classList.remove('open');
        }
      }
    }

    const element = document.getElementById(tool);
    if (element.classList.contains('open')) {
      element.classList.remove('open');
    } else {
      element.classList.add('open');
      executeTool(tool);
    }
  }
}