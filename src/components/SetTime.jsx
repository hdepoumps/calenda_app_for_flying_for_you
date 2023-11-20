import DesignClock from "./DesignClock";
import { useState } from "react";
import DesignClockMinutes from "./DesignClockMinutes";

// SetTime component for selecting time
const SetTime = ({ selectTime, setSelectTime, color }) => {
    // State variables for managing time selection
    const [isSelect, setIsSelect] = useState(true);
    const [hours, minutes] = selectTime.split(':');
    const [amIsSelect, setAmIsSelect] = useState(hours < 12);
    const currentDate = new Date();
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), hours, minutes);
    const [timeToUse, setTimeToUse] = useState(newDate);

    // Convert 24-hour format to 12-hour format
    let hoursToSet = hours;
    if (hours >= 12) {
        hoursToSet = hours - 12;
    }

    // State variables for hours and minutes in 12-hour format
    const [hoursToSend, setHoursToSend] = useState(hoursToSet);
    const [minutesToSend, setMinutesToSend] = useState(minutes);

    // Update the selected time
    setSelectTime(`${amIsSelect ? hoursToSend : hoursToSend + 12}:${minutesToSend < 10 ? `0${minutesToSend}` : minutesToSend}`);

    // Styles for the component
    const styles = {
        clock: {
            width: "160px",
            position: "relative"
        },
        firstSection: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
        },
        printClock: {
            cursor: "pointer",
            display: "grid",
            alignItems: "center",
            padding: "10px 14px 10px 14px",
            margin: 0,
            fontSize: "26px",
            borderRadius: "3px",
            backgroundColor: `#00000026`,
            color: "#000000",
        },
        printIsSelect: {
            backgroundColor: `${color}26`,
            color: color,
        },
        printMomentOfTheDay: {
            cursor: "pointer",
            padding: "5px",
            margin: 0,
            backgroundColor: `#00000026`,
            color: "#000000",
            fontSize: "12px",
        },
        amPm: {
            borderRadius: "5px",
            overflow: "hidden"
        }
    };

    return (
        <div style={styles.clock}>
            <p style={{ fontSize: 10 }}>SELECT TIME</p>
            <div style={styles.firstSection}>
                {/* Hour selection */}
                <div
                    style={isSelect ? { ...styles.printClock, ...styles.printIsSelect } : styles.printClock}
                    onClick={() => setIsSelect(!isSelect)}
                >
                    {hoursToSend}
                </div>
                <p style={{ fontSize: 30 }}>:</p>
                {/* Minute selection */}
                <div
                    style={!isSelect ? { ...styles.printClock, ...styles.printIsSelect } : styles.printClock}
                    onClick={() => setIsSelect(!isSelect)}
                >
                    {minutesToSend < 10 ? `0${minutesToSend}` : minutesToSend}
                </div>
                {/* AM/PM selection */}
                <div style={styles.amPm}>
                    <div>
                        <p
                            style={amIsSelect ? { ...styles.printMomentOfTheDay, ...styles.printIsSelect } : styles.printMomentOfTheDay}
                            onClick={() => setAmIsSelect(!amIsSelect)}
                        >
                            AM
                        </p>
                    </div>
                    <div>
                        <p
                            style={!amIsSelect ? { ...styles.printMomentOfTheDay, ...styles.printIsSelect } : styles.printMomentOfTheDay}
                            onClick={() => setAmIsSelect(!amIsSelect)}
                        >
                            PM
                        </p>
                    </div>
                </div>
            </div>
            {/* Display the clock component based on selection */}
            <div className={"displayClock"}>
                {isSelect && <DesignClock color={color} setStartTime={setHoursToSend} startTime={hoursToSend} />}
                {!isSelect && <DesignClockMinutes color={color} setStartTime={setMinutesToSend} startTime={minutesToSend} />}
            </div>
        </div>
    );
};

export default SetTime;
