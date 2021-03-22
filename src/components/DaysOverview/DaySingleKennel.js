
const DaySingleKennel = ({kennel}) => {
    return (
        <div className="daySingleKennel">
            <h5>{kennel.groupName}</h5>
            <p>{kennel.kennelSize}</p>
            <p>{kennel.dogName}</p>
        </div>
    )
}

export default DaySingleKennel
