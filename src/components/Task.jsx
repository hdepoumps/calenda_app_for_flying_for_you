const TaskToDo = ({startOfScheduleHour, startOfTask, endOfTask , rGBColor }) => {
    const divHourSizeInPixels = 61;
    const numberHourStartAfterScheduleHour = startOfTask-startOfScheduleHour;
    const calculatedMarginTop = divHourSizeInPixels/2+numberHourStartAfterScheduleHour*divHourSizeInPixels;
    const calculatedHeight = divHourSizeInPixels *(endOfTask-startOfTask);

    const styles = {
        task:{
            position : "absolute",
            display: "flex",
            alignItems: "center",
            width:"calc(100% - 68px)",
            height:`${calculatedHeight}px`,
            top: `${calculatedMarginTop}px`,
            right: 0,
            borderLeft: `solid 3px rgb(${rGBColor})`,
            backgroundColor: `rgba(${rGBColor}, 0.15)`,
        },
        taskDescritpion:{
            paddingLeft: "33px",
            paddingRight: "33px"
        }
    }
    return(
        <div className={"task"} style={styles.task}>
            <p style={styles.taskDescritpion}>Lorem ipsum dolor</p>
        </div>
    )
}


export default TaskToDo