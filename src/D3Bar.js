import React, { Component } from 'react';
import StateSelector from './StateSelector'
import * as d3 from "d3";
import { scaleLinear,scaleTime } from 'd3-scale'
import {axisBottom} from 'd3-axis'
import { max,min } from 'd3-array'
import { select } from 'd3-selection'

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
      this.state = {
          'data':[],
          'currentState': {state : 'or', name : 'Oregon' }
     };
      this.handleStateChange = this.handleStateChange.bind(this);

    }
    handleStateChange(value){
        this.setState(value);
    } 
    
    stateURL(state) {
        let s = "https://covidtracking.com/api/v1/states/".concat(state).concat("/daily.json");
        console.log(s) 
        return(s); 
    }
    // fetch the state daily json data
    fetchData(){
        this.url = this.stateURL(this.state.currentState.state);
        fetch(this.url)
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

     componentDidUpdate() {
        console.log("componentDidUpdate()")
        this.createBarChart()
     }

     createBarChart() {

        // don't render until the data arrives
        if(this.state.data.length === 0) { return(null);}

        let localData = (this.state.data.map(day=>day.positiveIncrease).reverse());
        let timeLine = (this.state.data.map(day=>new Date(day.date))).reverse();
        

        console.log("timeLine:", timeLine);

        const node = this.node
 
        const dataMax = max(localData)
        // const timeMin = min(timeLine)
        // const timeMax = max(timeLine)

        const xScale = scaleTime()
            .domain([timeLine[0]], timeLine[timeLine.length-1])
            .range([0,this.props.size[0]]);

        const yScale = scaleLinear()
           .domain([0, dataMax])
           .range([0, this.props.size[1]]);



    const x_axis = axisBottom().scale(xScale)
        .tickValues('2/29', '3/28','4/28','5/28','6/15', "7/15","8/15","9/15","10/15","11/15","12/15","1/15","2/15","3/15")
        .tickSize(40)
        .ticks(120)
    
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
        .attr('x', (d,i) => i*4)
        .attr('y', d => this.props.size[1] - yScale(d))
        .attr('height', d => yScale(d))
        .attr('width', 1.5)

        //Append group and insert axis
        select(node)
            .append("g")
            .attr("transform", "translate(0," + this.props.size[1] + ")")
            .call(x_axis);
     }  



    onClick() {
      this.inputRef.current.focus();
    }
  
    render() {
        // don't render until the data arrives
        if (this.state.data.length === 0) return(null)

        return (
            <div className="D3-bar-chart">
                <h4>{this.state.currentState.name}</h4>
                <svg ref = {n => {this.node = n}}
                    width={500} height={500}>
                </svg>
                <StateSelector  handleStateChange = {this.handleStateChange}/>
            </div>
        );
    }
  }
  export default D3Bar