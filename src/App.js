import React, { Component } from 'react';
import TextEditor from './components/TextEditor/TextEditor';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <TextEditor />
        </header>
      </div>
    );
  }
}

export default App;
