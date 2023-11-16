import '../style/css/mainPage.css';
import Header from "../components/header";
import HourRangeComponent from "../components/printSchedule";
import TaskToDo from "../components/task";
function App() {
  return (
      <div className="App">
          <section className={"leftPanel"}>
              <Header/>
              <section className={"tasks"}>
                  <HourRangeComponent startHour={9} endHour={20} />
                  <TaskToDo startOfScheduleHour={9} startOfTask={10} endOfTask={12} rGBColor={"238,165,124"}/>
              </section>
          </section>
      </div>
  );
}

export default App;
