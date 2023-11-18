import {useState} from "react";
import '../style/css/mainPage.css';
import Header from "../components/Header";
import HourRangeComponent from "../components/PrintSchedule";
import TaskToDo from "../components/Task"
import PrintCalendar from "../components/PrintCalendar";
import AddTask from "../components/AddTask";
import leftArrow from "../svg/LeftArrow.svg";

function App() {
    const [date, setDate] = useState(new Date());
    const [yearToPrint, setYearToPrint]= useState(date.getFullYear());
    const [monthToPrint, setMonthToPrint] = useState(
        new Intl.DateTimeFormat('en-US', { month: 'long' }).format(date)
    );

    const updateMonth = (modifier) => {
        const newDate = new Date(date);
        newDate.setMonth(newDate.getMonth() + modifier);
        setMonthToPrint(new Intl.DateTimeFormat('en-US', { month: 'long' }).format(newDate));
        setDate(newDate);
        setYearToPrint(newDate.getFullYear())
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
              <Header/>
              <section className={"tasks"}>
                  <HourRangeComponent startHour={9} endHour={20} />
                  <TaskToDo startOfScheduleHour={9} startOfTask={10} endOfTask={12} rGBColor={"238,165,124"}/>
              </section>
          </section>
          <section className={"rightPanel"}>
              <section className={"calendarMonth"}>
                  <img onClick={previousMonth} src={leftArrow} alt={"Icon of left arrow"}/>
                  <h2>{monthToPrint} {yearToPrint}</h2>
                  <img className={"invertArrow"} onClick={nextMonth} src={leftArrow} alt={"Icon of left arrow"}/>
              </section>
              <div className={"lineSeparator"}></div>
              <PrintCalendar monthToPrint={date} dateToPrint={new Date()} />
          </section>
          <AddTask/>
      </div>
  );
}

export default App;
