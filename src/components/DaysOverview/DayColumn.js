import DaySingleKennel from "./DaySingleKennel";




const DayColumn = ({stays, kennelSettings}) => {
// console.log('DayColumn is receiving:', stays, stays[0].kennelSize);

const generateKennelStatusesForSize = (stays, kennelSize) => {
    // console.log("generate statuses from", kennelSize);
    let statuses = [];

    let relevantStays = stays.filter(stay => stay.kennelSize == kennelSize.size);
    console.log('relevant stays:', relevantStays);
    let i = 0;
    while(i < kennelSize.total){
        // console.log('relevant stay [i]:', relevantStays[i]);
        if(relevantStays[i]){
            console.log('relevant stay [i]:', relevantStays[i]);
            // statuses.push( <div key={i} className="kennelGrid_height kennelGrid_cell">{relevantStays[i]["petName"]}</div> );
            statuses.push( <div key={i} className="kennelGrid_height kennelGrid_cell">{relevantStays[i].petName}</div> );
            // statuses.push( <div key={i} className="kennelGrid_height kennelGrid_cell">{relevantStays[i].petName}</div> );
        }else{
            statuses.push(<div key={i} className="kennelGrid_height kennelGrid_cell" >{kennelSize.size + " #" + (i + 1)}</div>);
        }
        i++;
    }
    // console.log("labels is", statuses);
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









