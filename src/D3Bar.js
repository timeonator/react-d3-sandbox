import React, { Component } from 'react';
import { scaleLinear } from 'd3-scale'
import { max } from 'd3-array'
import { select } from 'd3-selection'

class D3Bar extends Component {

    constructor() {
      super();
      this.inputRef = React.createRef();
      this.node = React.createRef();
      this.createBarChart = this.createBarChart.bind(this)
    }
    componentDidMount() {
        this.createBarChart()
     }
     componentDidUpdate() {
        this.createBarChart()
     }
     createBarChart() {
        const node = this.node
        const dataMax = max(this.props.data)
        const yScale = scaleLinear()
           .domain([0, dataMax])
           .range([0, this.props.size[1]])
     select(node)
        .selectAll('rect')
        .data(this.props.data)
        .enter()
        .append('rect')
     
     select(node)
        .selectAll('rect')
        .data(this.props.data)
        .exit()
        .remove()
     
     select(node)
        .selectAll('rect')
        .data(this.props.data)
        .style('fill', '#fe9922')
        .attr('x', (d,i) => i * 25)
        .attr('y', d => this.props.size[1] - yScale(d))
        .attr('height', d => yScale(d))
        .attr('width', 25)
     }  
    onClick() {
      this.inputRef.current.focus();
    }
  
    render() {
      return (

        <svg ref= {n => {this.node = n}}
            width={500} height={500}>
        </svg>
      );
    }
  }
  export default D3Bar