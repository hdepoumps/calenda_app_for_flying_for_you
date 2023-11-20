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
    useEffect(() => {
        const tasks = JSON.parse(localStorage.getItem('tasks'));
        if (tasks) {
            setTasks(tasks);
        }
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

  return (
      <div className="App">
          <section className={"leftPanel"}>
              <Header showAddTaskPanel={showAddTaskPanel} setShowAddTaskPanel={setShowAddTaskPanel} dateToPrint={dateToUse}/>
              <Schedule dateToUse={dateToUse} tasks={tasks} setTasks={setTasks}/>
          </section>
          <section className={"rightPanel"}>
              <section className={"calendarMonth"}>
                  <img onClick={previousMonth} src={leftArrow} alt={"Icon of left arrow"}/>
                  <h2>{monthToPrint} {yearToPrint}</h2>
                  <img className={"invertArrow"} onClick={nextMonth} src={leftArrow} alt={"Icon of left arrow"}/>
              </section>
              <div className={"lineSeparator"}></div>
              <PrintCalendar monthToPrint={date} dateToPrint={dateToUse} setDateToUse={setDateToUse} />
          </section>
          {showAddTaskPanel && (
              <AddTask showAddTaskPanel={showAddTaskPanel} setShowAddTaskPanel={setShowAddTaskPanel} setTasks={setTasks} tasks={tasks}/>
          ) }

      </div>
  );
}

export default App;
