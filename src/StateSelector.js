import React, { Component } from 'react';
import ComboSelect from 'react-combo-select';
require('../node_modules/react-combo-select/style.css');

function status(response) {
    if (response.status >= 200 && response.status < 300) {
    return Promise.resolve(response)
    } else {
    return Promise.reject(new Error(response.statusText))
    }
}

class StateSelector extends Component {
    constructor(props){
        super(props)
        this.state = {
            loading : true,
            data : []
        };
    }


    fetchData(){
        fetch('https://covidtracking.com/api/v1/states/info.json')
        .then(status)
        .then(resource => resource.json())
        .then((data) => {
          this.setState ({ 'data' : data })
          console.log('Request succeeded with JSON response', this.state);
        }).catch(function(error) {
          console.log('Request failed', error);
        });
    }

    componentDidMount() {
        console.log("StateSelect commponentDidMount()", this.state)
        this.fetchData();
        this.timer = setInterval(() => this.fetchData(), 5000);
    }

    onToggle(open, value, text) {
        console.log(open, value, text);
    }

    onChange (value, text) {
        console.log(value, text);
    }
    render(props) {
        let names = this.state.data.map(val => val.name)
        return (
            <ComboSelect data={names} onToggle = {this.onToggle} onChange = {this.onChange} type="select"/>
        )
    }
}
export default StateSelector