export function MonthToday(){   //Allows you to see the month written out in full
    let date = new Date();
    const options = { month: 'long' };
    const actualMonth = new Intl.DateTimeFormat('en-US', options).format(date);
    return (actualMonth);
}

export function DayToday(){     //Allows you to find out the day written out in full
    const date = new Date();
    const options = { weekday: 'long' };
    const actualDay = new Intl.DateTimeFormat('en-US', options).format(date)
    return (actualDay);
}

export function DayInTheMonthToday(){       //To know the day written in figures
    const date = new Date();
    const actualDayInTheMonth = date.getDate()
    return (actualDayInTheMonth);
}
