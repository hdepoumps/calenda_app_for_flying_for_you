import React, {useState} from "react";
import { ChromePicker } from 'react-color';
import { v4 as uuidv4 } from 'uuid';
import "../style/css/addTask.css"
import calendarIcon from "../svg/calendarIcon.svg"
import clockIcon from "../svg/clockIcon.svg"
import SetTime from "./SetTime";
const AddTask = ({ showAddTaskPanel, setShowAddTaskPanel, startDateToAdd ,tasks,setTasks }) => {

    const [color, setColor] = useState('#6200EE'); // default color
    const [showPicker, setShowPicker] = useState(false);
    const [title, setTitle] = useState('');
    const [startDate, setStartDate] = useState(`${startDateToAdd.getYear()}-${startDateToAdd.getMonth()}-${startDateToAdd.getDate()}`);
    const [endDate, setEndDate] = useState(`${startDateToAdd.getYear()}-${startDateToAdd.getMonth()}-${startDateToAdd.getDate()}`);
    const [startTime, setStartTime] = useState(`${startDateToAdd.getHours()}:${startDateToAdd.getMinutes()}`);
    const [endTime, setEndTime] = useState(`${startDateToAdd.getHours()}:${startDateToAdd.getMinutes()}`);
    const [comment, setComment] = useState('');



    const handleClick = () => {
        setShowPicker(!showPicker);
    };

    const handleChangeComplete = (newColor) => {
        setColor(newColor.hex);
    };

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

        setShowAddTaskPanel(false);
    };

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
                <div className="firstSection">
                    <div>
                        <input type={"text"} id={"title"} placeholder={"Add Title"} maxLength={50} value={title} onChange={(e) => setTitle(e.target.value)} />
                        <div style={styles.lineDecoration} />
                    </div>

                    <div className={"changeColor"}>
                        <div style={{ backgroundColor: color }} id={"color"} onClick={handleClick}>
                        </div>
                        {showPicker && (
                            <ChromePicker color={color} onChangeComplete={handleChangeComplete} />
                            //need to modify the css directly in innerHTML
                        )}
                    </div>
                </div>

                <div className={"dateDuration"}>
                    <img src={calendarIcon} alt={"calendar icon"} />
                    <input style={{ backgroundColor: `${color}26` }} type={"date"} value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                    <input style={{ backgroundColor: `${color}26` }} type={"date"} value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                </div>
                <div className={"timingDuration"}>
                    <img src={clockIcon} alt={"calendar icon"} />
                    <input style={{ backgroundColor: `${color}26` }} type={"time"} value={startTime} onChange={(e) => setStartTime(e.target.value)} />
                    <input style={{ backgroundColor: `${color}26` }} type={"time"} value={endTime} onChange={(e) => setEndTime(e.target.value)} />
                </div>
                <textarea id={"comment"} placeholder={"comment"} value={comment} onChange={(e) => setComment(e.target.value)}/>
                <div style={styles.lineDecoration} />
                <button style={{ backgroundColor: color }} onClick={handleAddTask}>Add</button>
            </div>
            <div className={"cancelAdd"} onClick={() => setShowAddTaskPanel(!showAddTaskPanel)}></div>
        </section>
    )
}

export default AddTask;
