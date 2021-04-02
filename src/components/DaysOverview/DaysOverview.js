import DayOverview from './DayOverview';

const DaysOverview = ({reservations}) => {
    // console.log('days here', reservations);


    return (
        <div>
            <h1>Days:</h1>
            {
                reservations.map((reservationsForDay)=>{
                    console.log('DAYS is passing on',reservationsForDay);
                    return <DayOverview key={reservationsForDay.date} reservationsForDay={reservationsForDay} />
                })
            }
            
        </div>
    )
}

export default DaysOverview
