import "../style/css/printCalendar.css"
const PrintCalendar=({ dateToPrint, monthToPrint })=>{
    const getDaysInMonth = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    const daysInMonth = getDaysInMonth(monthToPrint);
    const firstDayOfMonth = new Date(monthToPrint.getFullYear(), monthToPrint.getMonth(), 1).getDay();
    const daysInPreviousMonth = getDaysInMonth(new Date(monthToPrint.getFullYear(), monthToPrint.getMonth() - 1));

    const renderDays = () => {
        const days = [];
        const totalDays = daysInMonth + firstDayOfMonth;
        const isSixRowGrid = totalDays > 35;

        //day of last month
        for (let i = firstDayOfMonth - 1; i >= 0; i--) {
            const day = daysInPreviousMonth - i;
            days.push(
                <p key={`prev-${day}`}>
                    {day}
                </p>
            )
        }

        //day in the month
        for (let i = 1; i <= daysInMonth; i++) {
            const currentDate = new Date(monthToPrint.getFullYear(), monthToPrint.getMonth(), i);
            const isCurrentDate = currentDate.toDateString() === dateToPrint.toDateString();
            const dayClass = isCurrentDate ? 'dayInMonth-toShow' : 'dayInMonth';

            days.push(
                <p key={i} className={dayClass}>
                    {i}
                </p>
            );
        }

        //day of next month
        const remainingDays = isSixRowGrid ? 42 - days.length : 35 - days.length;
        for (let i = 1; i <= remainingDays; i++) {
            days.push(
                <p key={`next-${i}`} >
                    {i}
                </p>
            );
        }
        return days
    }
    return(
        <section>
            <div className={"dayInTheWeek"}>
                <p>S</p>
                <p>M</p>
                <p>T</p>
                <p>W</p>
                <p>T</p>
                <p>F</p>
                <p>S</p>
                {renderDays()}
            </div>
        </section>
    )
}

export default PrintCalendar;