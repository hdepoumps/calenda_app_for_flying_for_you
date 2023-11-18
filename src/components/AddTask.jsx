import {useState} from "react";
import { ChromePicker } from 'react-color';
import "../style/css/addTask.css"
import calendarIcon from "../svg/calendarIcon.svg"
import clockIcon from "../svg/clockIcon.svg"


const AddTask =({startDateToAdd})=>{
    const [color, setColor] = useState('#6200EE'); // default color
    const [showPicker, setShowPicker] = useState(false);
    const handleClick = () => {
        setShowPicker(!showPicker);
    };
    const handleChangeComplete = (newColor) => {
        setColor(newColor.hex);
    };

    const styles = {
        lineDecoration:{
            height:"2px",
            width:"calc(100% - 4px)",
            backgroundColor:`${color}26`,
            borderLeft:`${color} solid 4px`,
        }
    }
    return(
        <section className={"addTask"}>
            <div className={"addPanelControl"}>
                <div className="firstSection">
                    <div>
                        <input type={"text"} id={"title"} placeholder={"Add Title"} minLength={1}/>
                        <div style={styles.lineDecoration}/>
                    </div>

                    <div className={"changeColor"}>
                        <div style={{backgroundColor: color}} id={"color"} onClick={handleClick}>
                        </div>
                        {showPicker && (
                            <ChromePicker color={color} onChangeComplete={handleChangeComplete}/>
                            //need to modify the css directly in innerHTML
                        )}
                    </div>
                </div>

                <div className={"dateDuration"}>
                    <img src={calendarIcon} alt={"calendar icon"}/>
                    <input type={"date"}/>
                    <input type={"date"}/>
                </div>
                <div className={"timingDuration"}>
                    <img src={clockIcon} alt={"calendar icon"}/>
                    <input type={"time"}/>
                    <input type={"time"}/>

                </div>

                <input type={"text"} id={"comment"} placeholder={"comment"}/>
                <div style={styles.lineDecoration}/>
                <button style={{backgroundColor:color}}>Add</button>
            </div>
        </section>
    )
}
export default AddTask;