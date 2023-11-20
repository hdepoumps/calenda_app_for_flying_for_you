import deleteCross from "../svg/deleteCross.svg"

const TaskToDo = ({id,tasks,setTasks, startOfScheduleHour, startOfTask, endOfTask, title , color }) => {
    const divHourSizeInPixels = 58;
    const numberHourStartAfterScheduleHour = startOfTask-startOfScheduleHour;
    const calculatedMarginTop = divHourSizeInPixels/2+numberHourStartAfterScheduleHour*divHourSizeInPixels;
    const calculatedHeight = divHourSizeInPixels *(endOfTask-startOfTask);

    const deleteTask = ()=>{
        console.log(tasks)
        console.log(id)
        const updatedTasks = tasks.filter((task) => task.id !== id);
        console.log(updatedTasks)
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
        setTasks(updatedTasks);
    }

    const styles = {
        task:{
            position : "absolute",
            display: "flex",
            justifyContent:"space-between",
            alignItems: "center",
            gap: "33px",
            width:"calc(100% - 68px)",
            height:`${calculatedHeight}px`,
            top: `${calculatedMarginTop}px`,
            right: 0,
            borderLeft: `solid 3px ${color}`,
            backgroundColor: `${color}26`,
        },
        taskDescritpion:{
            width: "100%",
            paddingLeft: "33px",
        }
    }
    return(
        <div className={"task"} style={styles.task}>
            <p style={styles.taskDescritpion}>{title}</p>
            <img onClick={deleteTask} style={{width:14, paddingRight:"33px", cursor: "pointer"}} src={deleteCross} alt={"Cross for delete a task"}/>
        </div>
    )
}


export default TaskToDo