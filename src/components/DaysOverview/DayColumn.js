import DaySingleKennel from "./DaySingleKennel";

const DayColumn = ({stays}) => {
console.log('DayColumn is receiving:', stays);

    return (
        <div className="dayColumn_container">
            <h4>Column</h4>
            {stays.map((stay) =>
            <div key={stay.kennelId}> 
                <DaySingleKennel  kennel={stay} />
            </div>
            )}
        </div>
    )



}

export default DayColumn









