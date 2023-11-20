import { DayInTheMonthToday, MonthToday } from "./Date"; // Importing the Date functions
import addCross from "../svg/Add.svg"; // Importing the addCross image
import "../style/css/header.css"; // Importing the CSS styles for the header

// Header component displays the current day and month, along with an add button
const Header = ({ showAddTaskPanel, setShowAddTaskPanel, dateToPrint, isScreenBelow900px, isDisplayRightPanel, setIsDisplayRightPanel }) => {
    // Render the component
    return (
        <header className="App-header">
            <h2>{DayInTheMonthToday(dateToPrint)} {MonthToday(dateToPrint)}</h2>

            <div className={"rightMenuContener"}>
                <div onClick={() => setShowAddTaskPanel(!showAddTaskPanel)} className={"add"}>
                    <img src={addCross} alt={"cross"} />
                </div>
            </div>
        </header>
    );
};

// Export the Header component as the default export
export default Header;
