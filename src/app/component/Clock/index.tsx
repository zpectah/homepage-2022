import React, { CSSProperties, useEffect, useRef, useState } from 'react';

// https://codepen.io/mohebifar/pen/KwdeMz

export interface ClockProps {
	style?: CSSProperties;
	hours: number;
	minutes: number;
	seconds: number;
}

const Clock = (props: ClockProps) => {
	const {
		style,
		hours,
		minutes,
		seconds,
	} = props;

	const [ hoursAngle, setHoursAngle ] = useState(360 * hours / 12 + minutes / 2);
	const [ minuteAngle, setMinuteAngle ] = useState(360 * minutes / 60);
	const [ secondAngle, setSecondAngle ] = useState(360 * seconds / 60);

	const cx = 100;
	const cy = 100;
	const face = useRef(null);
	const hourHand = useRef(null);
	const minuteHand = useRef(null);
	const secondHand = useRef(null);

	const shifter = (val) => {
		return [ val, cx, cy].join(' ');
	};

	useEffect(() => {
		setHoursAngle(360 * hours / 12 + minutes / 2);
		setMinuteAngle(360 * minutes / 60);
		setSecondAngle(360 * seconds / 60);
	}, [ seconds, minutes, hours ]);

	useEffect(() => {
		for(let i = 1; i <= 12; i++) {
			let el = document.createElementNS('http://www.w3.org/2000/svg', 'line');
			el.setAttribute('x1', '100');
			el.setAttribute('y1', '30');
			el.setAttribute('x2', '100');
			el.setAttribute('y2', '40');
			el.setAttribute('transform', 'rotate(' + (i * 360 / 12) + ' 100 100)');
			el.setAttribute('style', 'stroke: rgba(225,225,225,.5);');
			face.current.appendChild(el);
		}
	}, []);

	return (
		<svg
			width="200"
			height="200"
			ref={face}
			style={style}
		>
			<filter
				id="innerShadow"
				x="-20%"
				y="-20%"
				width="140%"
				height="140%"
			>
				<feGaussianBlur
					in="SourceGraphic"
					stdDeviation="3"
					result="blur"
				/>
				<feOffset
					in="blur"
					dx="2.5"
					dy="2.5"
				/>
			</filter>
			<g>
				<circle
					id="shadow"
					style={{
						fill: 'rgba(0,0,0,0.1)',
					}}
					cx="97"
					cy="100"
					r="87"
					filter="url(#innerShadow)"
				/>
				<circle
					id="circle"
					style={{
						stroke: '#FFF',
						strokeWidth: '4px',
						fill: 'rgba(25,25,25,.5)',
					}}
					cx="100"
					cy="100"
					r="80"
				/>
			</g>
			<g>
				<line
					x1="100"
					y1="100"
					x2="100"
					y2="55"
					style={{
						stroke: ' #fffbf9',
						strokeWidth: '3px',
					}}
					id="hourhand"
				>
					<animateTransform
						attributeName="transform"
						attributeType="XML"
						type="rotate"
						dur="43200s"
						repeatCount="indefinite"
						ref={hourHand}
						from={shifter(hoursAngle)}
						to={shifter(hoursAngle + 360)}
					/>
				</line>
				<line
					x1="100"
					y1="100"
					x2="100"
					y2="40"
					style={{
						stroke: '#fdfdfd',
						strokeWidth: '4px',
					}}
					id="minutehand"
				>
					<animateTransform
						attributeName="transform"
						attributeType="XML"
						type="rotate"
						dur="3600s"
						repeatCount="indefinite"
						ref={minuteHand}
						from={shifter(minuteAngle)}
						to={shifter(minuteAngle + 360)}
					/>
				</line>
				<line
					x1="100"
					y1="100"
					x2="100"
					y2="30"
					style={{
						stroke: 'rgba(225,225,225,.5)',
						strokeWidth: '2px',
					}}
					id="secondhand"
				>
					<animateTransform
						attributeName="transform"
						attributeType="XML"
						type="rotate"
						repeatCount="indefinite"
						ref={secondHand}
						from={shifter(secondAngle)}
						to={shifter(secondAngle + 360)}
					/>
				</line>
			</g>

		</svg>
	);
};

export default Clock;
