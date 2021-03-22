import DaySingleKennel from "./DaySingleKennel";

const DayColumn = ({stays}) => {
console.log('DayColumn is receiving:', stays);

    return (
        <div className="dayColumn">
            <h4>Column</h4>
            {stays.map((stay) =>
            <div key={stay.id}> 
                <DaySingleKennel  kennel={stay} />
            </div>
            )}
        </div>
    )



}

export default DayColumn









