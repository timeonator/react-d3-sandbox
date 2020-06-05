import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import D3Bar from './D3Bar'

class App extends Component {
   render() {
   return (
      <div className='App'>

      <div>
      <
          D3Bar data={[10,9,8,7,6,5,4,3]} size={[500,500]} />
      </div>
      </div>
   )
   }
}
export default App