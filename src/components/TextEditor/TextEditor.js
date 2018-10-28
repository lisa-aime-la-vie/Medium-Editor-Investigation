import React, { PureComponent } from 'react'
import MediumEditor from 'medium-editor'
import ReactExtensions from '../../utils/ReactExtensions'
import InsertButton from './InsertButton/InsertButton'
import './TextEditor.css'

export default class TextEditor extends PureComponent<*, *>{

  componentDidMount() {
    var extensions = {};
      var buttons = [
        'h1', 'h2', 'h3', {
          name: 'fontsize',
          contentDefault: '<i class="fas fa-text-height"></i>'
        }, 'bold', 'italic', 'underline', 'indent', 'outdent', 'justifyLeft', 'justifyCenter', 'justifyRight', 
        'anchor', 'orderedlist', 'unorderedlist', 'quote'
      ];
      buttons.push('insertButton');
      extensions = {
        ...extensions,
        'insertButton': new ReactExtensions(InsertButton)
      }
    this.editor = new MediumEditor('.editor', {
      toolbar: {
        static: true,
        sticky: true,
        updateOnEmptySelection: true,
        buttons: buttons, 
      },
      extensions: extensions,
      anchor: {
        linkValidation: true
      },
      buttonLabels: 'fontawesome'
  });
  }

  render() {
    return (
      <div>
        <h1>Text Editor</h1>
        <div className='editor'>test</div>
      </div>
    )
  }
}