import React, {Component} from 'react';

import Bar from './components/Bar';

import './App.css';

import BubbleSort from './algorithms/BubbleSort';
import MergeSort from './algorithms/MergeSort';


class App extends Component {
    state = { 
        array: [],
        arraySteps: [],
        colorKey: [],
        colorSteps: [],
        currentStep: 0,
        count: 10,
        delay: 225,
        algorithm: 'Merge Sort',
        timeouts: [],
        isDisabled: false,
    };

    algo = {
        'Bubble Sort': BubbleSort,
        'Merge Sort': MergeSort,
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

    disableSlider = () => {
        document.getElementById("slider-1").disabled = true;
        document.getElementById("slider-2").disabled = true;
    }

    enableSlider = () => {
        document.getElementById("slider-1").disabled = false;
        document.getElementById("slider-2").disabled = false;
    }

    generateRandomArray = () => {
        this.enableSlider();
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
            isDisabled: false,
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

    changeAlgorithm = (e) => {
		this.clearTimeouts();
		this.clearColorKey();
		this.setState(
			{
				algorithm: e.target.value,
				currentStep: 0,
				arraySteps: [
					this.state.arraySteps[
						this.state.currentStep === 0 ? 0 : this.state.currentStep - 1
					],
				],
			},
			() => this.generateSteps()
		);
	};


    start = () =>{
        this.disableSlider();

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
            this.setState({
                isRunning: true,
            })
            i++;
            
        }

        this.setState({
            timeouts: timeouts,
            isDisabled: !this.isDisabled,
        });
        
    }


    handleSpeed = (e) => {
        this.setState({
            delay: Math.abs(parseInt(e.target.value) - 950),
        })
    }

    handleSize= (e) => {
        this.setState({
            count: parseInt(e.target.value),
        })
        this.componentDidMount();
    }


    getInitialState = () => {
        return {
            value: 500
        }
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
                <button className='controller' onClick={this.start} disabled={this.state.isDisabled}>
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
                    <div className="slider">
                        <p>Speed</p>
                        <input type="range" id = "slider-1" min="50" max="1000" value= {this.delay} onChange={this.handleSpeed}></input>
                    </div>
                    <div className="slider">
                        <p>Size</p>
                        <input type="range" id = "slider-2" min="5" max="20" value= {this.count} onChange={this.handleSize}></input>
                    </div>
                    <select>
                        <option value="Bubble Sort" onChange={this.changeAlgorithm}>Bubble Sort</option>
                        <option value="action-2">Another action</option>
                        <option value="action-3">Something else</option>
                    </select>
                    
                </div>
                <div className='panel'></div>
            </div>
        );
    }
}
export default App;


