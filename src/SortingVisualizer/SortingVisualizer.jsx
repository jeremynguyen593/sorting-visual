import React, { Component } from 'react'
import './SortingVisualizer.css'

export default class SortingVisualizer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            array:[],
        };
}
//sets up the array when loaded up
componentDidMount() {
    this.resetArray();
}

resetArray() {
    const array = [];
    //puts in <number> random ints
    for (let i = 0; i < 600; i++) {
        array.push(randomIntFromInterval(5, 500));
    }
    //set the state to be the new array
    this.setState({array});
}

render() {
    const {array} = this.state;

    // => means return
    return (
        <div className = "array-container">
            {array.map((value, index) => (
            //create a map where index is the key
            <div className = "array-bar" 
            key = {index}
            //the value is the block's height
            style = {{height: `${value}px`}}>
            </div>
        ))}
        </div>
    );
    }
}


    function randomIntFromInterval(min, max) {
        return Math.floor(Math.random() * (max-min+1) + min);
    }