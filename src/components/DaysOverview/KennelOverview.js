
const KennelOverview = ({kennelReservation}) => {
    return (
        <div className="kennelOverview">
            {/* <p>Kennel: {kennelReservation.kennelId}</p>
            <p>Group:{kennelReservation.groupName}</p>
            <p>Pet:{kennelReservation.petName}</p> */}
            <p>{kennelReservation.kennelId}.) {kennelReservation.petName}</p>
            {/* <p>Notes:{kennelReservation.notes}</p> */}
        </div>
    )
}

export default KennelOverview
