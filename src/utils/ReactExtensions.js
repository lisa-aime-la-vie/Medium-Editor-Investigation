import React from 'react'
import ReactDOM from 'react-dom'
import MediumEditor from 'medium-editor'

var Extension = MediumEditor.extensions.button.extend({
  constructor: function(Button) {
    this.Button= Button;
  },

  init: function () {
    MediumEditor.Extension.prototype.init.apply(this, arguments)

    this.button = this.createButton()
  },
  createButton: function () {
    var button = document.createElement('div')

    ReactDOM.render(
      React.createElement(this.Button, {editor: this.base}),
      button
    )

    return button
  }
})

export default Extension