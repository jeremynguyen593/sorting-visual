import React, {Component} from 'react';

import Bar from './components/Bar';

import './App.css';

class App extends Component {
    state = { 
        array: [],
        arraySteps: [],
        colorKey: [],
        colorSteps: [],
        currentStep: 0,
        count: 10,
        delay: 100,
        algorithms: ' ',
        timeouts: [],
    };

    componentDidMount() {
        this.generateRandomArray();
    }
    generateRandomNumber = (min, max) => {
        return Math.floor(Math.random() * (max-min) + min);
    }

    generateRandomArray = () => {
        const count = this.state.count;
        const temp = [];
        for (let i =0; i < count; i++) {
            temp.push(this.generateRandomNumber(50, 200));
        }
        this.setState({
            array: temp,
            arraySteps: [temp],
            //currentStep: 0,
        });
    };

    /* changeArray = (index, value) => {
        let arr = this.state.array;
        arr[index] = value;
        this.setState({
            array: arr,
            arraySteps: [arr],
            currentStep: 0,
        })
    } */

    render() {
        let bars = this.state.array.map((value, index) => (
            <Bar 
                key={index} 
                index = {index} 
                length = {value} 
                color = {0}
               // changeArray = {this.changeArray}
            />
            )
        );

        return (
            <div className = 'app'>
                <div className = 'frame'>
                    <div className='barsDiv container card'>{bars}</div>
                </div>
                <div className = 'control-panel'>
                    <div className='control-buttons'>
                        <button className='Play'>Play</button>
                    </div>
                </div>
                <div className='panel'></div>
            </div>
        );
    }
}
export default App;


