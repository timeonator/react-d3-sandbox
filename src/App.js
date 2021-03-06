import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import D3Bar from './D3Bar'

class App extends Component {
    constructor(prop){
        super(prop);
        this.state = {
            what : "the rubber duck",
        }
    }
    
    render() {
        return (
            <div className='App'>
            <D3Bar  data = {[]} size={[1000,500]} />
            </div>
        )
    }
}
export default App