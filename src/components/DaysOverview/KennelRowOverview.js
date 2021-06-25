import KennelOverview from "./KennelOverview";

const KennelRowOverview = ({kennelSizeReservations}) => {
    // console.log(kennelSizeReservations[0].kennelSize, kennelSizeReservations);
    const kennelRowSize = kennelSizeReservations[0].kennelSize;
    return (
        <div className={"kennelRow kennelRow-" + kennelRowSize}>
            <h3>Row Size: {kennelRowSize}</h3>
                {kennelSizeReservations.map((kennelReservation)=>{
                    return (
                            <div >
                                <KennelOverview key={kennelReservation.kennelId} kennelReservation={kennelReservation} />
                            </div>
                        )
                })}
        </div>
    )
}

export default KennelRowOverview
