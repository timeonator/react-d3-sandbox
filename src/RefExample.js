import React, { Component } from 'react';

class RefExample extends Component {

    constructor() {
      super();
      this.inputRef = React.createRef();
    }
  
    onClick() {
      this.inputRef.current.focus();
    }
  
    render() {
      return (
        <div>
          <input ref={this.inputRef} />
          <button onClick={this.onClick.bind(this)}>Click to Focus</button>
        </div>
      );
    }
  }
  export default RefExample