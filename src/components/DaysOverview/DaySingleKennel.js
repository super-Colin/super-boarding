
const DaySingleKennel = ({kennel}) => {
    return (
        <div className="daySingleKennel">
            <h5>Kennel #{kennel.kennelId}:</h5>
            <p>{kennel.kennelSize}</p>
            <p>{kennel.dogName}</p>
        </div>
    )
}

export default DaySingleKennel
