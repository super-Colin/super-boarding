import KennelOverview from './KennelOverview';

const DayOverview = ({reservationsForDay}) => {
    console.log('day here', reservationsForDay);
    return (
        <div>
            {
                reservationsForDay.kennelReservations.map((reservation)=>{
                    return <KennelOverview reservation={reservation} />
                })
            }
        </div>
    )
}

export default DayOverview
