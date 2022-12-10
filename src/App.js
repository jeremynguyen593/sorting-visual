import React, {Component} from 'react';

import Bar from './components/Bar';

import './App.css';

import BubbleSort from './algorithms/BubbleSort';
import MergeSort from './algorithms/MergeSort';
import InsertionSort from './algorithms/InsertionSort';
import QuickSort from './algorithms/QuickSort';

class App extends Component {
    state = { 
        array: [],
        arraySteps: [],
        colorKey: [],
        colorSteps: [],
        currentStep: 0,
        count: 10,
        delay: 225,
        algorithm: 'Bubble Sort',
        timeouts: [],
        isDisabled: false,
    };

    algo = {
        'Bubble Sort': BubbleSort,
        'Merge Sort': MergeSort,
        'Insertion Sort': InsertionSort,
        'Quick Sort': QuickSort,
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

        for (let i = 0; i < steps.length - this.state.currentStep; i++) {
            let timer = this.state.delay * i;
            //console.log("!");
            let timeout = setTimeout(() => {
                /*
                if (this.state.currentStep === -1) {
                    //i = 1000000;
                    return;
                }
                */
                //console.log("?");
                let currentStep = this.state.currentStep;
                this.setState({
                    array: steps[currentStep],
                    colorKey: colorSteps[currentStep],
                    currentStep: currentStep + 1,
                });
                timeouts.push(timeout);
            }, timer);
            this.setState({
                isRunning: true,
            })
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
    /*
    stop = () => {
        this.setState({
            currentStep: -1,
        })
    }

    reset = () => {
        this.generateRandomArray();
        this.setState({
            array: [],
        arraySteps: [],
        colorKey: [],
        colorSteps: [],
        })
    } */

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
        let stopButton;

        if (this.state.arraySteps.length === this.state.currentStep || this.state.currentStep === -1) {
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
            /*
            stopButton = (
                <button className='controller' onClick={this.stop} disabled={!this.state.isDisabled}>
                    Stop
                </button>
            ) */
        }
    
        return (
            <div className = 'app'>
                <div className = 'frame'>
                    <div className='barsDiv container card'>{bars}</div>
                </div>
                <div className = 'control-panel'>
                    <div className='control-buttons'>
                       {playButton}
                       {stopButton}
                    </div>
                    <div className="slider">
                        <p>Speed</p>
                        <input type="range" id = "slider-1" min="50" max="1000" value= {this.delay} onChange={this.handleSpeed}></input>
                    </div>
                    <div className="slider">
                        <p>Size</p>
                        <input type="range" id = "slider-2" min="5" max="20" value= {this.count} onChange={this.handleSize}></input>
                    </div>
                    <select value = {this.state.algorithm} onChange = {this.changeAlgorithm} disabled={this.state.isDisabled}>
                        <option value="Bubble Sort">Bubble Sort</option>
                        <option value="Merge Sort">Merge Sort</option>
                        <option value="Insertion Sort">Insertion Sort</option>
                        <option value= "Quick Sort">Quick Sort</option>
                    </select>
                    
                </div>
                <div className='panel'></div>
            </div>
        );
    }
}
export default App;


