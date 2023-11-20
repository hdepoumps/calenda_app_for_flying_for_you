import React, { useState } from 'react';

// DesignClock component allows users to select a specific time
const DesignClock = ({ startTime, setStartTime, color }) => {
    // State to track the selected number
    const [selectedNumber, setSelectedNumber] = useState(startTime);

    // Handle number click event
    const handleNumberClick = (number) => {
        setSelectedNumber(number);
        setStartTime(number);
    };

    // Function to render numbers in a circular pattern
    const renderNumberSuite = ({ numberofIteration }) => {
        const angleIncrement = (2 * Math.PI) / numberofIteration;
        const radius = 60; // adjust the radius as needed
        const startingAngle = -Math.PI / 2; // start from the top

        const numberSuite = [];

        for (let i = 0; i < numberofIteration; i++) {
            const angle = startingAngle + i * angleIncrement;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;

            const numberStyle = {
                position: 'absolute',
                left: `calc(50% + ${x}px)`,
                top: `calc(50% + ${y}px - 13px)`,
                transform: 'translate(-50%, -50%)', // center the numbers
                cursor: 'pointer',
                width: '27px',
                paddingTop: '6px',
                paddingBottom: '6px',
                textAlign: 'center',
                fontSize: '12px',
                borderRadius: '50%',
                backgroundColor: selectedNumber === i ? color : 'transparent',
                color: selectedNumber === i ? 'white' : '',
            };

            // Render numbers every 5 steps
            if (i % 5 === 0) {
                numberSuite.push(
                    <p key={i} style={numberStyle} onClick={() => handleNumberClick(i)}>
                        {i}
                    </p>
                );
            }
        }

        return numberSuite;
    };

    // Styles for the needle and center point
    const needleStyle = {
        position: 'absolute',
        left: 'calc(50% - 1px)',
        top: 'calc(50% - 50px)',
        width: '2px',
        height: '50px',
        backgroundColor: color, // adjust the color as needed
        transformOrigin: '50% 100%',
        transform: `rotate(${(360 / 60) * selectedNumber}deg)`,
    };

    const centerPointStyle = {
        position: 'absolute',
        left: '50%',
        top: '50%',
        width: '6px',
        height: '6px',
        borderRadius: '50%',
        backgroundColor: color, // adjust the color as needed
        transform: 'translate(-50%, -50%)',
    };

    // Styles for the dial decoration
    const styles = {
        dialDecoration: {
            position: 'relative',
            backgroundColor: `#00000026`,
            width: '160px',
            height: '160px',
            borderRadius: '50%',
        },
    };

    // Render the DesignClock component
    return (
        <div style={styles.dialDecoration}>
            {/* Render numbers in a circular pattern */}
            {renderNumberSuite({ numberofIteration: 60 })}

            {/* Render the needle */}
            <div style={needleStyle}></div>

            {/* Render the center point */}
            <div style={centerPointStyle}></div>
        </div>
    );
};

export default DesignClock;
