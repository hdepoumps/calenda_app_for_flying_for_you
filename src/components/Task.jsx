import deleteCross from "../svg/deleteCross.svg";

const TaskToDo = ({ id, tasks, setTasks, startOfScheduleHour, startOfTask, endOfTask, title, color }) => {
    // Constants for calculating position and size of the task element
    const divHourSizeInPixels = 58;
    const numberHourStartAfterScheduleHour = startOfTask - startOfScheduleHour;
    const calculatedMarginTop = divHourSizeInPixels / 2 + numberHourStartAfterScheduleHour * divHourSizeInPixels;
    const calculatedHeight = divHourSizeInPixels * (endOfTask - startOfTask);

    // Function to delete the task
    const deleteTask = () => {
        // Filtering out the task with the specified id
        const updatedTasks = tasks.filter((task) => task.id !== id);

        // Updating state and local storage with the updated tasks
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
        setTasks(updatedTasks);
    };

    // Inline styles for the task element
    const styles = {
        task: {
            position: "absolute",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "33px",
            width: "calc(100% - 68px)",
            height: `${calculatedHeight}px`,
            top: `${calculatedMarginTop}px`,
            right: 0,
            borderLeft: `solid 3px ${color}`,
            backgroundColor: `${color}26`,
        },
        taskDescription: {
            width: "100%",
            paddingLeft: "33px",
        },
    };

    return (
        <div className={"task"} style={styles.task}>
            <p style={styles.taskDescription}>{title}</p>
            <img
                onClick={deleteTask}
                style={{ width: 14, paddingRight: "33px", cursor: "pointer" }}
                src={deleteCross}
                alt={"Cross for deleting a task"}
            />
        </div>
    );
};

export default TaskToDo;
