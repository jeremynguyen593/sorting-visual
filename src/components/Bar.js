import {useState} from 'react';
import './Bar.css';

function Bar({index, length, color}) {

    const[len, setLen] = useState(length);

    const colors = [
        ['rgba(61, 90, 241, 0.5)', 'rgba(61, 90, 241, 0.2)'],
        ['rgba(255, 48, 79, 1)', 'rgba(255, 48, 79, 0.5)'],
        ['rgba(131, 232, 90, 0.5)', 'rgba(131, 232, 90, 0.2)'],
    ];

    const barStyle = {
        height: length,
    };

    const inputStyle = {
        position: 'relative',
        top: Math.floor(length / 2) - 10,
        width: length,
        left: -Math.floor(length / 2) + 10,
        border: 'none',
    };

    const bottom = {
        transform: `translateY(${200 - length}px) rotateX(-90deg)`,
        backgroundColor: `${colors[color][0]}`,
        boxShadow: `5px 5px 50px 5px ${colors[color][1]}`,
        transition: '0.3s',
    };

    const front_back_left_right = {
        height: `${length}px`,
        transform: `translateY(${200 - length}px)`,
        backgroundColor: `${colors[color][0]}`,
        boxShadow: `5px 5px 50px 5px ${colors[color][1]}`,
        transition: '0.3s',
    };

    const handleChange = (e) => {
        let val = e.target.value;
        if (val === '') {
            setLen(0)
        } else {
            val = parseInt(val);
            if (val > 200) {
                setLen(200)
            } else {
                setLen(val)
            }
        }

        setLen(parseInt(e.target.value))
    };

    return (
        <>
            <div className = 'bar' style = {barStyle}>
                <div className = 'side top'></div>
                <div className = 'side bottom' style = {bottom}></div>
                <div className = 'side right'>
                    <div className = 'color-bar right-color-bar' style = {front_back_left_right}></div>
                </div>
                <div className = 'side left'>
                    <div className = 'color-bar left-color-bar' style = {front_back_left_right}></div>
                </div>
                <div className = 'side front'>
                <div className = 'color-bar front-color-bar' style = {front_back_left_right}></div>
                    <input 
                        type = 'number' 
                        length={length} 
                        style = {inputStyle} 
                        value = {len} 
                        className = 'input'
                        onChange = {handleChange} 
                        />
                </div>
                <div className= 'side back'>
                    <div className = 'color-bar back-color-bar' style={front_back_left_right}></div>
                </div>
            </div>
        </>
    );
}
export default Bar;