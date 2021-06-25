import KennelOverview from './KennelOverview';
import KennelRowOverview from './KennelRowOverview';

const DayOverview = ({reservationsForDay}) => {
    // console.log('day here', reservationsForDay);
    const sortedReservations = reservationsForDay.kennelReservations.sort((a, b)=>{
        const kennelSizeA = a.kennelSize; 
        const kennelSizeB = b.kennelSize;
        if(kennelSizeA < kennelSizeB){ return 1}
        if(kennelSizeA > kennelSizeB){ return -1}
        return 0;
    })
    let sortedReservationsZZZ ={};
    sortedReservations.map((kennelReservation)=>{
        if( sortedReservationsZZZ[kennelReservation.kennelSize]){
            // sortedReservationsZZZ[kennelReservation.kennelSize] = [kennelReservation];
            // sortedReservationsZZZ[kennelReservation.kennelSize] = [];
            sortedReservationsZZZ[kennelReservation.kennelSize].push(kennelReservation);
        }else{
            // console.log('didnt find reservationZZZ size', kennelReservation.kennelSize);
            sortedReservationsZZZ[kennelReservation.kennelSize] = [kennelReservation];
            // sortedReservationsZZZ[kennelReservation.kennelSize].push(kennelReservation);
        }
    });
    

    console.log( 'SORTED RESERVATIONS ',sortedReservations);
    console.log( 'SORTED RESERVATIONSZZZ ',sortedReservationsZZZ);
    return (
        <div>
            <h2>date: {reservationsForDay.date}</h2>
            

            {sortedReservations.map((kennelReservation)=>{
                const kennelKey = kennelReservation.kennelSize + kennelReservation.kennelId;
                return <KennelOverview key={kennelKey} kennelReservation={kennelReservation} />
            })}
            {
                {/* ()=>{
                    let html = '';
                    for(const size in sortedReservationsZZZ){
                        return (<div className="kennelSize">
                            {size.map((kennelReservation)=>{
                                const kennelKey = kennelReservation.kennelSize + kennelReservation.kennelId;
                                return <KennelOverview key={kennelKey} kennelReservation={kennelReservation} />
                            })}
                        </div>);
                    }
                } */}
            }

            <pre>{JSON.stringify(reservationsForDay, null, 2)}</pre>


        </div>
    )
}

export default DayOverview
