

const CurrentStayInfo = ({currentStayDetails}) => {
    return (
        <div>
            <br />
            <h4>Current Stay Info:</h4>
            <p>Group: {currentStayDetails.groupName}</p>
            <p>Group Notes: {currentStayDetails.groupNotes}</p>
            <br />
            <p>Pet: {currentStayDetails.pets[0].petName}</p>
            <p>From: {currentStayDetails.pets[0].arrivalDate}</p>
            <p>To: {currentStayDetails.pets[0].releaseDate}</p>
            <p>Notes: {currentStayDetails.pets[0].notes}</p>
            <br />
        </div>
    )
}

export default CurrentStayInfo
