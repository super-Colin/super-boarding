
const KennelOverview = ({reservation, kennelKey}) => {
    return (
        <div>
            <p>Group:{reservation.groupName}</p>
            <p>Pet:{reservation.petName}</p>
            <p>Kennel: {kennelKey}</p>
            <p>Notes:{reservation.notes}</p>
            <br />
        </div>
    )
}

export default KennelOverview
