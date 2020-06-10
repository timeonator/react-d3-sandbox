import React, { Component } from 'react';
import { scaleLinear } from 'd3-scale'
import { max } from 'd3-array'
import { select } from 'd3-selection'
var url = "https://covidtracking.com/api/v1/states/tx/daily.json";



    function status(response) {
        if (response.status >= 200 && response.status < 300) {
        return Promise.resolve(response)
        } else {
        return Promise.reject(new Error(response.statusText))
        }
    }
    
    function json(response) {
        return response.json()
    }

        

class D3Bar extends Component {

    constructor(props) {
      super(props)

      this.inputRef = React.createRef()
      this.node = React.createRef()
      this.createBarChart = this.createBarChart.bind(this)
      this.state = {'data':[] };
    }

    // fetch the state daily json data
    fetchData(){
        fetch(url)
        .then(status)
        .then(json)
        .then((data) => {
          this.setState ({ 'data' : data })
          this.createBarChart()
          console.log('Request succeeded with JSON response', this.state);
        }).catch(function(error) {
          console.log('Request failed', error);
        });
    }

    deaths()  {
        // let d = this.state.data;
        //let r = d.map(v => v.deaths ); 
        //console.log("death data", this.state); 
    }

    componentDidMount() {
        console.log("commponentDidMount()")
        this.fetchData();
        this.timer = setInterval(() => this.fetchData(), 5000);
        this.createBarChart();  
    }

    componentWillUnmount() {
        console.log("componentWillMount()")
    }

     componentDidUpdate() {
        console.log("componentDidUpdate()")
        this.createBarChart()
     }

     createBarChart() {
        console.log("The Data Looks Like", this.state)
        // don't render until the data arrives
        if(this.state.data.length === 0) { return(null);}

        let localData = (this.state.data.map(day=>day.deathIncrease));
        console.log("Local Data", localData)
        const node = this.node
 
        const dataMax = max(localData)

        const yScale = scaleLinear()
           .domain([0, dataMax])
           .range([0, this.props.size[1]]);

     select(node)
        .selectAll('rect')
        .data(localData)
        .enter()
        .append('rect')
     
     select(node)
        .selectAll('rect')
        .data(localData)
        .exit()
        .remove()
     
     select(node)
        .selectAll('rect')
        .data(localData)
        .style('fill', '#fe9922')
        .attr('x', (d,i) => i * 4)
        .attr('y', d => this.props.size[1] - yScale(d))
        .attr('height', d => yScale(d))
        .attr('width', 2)
     }  
    onClick() {
      this.inputRef.current.focus();
    }
  
    render() {
        // don't render until the data arrives
        if (this.state.data.length === 0) return(null)

        return (
            <svg ref = {n => {this.node = n}}
                width={500} height={500}>
            </svg>
        );
    }
  }
  export default D3Bar