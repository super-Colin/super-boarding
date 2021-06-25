import KennelRowOverview from './KennelRowOverview';

const DayOverview = ({reservationsForDay}) => {
    // console.log('day here', reservationsForDay);

    let sortedReservationsZZZ ={};
    // sortedReservations.map((kennelReservation)=>{
    reservationsForDay.kennelReservations.map((kennelReservation)=>{
        if( sortedReservationsZZZ[kennelReservation.kennelSize]){
            sortedReservationsZZZ[kennelReservation.kennelSize].push(kennelReservation);
        }else{
            sortedReservationsZZZ[kennelReservation.kennelSize] = [kennelReservation];
        }
    });
    

    // console.log( 'SORTED RESERVATIONS ',sortedReservations);
    // console.log( 'SORTED RESERVATIONSZZZ ',sortedReservationsZZZ);
    return (
        <div>
            <h1>______________________________________</h1>
            <h2>Date: {reservationsForDay.date}</h2>
            

            {Object.values(sortedReservationsZZZ).map((kennelSizeReservations)=>{
                return <KennelRowOverview key={kennelSizeReservations.kennelSize} kennelSizeReservations={kennelSizeReservations} />
            })}


            {/* <pre>{JSON.stringify(reservationsForDay, null, 2)}</pre> */}


        </div>
    )
}

export default DayOverview
