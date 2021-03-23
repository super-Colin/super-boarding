import DaySingleKennel from "./DaySingleKennel";

const DayColumn = ({stays, kennelSettings}) => {
console.log('DayColumn is receiving:', stays);

const generateKennelStatusesForSize = (stays, kennelSize) => {
    console.log("generate statuses from", kennelSize, kennelSize);
    let statuses = [];
    let i = 1;
    while(i <= kennelSize.total){

        statuses.push(<div key={i} className="kennelGrid_height kennelGrid_cell" >{kennelSize.size + " #" + i}</div>);
        i++;
    }
    console.log("labels is", statuses);
    return statuses;
}

    return (
        <div className="dayColumn_container">


            {kennelSettings.kennelSizes.map((kennelSize)=>
                generateKennelStatusesForSize(stays, kennelSize)
            )}


        </div>
    )



}

export default DayColumn









