import React, {Component} from 'react';

import Bar from './components/Bar';

import './App.css';

import 'toolcool-range-slider';

import BubbleSort from './algorithms/BubbleSort';

class App extends Component {
    state = { 
        array: [],
        arraySteps: [],
        colorKey: [],
        colorSteps: [],
        currentStep: 0,
        count: 10,
        delay: 50,
        algorithm: 'Bubble Sort',
        timeouts: [],
    };

    algo = {
        'Bubble Sort': BubbleSort,
    };

    componentDidMount() {
        this.generateRandomArray();
    }

    generateSteps = () => {
        let array = this.state.array.slice();
        let steps = this.state.arraySteps.slice();
        let colorSteps = this.state.colorSteps.slice();

        this.algo[this.state.algorithm](array, 0, steps, colorSteps);

        this.setState({
            arraySteps: steps,
            colorSteps: colorSteps,
        });
    };

    clearTimeouts = () => {
        this.state.timeouts.forEach((timeout) => clearTimeout(timeout));
        this.setState({
            timeouts: [],
        });
    };

    clearColorKey = () => {
        let blankKey = new Array(this.state.count).fill(0);

        this.setState({
            colorKey: blankKey,
            colorSteps: [blankKey],
        });
    };

    generateRandomNumber = (min, max) => {
        return Math.floor(Math.random() * (max-min) + min);
    }

    generateRandomArray = () => {
        this.clearTimeouts();
        this.clearColorKey();
        const count = this.state.count;
        const temp = [];
        for (let i =0; i < count; i++) {
            temp.push(this.generateRandomNumber(50, 200));
        }

        this.setState({
            array: temp,
            arraySteps: [temp],
            currentStep: 0,
        }, () => {
            this.generateSteps();
        });
    };

     changeArray = (index, value) => {
        let arr = this.state.array;
        arr[index] = value;
        this.setState({
            array: arr,
            arraySteps: [arr],
            currentStep: 0,
        }, () => {
            this.generateSteps();
        });
    };

    start = () => {
        let steps = this.state.arraySteps;
        let colorSteps = this.state.colorSteps;

        this.clearTimeouts();

        let timeouts = [];
        let i = 0;

        while (i < steps.length - this.state.currentStep) {
            let timeout = setTimeout(() => {
                let currentStep = this.state.currentStep;
                this.setState({
                    array: steps[currentStep],
                    colorKey: colorSteps[currentStep],
                    currentStep: currentStep + 1,
                });
                timeouts.push(timeout);
            }, this.state.delay * i);
            i++;
        }
        this.setState({
            timeouts: timeouts,
        });
    };
    changeSpeed = (e) => {
		this.clearTimeouts();
		this.setState({
			delay: parseInt(e.target.value),
		})
	}

    render() {
        let bars = this.state.array.map((value, index) => (
            <Bar 
                key={index} 
                index = {index} 
                length = {value} 
                color = {this.state.colorKey[index]}
                changeArray = {this.changeArray}
            />
            )
        );

        let playButton;

        if (this.state.arraySteps.length === this.state.currentStep) {
            playButton = (
                <button className='controller' onClick={this.generateRandomArray}>
                    Reset
                </button>
            );
        } else {
            playButton = (
                <button className='controller' onClick={this.start}>
                    Play
                </button>
            );
        }

        return (
            <div className = 'app'>
                <div className = 'frame'>
                    <div className='barsDiv container card'>{bars}</div>
                </div>
                <div className = 'control-panel'>
                    <div className='control-buttons'>
                       {playButton}
                    </div>
                    <div className='control-buttons'>
                    <toolcool-range-slider
                        slider-width="200px"
                        slider-height="0.5rem"
                        pointer-width="1.5rem"
                        pointer-height="1.5rem"
                        min = "50"
                        max = "500"
                        slider-bg="#6AD3BA"
                        slider-bg-hover="#3F8A8A"
                        pointer-border-hover="1px solid #79D6C0"
                        pointer-border-focus="1px solid #79D6C0">
                    </toolcool-range-slider>
                    </div>
                </div>
                <div className='panel'></div>
            </div>
        );
    }
}
export default App;


