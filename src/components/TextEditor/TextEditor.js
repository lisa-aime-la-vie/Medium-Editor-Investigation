import React, { PureComponent } from 'react'
import MediumEditor from 'medium-editor'
import './TextEditor.css'

export default class TextEditor extends PureComponent<*, *>{

  componentDidMount() {
    this.editor = new MediumEditor('.editor', {
      toolbar: {
        static: true,
        sticky: true,
        updateOnEmptySelection: true,
        buttons: ['bold', 'italic', 'underline', 'anchor', 'h2', 'h3', 'quote'], 
      },
      // extensions: extensions,
      anchor: {
        linkValidation: true
      }
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