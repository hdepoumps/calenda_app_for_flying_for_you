import { useEffect, useState } from "react";
import '../style/css/mainPage.css';
import Header from "../components/Header";
import PrintCalendar from "../components/PrintCalendar";
import AddTask from "../components/AddTask";
import leftArrow from "../svg/LeftArrow.svg";
import Schedule from "../components/schedule";

function App() {
    // State variables for managing various aspects of the application
    const [dateToUse, setDateToUse] = useState(new Date());
    const [tasks, setTasks] = useState([]);
    const [showAddTaskPanel, setShowAddTaskPanel] = useState(false);
    const [date, setDate] = useState(new Date());
    const [yearToPrint, setYearToPrint] = useState(date.getFullYear());
    const [monthToPrint, setMonthToPrint] = useState(
        new Intl.DateTimeFormat('en-US', { month: 'long' }).format(date)
    );
    const [isScreenBelow900px, setIsScreenBelow900px] = useState(false);
    const [isDisplayRightPanel, setIsDisplayRightPanel] = useState(false);

    // Effect to load tasks from local storage on component mount
    useEffect(() => {
        const tasks = JSON.parse(localStorage.getItem('tasks'));
        if (tasks) {
            setTasks(tasks);
        }
    }, []);

    // Effect to update the screen size state on window resize
    useEffect(() => {
        const checkScreenSize = () => {
            setIsScreenBelow900px(window.innerWidth < 900);
        };

        // Initial check
        checkScreenSize();

        // Event listener for window resize
        window.addEventListener('resize', checkScreenSize);

        // Cleanup function to remove the event listener
        return () => {
            window.removeEventListener('resize', checkScreenSize);
        };
    }, []);

    // Function to update the displayed month
    const updateMonth = (modifier) => {
        const newDate = new Date(date);
        newDate.setMonth(newDate.getMonth() + modifier);
        setMonthToPrint(new Intl.DateTimeFormat('en-US', { month: 'long' }).format(newDate));
        setDate(newDate);
        setYearToPrint(newDate.getFullYear());
    };

    // Functions to navigate to the previous and next months
    const previousMonth = () => {
        updateMonth(-1);
    };

    const nextMonth = () => {
        updateMonth(1);
    };

    // Conditional class for right panel display
    let displayRightPanel = isDisplayRightPanel ? " displayRightPanel" : "";

    return (
        <div className={`App${displayRightPanel}`}>
            {/* Left Panel */}
            <section className={"leftPanel"}>
                {/* Header component */}
                <Header
                    showAddTaskPanel={showAddTaskPanel}
                    setShowAddTaskPanel={setShowAddTaskPanel}
                    dateToPrint={dateToUse}
                    isScreenBelow900px={isScreenBelow900px}
                    setIsDisplayRightPanel={setIsDisplayRightPanel}
                    isDisplayRightPanel={isDisplayRightPanel}
                />
                {/* Schedule component */}
                <Schedule dateToUse={dateToUse} tasks={tasks} setTasks={setTasks}/>
            </section>

            {/* Right Panel */}
            <section className={`rightPanel`}>
                {/* Calendar header */}
                <section className={"calendarMonth"}>
                    {/* Previous month arrow */}
                    <img onClick={previousMonth} src={leftArrow} alt={"Icon of left arrow"}/>
                    <h2>{monthToPrint} {yearToPrint}</h2>
                    {/* Next month arrow */}
                    <img className={"invertArrow"} onClick={nextMonth} src={leftArrow} alt={"Icon of left arrow"}/>
                </section>
                {/* Line separator */}
                <div className={"lineSeparator"}></div>
                {/* Calendar component */}
                <PrintCalendar
                    monthToPrint={date}
                    dateToPrint={dateToUse}
                    setDateToUse={setDateToUse}
                    setIsDisplayRightPanel={setIsDisplayRightPanel}
                    isDisplayRightPanel={isDisplayRightPanel}
                />
            </section>

            {/* Add Task Panel */}
            {showAddTaskPanel && (
                <AddTask
                    showAddTaskPanel={showAddTaskPanel}
                    setShowAddTaskPanel={setShowAddTaskPanel}
                    setTasks={setTasks}
                    tasks={tasks}
                    startDateToAdd={dateToUse}
                />
            )}

            {/* Burger menu for small screens */}
            {isScreenBelow900px && (
                <div className={"burgerMenu"} onClick={() => setIsDisplayRightPanel(!isDisplayRightPanel)}>
                    <div/>
                    <div/>
                    <div/>
                </div>
            )}
        </div>
    );
}

export default App;
