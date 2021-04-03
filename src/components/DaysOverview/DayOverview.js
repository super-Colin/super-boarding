import KennelOverview from './KennelOverview';

const DayOverview = ({reservationsForDay}) => {
    // console.log('day here', reservationsForDay);
    return (
        <div>
            {/* <h2>{reservationsForDay.date}</h2> */}
            <h2>date</h2>

            {/* <h2>{reservationsForDay.date}</h2>
            {
                reservationsForDay.kennelReservations.map((reservation)=>{
                    const kennelKey = reservation.kennelSize + '-' + reservation.kennelId;
                    return <KennelOverview key={kennelKey} reservation={reservation} kennelKey={kennelKey} />
                })
            }
            <hr /> */}
        </div>
    )
}

export default DayOverview
