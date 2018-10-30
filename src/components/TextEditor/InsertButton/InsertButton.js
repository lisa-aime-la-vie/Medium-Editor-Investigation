import React from 'react'
import classNames from 'classnames'
import extend from 'lodash/extend'
import MediumEditor from 'medium-editor'

class InsertButton extends React.Component<*, *> {
  constructor() {
    super()
    this.state = {
      isShow: false
    }
  }
  handleToggle = () => {
    this.setState(prev => ({
      isShow: !prev.isShow
    }))
  }

  handleItemSelected = e => {
    e.preventDefault();
    e.stopPropagation();
    this.insertText(['{', e.target.getAttribute('value'), '}'].join(''));
    this.handleToggle();
  }

  insertText = text => {
    const range = this.getSelectionRange()
    let newNode
    let dynamicNode
    if (range) {
      if (range.startContainer.nodeName === 'DIV' && range.startContainer.className === 'editor') {
        dynamicNode = this.createDynamicContentNode(text)
        newNode = document.createElement('p').append(dynamicNode)
      } else {
        newNode = this.createDynamicContentNode(text)
        dynamicNode = newNode
      }

      const dynamicContent = this.getDynamicContent(range.startContainer)
      if (range.collapsed && this.isDynamicContent(dynamicContent) &&
        (range.startOffset === 0 || range.startOffset === range.startContainer.length)) {
        if (range.startOffset === 0) {
          dynamicContent.parentNode.insertBefore(newNode, dynamicContent)
        } else {
          dynamicContent.parentNode.insertBefore(newNode, dynamicContent.nextSibling)
        }
      } else {
        this.deleteRangeContent(range);
        range.insertNode(newNode);
      }
      MediumEditor.selection.moveCursor(document, dynamicNode.lastChild, dynamicNode.lastChild.textContent.length,
        dynamicNode.lastChild, dynamicNode.lastChild.textContent.length);
    }
  }

  deleteRangeContent = range => {
    [range.startContainer, range.endContainer].forEach( element => {
      const dynamicContent = this.getDynamicContent(element)
      if (this.isDynamicContent(dynamicContent)) {
        dynamicContent.parentNode.removeChild(dynamicContent)
      }
    }, this);
    range.deleteContents();
  }

  isDynamicContent = content => {
    return content === null ? false : true;
  }

  getDynamicContent = rangeContainer => {
    let ele = extend({}, rangeContainer.parentNode)
    while(ele && ele.className.indexOf('dynamic-content') < 0) {
      if (ele && ele.className.indexOf('editor') < 0) {
        ele = ele.parentNode
      } else {
        ele = null
      }
    }
    return ele
  }

  createDynamicContentNode = text => {
    const span = document.createElement('span')
    span.className = 'dynamic-content'
    span.append(text)
    return span
}

  getSelectionRange = () => {
    const selection = window.getSelection()
    if (selection && selection.rangeCount) {
      return selection.getRangeAt(0)
    }
    return null
  }

  render() {
    const dynamicContent = [
      {
        disable: false,
        labelKey: "Agency name",
        value: "agency_name"
      },
      {
        disable: false,
        labelKey: "Event name",
        value: "event_name"
      }
    ];
    const { isShow } = this.state
    return (
      <div className="dropdown">
        <button className="dropdown-toggle" id="dropdownMenuButton" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" onClick={this.handleToggle}>
          Insert object
        </button>
        <div className={classNames("dropdown-menu", "dynamic-content", { "show" : isShow })} aria-labelledby="dropdownMenuButton">
        {
          dynamicContent.map(ele => {
            return (
              <a className="dropdown-item" tabIndex="-1" href="#" onClick={this.handleItemSelected} value={ele.value}>{ele.labelKey}</a>
            )
          })
        }
        </div>
      </div>
    )
  }
}

export default InsertButton