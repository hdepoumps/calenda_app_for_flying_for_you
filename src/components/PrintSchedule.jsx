// HourRangeComponent displays a range of hours with dividers
const HourRangeComponent = ({ startHour, endHour }) => {
    // Function to generate the hours and dividers
    const generateHours = () => {
        const hours = [];

        for (let hour = startHour; hour <= endHour; hour++) {
            // Add a leading zero if the hour is less than 10
            const formattedHour = hour < 10 ? `0${hour}` : hour;

            // Create a div for each hour with a divider
            hours.push(
                <div key={hour} className={"scheduleHour"}>
                    <p>{`${formattedHour}:00`}</p>
                    <div className={"simpleLine"}></div>
                </div>
            );
        }

        return hours;
    };

    // Render the generated hours
    return (
        <div>
            {generateHours()}
        </div>
    );
};

export default HourRangeComponent;
