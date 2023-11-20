import React, { useState } from "react";
import { ChromePicker } from 'react-color';
import { v4 as uuidv4 } from 'uuid';
import "../style/css/addTask.css"
import calendarIcon from "../svg/calendarIcon.svg"
import clockIcon from "../svg/clockIcon.svg"
import SetTime from "./SetTime";

const AddTask = ({ showAddTaskPanel, setShowAddTaskPanel, startDateToAdd, tasks, setTasks }) => {

    // State variables to manage form input values
    const [color, setColor] = useState('#6200EE'); // default color
    const [showPicker, setShowPicker] = useState(false);
    const [title, setTitle] = useState('');
    const [startDate, setStartDate] = useState(`${startDateToAdd.getYear()}-${startDateToAdd.getMonth()}-${startDateToAdd.getDate()}`);
    const [endDate, setEndDate] = useState(`${startDateToAdd.getYear()}-${startDateToAdd.getMonth()}-${startDateToAdd.getDate()}`);
    const [startTime, setStartTime] = useState(`${startDateToAdd.getHours()}:${startDateToAdd.getMinutes()}`);
    const [endTime, setEndTime] = useState(`${startDateToAdd.getHours()}:${startDateToAdd.getMinutes()}`);
    const [comment, setComment] = useState('');
    const [startHoursIsClick, setStartHoursIsClick] = useState(false);
    const [endHoursIsClick, setEndHoursIsClick] = useState(false);

    // Handle click event for color picker
    const handleClick = () => {
        setShowPicker(!showPicker);
    };

    // Handle color change event for color picker
    const handleChangeComplete = (newColor) => {
        setColor(newColor.hex);
    };

    // Handle adding a new task
    const handleAddTask = () => {
        // Collect all the information into a tasks variable
        const task = {
            id: uuidv4(),
            startDate,
            endDate,
            startTime,
            endTime,
            title,
            description: comment,
            color,
        };
        // Update tasks state and local storage
        setTasks([...tasks, task]);
        localStorage.setItem('tasks', JSON.stringify([...tasks, task]));

        // Clear input fields or reset the component state as needed
        setTitle('');
        setStartDate('');
        setEndDate('');
        setStartTime('');
        setEndTime('');
        setComment('');
        setColor('#6200EE');

        // Close the add task panel
        setShowAddTaskPanel(false);
    };

    // Style for line decoration
    const styles = {
        lineDecoration: {
            height: "2px",
            width: "calc(100% - 4px)",
            backgroundColor: `${color}26`,
            borderLeft: `${color} solid 4px`,
        }
    };

    return (
        <section className={"addTask"}>
            <div className={"addPanelControl"}>
                {/* Section for task title input */}
                <div className="firstSection">
                    <div>
                        <input type={"text"} id={"title"} placeholder={"Add Title"} maxLength={50} value={title} onChange={(e) => setTitle(e.target.value)} />
                        <div style={styles.lineDecoration} />
                    </div>

                    {/* Section for changing task color */}
                    <div className={"changeColor"}>
                        <div style={{ backgroundColor: color }} id={"color"} onClick={handleClick}>
                        </div>
                        {showPicker && (
                            <ChromePicker color={color} onChangeComplete={handleChangeComplete} />
                            // Need to modify the CSS directly in innerHTML
                        )}
                    </div>
                </div>

                {/* Section for date duration */}
                <div className={"dateDuration"}>
                    <img src={calendarIcon} alt={"calendar icon"} />
                    <input style={{ backgroundColor: `${color}26` }} type={"date"} value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                    <input style={{ backgroundColor: `${color}26` }} type={"date"} value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                </div>

                {/* Section for timing duration */}
                <div className={"timingDuration"}>
                    <img src={clockIcon} alt={"calendar icon"} />
                    <p style={{ backgroundColor: `${color}26` }} onClick={() => setStartHoursIsClick(!startHoursIsClick)}> {startTime} </p>
                    <p style={{ backgroundColor: `${color}26` }} onClick={() => setEndHoursIsClick(!endHoursIsClick)}> {endTime} </p>
                </div>

                {/* Section for displaying clock and setting time */}
                <div className={"displayClock"}>
                    {startHoursIsClick && <SetTime color={color} selectTime={startTime} setSelectTime={setStartTime} />}
                    {endHoursIsClick && <SetTime color={color} selectTime={endTime} setSelectTime={setEndTime} />}
                </div>

                {/* Section for adding a comment */}
                <textarea id={"comment"} placeholder={"comment"} value={comment} onChange={(e) => setComment(e.target.value)} />
                <div style={styles.lineDecoration} />

                {/* Button to add the task */}
                <button style={{ backgroundColor: color }} onClick={handleAddTask}>Add</button>
            </div>

            {/* Section for canceling the task addition */}
            <div className={"cancelAdd"} onClick={() => setShowAddTaskPanel(!showAddTaskPanel)}></div>
        </section>
    )
}

// Export the AddTask component
export default AddTask;