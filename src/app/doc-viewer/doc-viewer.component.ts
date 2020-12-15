import { Component, OnInit } from '@angular/core';

const color_tool = require('!raw-loader!../../img/svg/color-tool-icon.svg');
const font_change_tool = require('!raw-loader!../../img/svg/font-change-icon.svg');
const font_size_tool = require('!raw-loader!../../img/svg/font-size-icon.svg');

var selectionEl = [], selectionText = null, range = null;

function getSelectionText() {
  var text = ""; if (window.getSelection) {text = window.getSelection().toString();}
  return text;
}

function executeTool(tool: string) {
  if (selectionEl !== null && selectionText !== null && range !== null) {
    let htmlEl = changeSelectionText(); if (htmlEl !== null) {
      switch (tool) {
        case 'color-tool':
          let color_val = (document.getElementById('color-code') as HTMLInputElement).value;
          htmlEl.style.color = color_val;
          break;
    
        case 'font-change-tool':
          let font_val = (document.getElementById('font-change-value') as HTMLInputElement).value;
          htmlEl.style.fontFamily = font_val+", sans-serif";
          break;
    
        case 'font-size-tool':
          let font_size_val = (document.getElementById('font-size-value') as HTMLInputElement).value;
          htmlEl.style.fontSize = font_size_val+"px";
          break;
    
        default:
          break;
      }
      selectionEl['htmlEl'] = htmlEl;
    }
  }
}

function changeSelectionText() {
  if (selectionEl['htmlEl'].tagName === "SPAN") {
    return selectionEl['htmlEl'];
  } else {
    console.log('h');
    range.deleteContents();
    var wrapper = document.createElement("div");
    var frag = document.createDocumentFragment(), child;

    let span_item = document.createElement("span");
    span_item.innerHTML = selectionText;
    wrapper.appendChild(span_item);

    while (child = wrapper.firstChild) {frag.appendChild(child);}
    range.insertNode(frag);
    return selectionEl['htmlEl'] = span_item;
  }
}

@Component({
  selector: 'app-doc-viewer',
  templateUrl: './doc-viewer.component.html',
  styleUrls: ['./doc-viewer.component.scss']
})
export class DocViewerComponent implements OnInit {
  ngOnInit() {
    const color_tool_cont = document.getElementById('color-tool-container');
    const font_change_tool_cont = document.getElementById('font-change-tool-container');
    const font_size_tool_cont = document.getElementById('font-size-tool-container');

    console.log();

    color_tool_cont.innerHTML = color_tool;
    font_change_tool_cont.innerHTML = font_change_tool;
    font_size_tool_cont.innerHTML = font_size_tool;

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
                range = selectionEl['select'].getRangeAt(0);
              }
            }
            isDown = false;
          }
        });
      }
    }

    const colorCode = document.getElementById('color-code') as HTMLInputElement;
    const fontFamily = document.getElementById('font-change-value') as HTMLInputElement;
    const fontSize = document.getElementById('font-size-value') as HTMLInputElement;
  
    colorCode.addEventListener('keydown', function onEvent(e:KeyboardEvent) {
      if (e.keyCode === 13) {
        let colorIcon = document.getElementById('color-icon');
        colorIcon.style.backgroundColor = colorCode.value;
        executeTool('color-tool');
      }
    });
    fontFamily.addEventListener('keydown', function onEvent(e:KeyboardEvent) {if (e.keyCode === 13) {executeTool('font-change-tool');}});
    fontSize.addEventListener('keydown', function onEvent(e:KeyboardEvent) {if (e.keyCode === 13) {executeTool('font-size-tool');}});
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