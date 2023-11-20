import "../style/css/printCalendar.css";

const PrintCalendar = ({ dateToPrint, monthToPrint, setDateToUse}) => {
    const getDaysInMonth = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    const daysInMonth = getDaysInMonth(monthToPrint);

    // Calculating the first day of the month, adjusting to start with Monday
    const firstDayOfMonth = new Date(monthToPrint.getFullYear(), monthToPrint.getMonth(), 1).getDay();
    const adjustedFirstDayOfMonth = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

    const daysInPreviousMonth = getDaysInMonth(new Date(monthToPrint.getFullYear(), monthToPrint.getMonth() - 1));

    const handleDayClick = (day) => {
        const newDateToUse = new Date(monthToPrint.getFullYear(), monthToPrint.getMonth(), day);
        setDateToUse(newDateToUse);
    };
    const renderDays = () => {
        const days = [];
        const totalDays = daysInMonth + adjustedFirstDayOfMonth;
        const isSixRowGrid = totalDays > 35;

        // Days of the previous month
        const lastDayOfPrevMonth = daysInPreviousMonth - adjustedFirstDayOfMonth;

        for (let i = lastDayOfPrevMonth + 1; i <= daysInPreviousMonth; i++) {
            days.push(
                <p key={`prev-${i}`} className="prevMonthDay">
                    {i}
                </p>
            );
        }

        // Days of the current month
        for (let i = 1; i <= daysInMonth; i++) {
            const currentDate = new Date(monthToPrint.getFullYear(), monthToPrint.getMonth(), i);
            const isCurrentDate = currentDate.toDateString() === dateToPrint.toDateString();
            const dayClass = isCurrentDate ? 'dayInMonth-toShow' : 'dayInMonth';

            days.push(
                <p key={i} className={dayClass} onClick={()=>{handleDayClick(i)}}>
                    {i}
                </p>
            );
        }

        // Days of the following month
        const remainingDays = isSixRowGrid ? 42 - days.length : 35 - days.length;
        for (let i = 1; i <= remainingDays; i++) {
            days.push(
                <p key={`next-${i}`} className="nextMonthDay">
                    {i}
                </p>
            );
        }

        return days;
    };

    return (
        <div className={"dayInTheWeek"}>
            <p>M</p>
            <p>T</p>
            <p>W</p>
            <p>T</p>
            <p>F</p>
            <p>S</p>
            <p>S</p>
            {renderDays()}
        </div>
    );
};

export default PrintCalendar;
