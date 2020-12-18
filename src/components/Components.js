import React, { useEffect, useRef, useReducer } from 'react';
import './Components.css';
import { GrPlayFill, GrStopFill } from 'react-icons/gr';

export function TagsInput({ selectedTags, tags }) {
	// const [tags, setTags] = React.useState(props.tags);
	const removeTags = indexToRemove => {
		selectedTags([...tags.filter((_, index) => index !== indexToRemove)]);
	};
	const addTags = event => {
		if (event.target.value !== "") {
			selectedTags([...tags, event.target.value]);
			// props.selectedTags([...tags, event.target.value]);
			event.target.value = "";
		}
	};
	return (
		<div className="tags-input">
			<ul id="tags">
				{tags.map((tag, index) => (
					<li key={index} className="tag">
						<span className='tag-title'>{tag}</span>
						<span className='tag-close-icon'
							onClick={() => removeTags(index)}
						>
							x
						</span>
					</li>
				))}
			</ul>
			<input
				type="text"
				onKeyUp={event => event.key === "Enter" ? addTags(event) : null}
				placeholder="Press enter to add tags"
			/>
		</div>
	);
};

export function InputText({ value, setValue, error, errorText, setError }) {
	const onChangeInput = (event) => {
		setError(false);
		setValue(event.target.value);
	}
	return (<div className="input-container">
		<input
			type="text"
			placeholder="Enter Task title"
			value={value}
			onChange={onChangeInput}
		/>
		{error && <p>{errorText}</p>}</div>);
}

export function ActionButton({ text, onButtonClick }) {
	return (<button className="action-btn" onClick={onButtonClick}>{text}</button>);
}

export function StopWatch() {
	const [{ running, lapse }, setState] = useReducer(reducer, {
		running: false,
		lapse: 0,
	})
	const intervalRef = useRef(null)

	useEffect(() => {
		return () => clearInterval(intervalRef.current)
	}, [])

	function reducer(currentState, newState) {
		return { ...currentState, ...newState }
	}

	const handleStopwatch = () => {
		if (running) {
			clearInterval(intervalRef.current)
		} else {
			const startTime = Date.now() - lapse
			intervalRef.current = setInterval(() => {
				const millis = Date.now() - startTime
				setState({ lapse: millis / 1000 })
			}, 0)
		}
		setState({ running: !running })
	};
	return (<div className="stopwatch-container">
		{/* <h4>Time</h4> */}
		<p>{`Time: ${lapse}ms`}</p>
		<span onClick={handleStopwatch}>{running ? <GrStopFill /> : <GrPlayFill />}</span>
	</div>);
}

