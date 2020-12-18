import React, { useEffect } from 'react';
import { GrPlayFill, GrStopFill, GrRefresh } from 'react-icons/gr';

export default function Stopwatch({ running, lapse, setState, intervalRef }) {

    useEffect(() => {
        return () => clearInterval(intervalRef.current)
    }, [intervalRef])

    function millisToMinutesAndSeconds(millis) {
        const minutes = Math.floor(millis / 60000);
        const seconds = ((millis % 60000) / 1000).toFixed(0);
        return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    }

    function handleRunClick() {
        if (running) {
            clearInterval(intervalRef.current)
        } else {
            const startTime = Date.now() - lapse
            intervalRef.current = setInterval(() => {
                setState({ lapse: Date.now() - startTime })
            }, 0)
        }
        setState({ running: !running })
    }

    function handleClearClick() {
        clearInterval(intervalRef.current)
        setState({ lapse: 0, running: false })
    }

    return (
        <div style={containerStyles}>
            <label
                style={{
                    fontSize: '1.5em',
                    display: 'block',
                }}
            >
                {millisToMinutesAndSeconds(lapse)}
            </label>
            <button onClick={handleRunClick} style={buttonStyles}>
                {running ? <GrStopFill /> : <GrPlayFill />}
            </button>
            <button onClick={handleClearClick} style={buttonStyles}>
                <GrRefresh />
            </button>
        </div>
    )
}

const buttonStyles = {
    border: '1px solid #ccc',
    background: '#fff',
    fontSize: '1em',
    padding: '5px',
    width: ' 50px',
}

const containerStyles = {
    width: '10%',
    textAlign: 'center',
}