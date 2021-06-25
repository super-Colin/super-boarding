import DayOverview from './DayOverview';

const DaysOverview = ({reservations}) => {
    // console.log('days here', reservations);

    // const reservationsArray = Object.values(reservations);
    // console.log(reservationsArray);

    return (
        <div className="dayOverview_container">
            <h1>Days:</h1>
            {Object.values(reservations).map((reservationsForDay)=>{ 
                return <DayOverview key={reservationsForDay.date} reservationsForDay={reservationsForDay} /> 
            })}
            {/* <h1>_________________JSON_____________________</h1>
            <pre>{JSON.stringify(reservations, null, 2)}</pre> */}

        </div>
    )
}

export default DaysOverview
