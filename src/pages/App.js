import {useEffect, useState} from "react";
import '../style/css/mainPage.css';
import Header from "../components/Header";
import PrintCalendar from "../components/PrintCalendar";
import AddTask from "../components/AddTask";
import leftArrow from "../svg/LeftArrow.svg";
import Schedule from "../components/schedule";

function App() {
    const [dateToUse, setDateToUse] =useState (new Date());
    const [tasks, setTasks] = useState([]);
    const [showAddTaskPanel, setShowAddTaskPanel] = useState(false);
    const [date, setDate] = useState(new Date());
    const [yearToPrint, setYearToPrint]= useState(date.getFullYear());
    const [monthToPrint, setMonthToPrint] = useState(
        new Intl.DateTimeFormat('en-US', { month: 'long' }).format(date)
    );
    const [isScreenBelow900px, setIsScreenBelow900px] = useState(false);
    const [isDisplayRightPanel, setIsDisplayRightPanel] = useState(false);

    useEffect(() => {
        const tasks = JSON.parse(localStorage.getItem('tasks'));
        if (tasks) {
            setTasks(tasks);
        }
    }, []);

    useEffect(() => {
        const checkScreenSize = () => {
            setIsScreenBelow900px(window.innerWidth < 900);

        };
        checkScreenSize();

        window.addEventListener('resize', checkScreenSize);

        return () => {
            window.removeEventListener('resize', checkScreenSize);
        };
    }, []);

    const updateMonth = (modifier) => {
        const newDate = new Date(date);
        newDate.setMonth(newDate.getMonth() + modifier);
        setMonthToPrint(new Intl.DateTimeFormat('en-US', { month: 'long' }).format(newDate));
        setDate(newDate);
        setYearToPrint(newDate.getFullYear())
        console.log(tasks)
    };

    const previousMonth = () => {
        updateMonth(-1);
    };

    const nextMonth = () => {
        updateMonth(1);
    };
    let displayRightPanel=isDisplayRightPanel?" displayRightPanel":"";
  return (
      <div className={`App${displayRightPanel}`}>
          <section className={"leftPanel"}>
              <Header showAddTaskPanel={showAddTaskPanel} setShowAddTaskPanel={setShowAddTaskPanel} dateToPrint={dateToUse} isScreenBelow900px={isScreenBelow900px} setIsDisplayRightPanel={setIsDisplayRightPanel} isDisplayRightPanel={isDisplayRightPanel}/>
              <Schedule dateToUse={dateToUse} tasks={tasks} setTasks={setTasks}/>
          </section>
          <section className={`rightPanel`}>
              <section className={"calendarMonth"}>
                  <img onClick={previousMonth} src={leftArrow} alt={"Icon of left arrow"}/>
                  <h2>{monthToPrint} {yearToPrint}</h2>
                  <img className={"invertArrow"} onClick={nextMonth} src={leftArrow} alt={"Icon of left arrow"}/>
              </section>
              <div className={"lineSeparator"}></div>
              <PrintCalendar monthToPrint={date} dateToPrint={dateToUse} setDateToUse={setDateToUse} setIsDisplayRightPanel={setIsDisplayRightPanel} isDisplayRightPanel={isDisplayRightPanel} />
          </section>
          {showAddTaskPanel && (
              <AddTask showAddTaskPanel={showAddTaskPanel} setShowAddTaskPanel={setShowAddTaskPanel} setTasks={setTasks} tasks={tasks} startDateToAdd={dateToUse}/>
          ) }
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
