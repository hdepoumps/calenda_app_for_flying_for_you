import DesignClock from "./designClock";
import {useState} from "react";

const SetTime =({selectTime,setSelectTime, color})=>{
    const [isSelect, setIsSelect] = useState(true);
    const [amIsSelect,setAmIsSelect]= useState(true);

    const hoursToSet =10;
    const minutesToSet =10;

    const styles ={
        clock:{
            width:"210px"
        },
        firstSection:{
            display:"flex",
            justifyContent:"space-between",
            alignItems:"center"
        },
        printClock:{
            cursor: "pointer",
            display: "grid",
            alignItems: "center",
            padding:"10px 14px 10px 14px",
            margin:0,
            fontSize:"26px",
            borderRadius:"3px",
            backgroundColor:`#00000026`,
            color:"#000000",
        },
        printIsSelect:{
            backgroundColor:`${color}26`,
            color:color,
        },
        printMomentOfTheDay:{
            cursor: "pointer",
            padding:"5px",
            margin:0,
            backgroundColor:`#00000026`,
            color:"#000000",
            fontSize:"12px",
        },
        amPm:{
            borderRadius: "5px",
            overflow:"hidden"

        }
    }
    return(
        <div style={styles.clock}>
            <p style={{fontSize:10}}>SELECT TIME</p>
            <div style={styles.firstSection}>
                <div style={isSelect ? { ...styles.printClock,...styles.printIsSelect } : styles.printClock} onClick={()=> setIsSelect(!isSelect)}>{hoursToSet}</div>
                <p style={{fontSize:30}}>:</p>
                <div style={!isSelect ? { ...styles.printClock,...styles.printIsSelect } : styles.printClock} onClick={()=> setIsSelect(!isSelect)} >{minutesToSet}</div>
                <div style={styles.amPm}>
                    <div>
                        <p style={amIsSelect ? { ...styles.printMomentOfTheDay,...styles.printIsSelect } : styles.printMomentOfTheDay} onClick={()=> setAmIsSelect(!amIsSelect)}>AM</p>
                    </div>
                    <div>
                        <p style={!amIsSelect ? { ...styles.printMomentOfTheDay,...styles.printIsSelect } : styles.printMomentOfTheDay} onClick={()=> setAmIsSelect(!amIsSelect)}>PM</p>
                    </div>
                </div>
            </div>
            <div className={"displayClock"}>
                <DesignClock color={color} setStartTime={10} startTime={10}/>
            </div>
            <button>CANCEL</button>
            <button>OK</button>
        </div>
    )
}
export default SetTime