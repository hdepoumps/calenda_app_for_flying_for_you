import "./Date"
import {DayInTheMonthToday, MonthToday} from "./Date";
import addCross from "../svg/Add.svg"
import "../style/css/header.css"
function Header() {
    return (
        <header className="App-header">
            <h2>{DayInTheMonthToday()} {MonthToday()}</h2>
            <div className={"add"}>
                <img src={addCross} alt={"cross"}/>
            </div>
        </header>
    );
}
export default Header;
