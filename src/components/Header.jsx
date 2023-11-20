import "./Date"
import {DayInTheMonthToday, MonthToday} from "./Date";
import addCross from "../svg/Add.svg"
import "../style/css/header.css"

const Header = ({showAddTaskPanel, setShowAddTaskPanel, dateToPrint, isScreenBelow900px, isDisplayRightPanel, setIsDisplayRightPanel}) => {

    return (
        <header className="App-header">
            <h2>{DayInTheMonthToday(dateToPrint)} {MonthToday(dateToPrint)}</h2>
            <div className={"rightMenuContener"}>
                <div onClick={()=>setShowAddTaskPanel(!showAddTaskPanel)} className={"add"}>
                    <img src={addCross} alt={"cross"} />
                </div>
            </div>
        </header>
    );
};
 // Ajout de cette ligne pour exporter showAddTaskPanel

export default Header;
