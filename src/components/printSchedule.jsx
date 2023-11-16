const HourRangeComponent = ({ startHour, endHour }) => {
    const generateHours = () => {
        const hours = [];

        for (let hour = startHour; hour <= endHour; hour++) {
            // Ajoute un zéro devant si l'heure est inférieure à 10
            const formattedHour = hour < 10 ? `0${hour}` : hour;

            // Ajoute l'heure formatée à la liste
            hours.push(
                <div key={hour} className={"scheduleHour"}>
                    <p>{`${formattedHour}:00`}</p>
                    <div className={"simpleLine"}></div>
                </div>
            );
        }

        return hours;
    };

    return (
        <div>
            {generateHours()}
        </div>
    );
};

export default HourRangeComponent