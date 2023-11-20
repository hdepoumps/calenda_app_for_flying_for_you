import React from "react"; // Make sure to import React if you're using JSX
import HourRangeComponent from "./PrintSchedule";
import TaskToDo from "./Task";

function Schedule({ dateToUse, tasks, setTasks }) {
    const filteredTasks = tasks.filter((task) => {
        const startDate = new Date(task.startDate);
        const endDate = new Date(task.endDate);
        startDate.setHours(0, 0, 0, 0);
        endDate.setHours(23, 59, 59, 999);
        return startDate <= new Date(dateToUse) && new Date(dateToUse) <= endDate;
    });

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

            const taskStartHour =
                startDateTime.getHours() + startDateTime.getMinutes() / 60;
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

        // Check for tasks that span across days
        if (startHour > endHour) {
            // Tasks span across days, set startHour to 0.0 and endHour to 23.99
            startHour = 0.0;
            endHour = 23.99;
        }

        return { startHour, endHour };
    };

    const { startHour, endHour } = calculateStartEndHours(filteredTasks);

    const renderTasksToDo = (filteredTasks) => {
        return filteredTasks.map((task) => {
            const {startHour: startTaskHour, endHour: endTaskHour} =
                calculateStartEndHours([task]);
            return (
                <TaskToDo
                    key={task.id}
                    id={task.id}
                    tasks={tasks}
                    setTasks={setTasks}
                    startOfScheduleHour={startHour}
                    startOfTask={startTaskHour}
                    endOfTask={endTaskHour}
                    color={task.color}
                    title={task.title}
                />
            );
        });
    };

    return (
        <div className={"tasks"}>
            <HourRangeComponent startHour={startHour>9?9:startHour} endHour={endHour<20?20:endHour} />
            {renderTasksToDo(filteredTasks)}
        </div>
    );
}

export default Schedule;
