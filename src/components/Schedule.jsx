import HourRangeComponent from "./PrintSchedule";
import TaskToDo from "./Task";

function Schedule({ dateToUse, tasks, setTasks }) {
    // Filter tasks based on the selected date
    const filteredTasks = tasks.filter((task) => {
        const startDate = new Date(task.startDate);
        const endDate = new Date(task.endDate);
        startDate.setHours(0, 0, 0, 0);
        endDate.setHours(23, 59, 59, 999);
        return startDate <= new Date(dateToUse) && new Date(dateToUse) <= endDate;
    });

    // Calculate the start and end hours of the day based on tasks
    const calculateStartEndHours = (tasks) => {
        let startHour = 23.99;
        let endHour = 0;

        if (tasks.length === 0) {
            // No tasks, return default values
            return { startHour: startHour, endHour: endHour };
        }

        for (const task of tasks) {
            const startDateTime = new Date(`${task.startDate}T${task.startTime}`);
            const endDateTime = new Date(`${task.endDate}T${task.endTime}`);

            // Adjust startHour if the task starts earlier than the selected date
            if (startDateTime < dateToUse.setHours(0, 0, 0, 0)) {
                startHour = 0;
            }

            // Adjust endHour if the task ends later than the selected date
            if (endDateTime > dateToUse.setHours(23, 59, 59, 999)) {
                endHour = 23.99;
            }

            const taskStartHour = startDateTime.getHours() + startDateTime.getMinutes() / 60;
            const taskEndHour = endDateTime.getHours() + endDateTime.getMinutes() / 60;

            // Update startHour if the task starts earlier
            if (taskStartHour < startHour) {
                startHour = taskStartHour;
            }

            // Update endHour if the task ends later
            if (taskEndHour > endHour) {
                endHour = taskEndHour;
            }
        }

        return { startHour, endHour };
    };

    // Destructure the start and end hours
    const { startHour, endHour } = calculateStartEndHours(filteredTasks);

    // Render the TaskToDo components based on filtered tasks
    const renderTasksToDo = (filteredTasks) => {
        return filteredTasks.map((task) => {
            const { startHour: startTaskHour, endHour: endTaskHour } =
                calculateStartEndHours([task]);

            return (
                <TaskToDo
                    key={task.id}
                    id={task.id}
                    tasks={tasks}
                    setTasks={setTasks}
                    startOfScheduleHour={startHour > 9 ? 9 : startHour}
                    startOfTask={startTaskHour}
                    endOfTask={endTaskHour}
                    color={task.color}
                    title={task.title}
                />
            );
        });
    };

    // Render the Schedule component
    return (
        <div className={"tasks"}>
            {/* Display the HourRangeComponent */}
            <HourRangeComponent startHour={startHour > 9 ? 9 : startHour} endHour={endHour < 20 ? 20 : endHour} />

            {/* Render TaskToDo components */}
            {renderTasksToDo(filteredTasks)}
        </div>
    );
}

export default Schedule;
