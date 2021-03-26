
const DayColumn = ({staysForDay, kennelSettings}) => {


const generateKennelStatusesForSize = (staysForDay, kennelSize) => {
    let statuses = [];
    console.log("staysForDay", staysForDay);

    let relevantStays = staysForDay.filter(stay => stay.kennelSize == kennelSize.size);
    // console.log('relevant stays:', relevantStays);
    let i = 0;
    while(i < kennelSize.total){
        if(relevantStays[i]){
            // console.log('relevant stay [i]:', relevantStays[i]);
            statuses.push( <div key={i} className="kennelGrid_cell kennelGrid_cell-occupied">{relevantStays[i].petName}</div> );
        }else{
            statuses.push(<div key={i} className="kennelGrid_cell kennelGrid_cell-vacant" >{kennelSize.size + " #" + (i + 1)}</div>);
        }
        i++;
    }
    return statuses;
}


    return (
        <div className="dayColumn_container">


            {kennelSettings.kennelSizes.map((kennelSize)=>
                generateKennelStatusesForSize(staysForDay, kennelSize)
            )}
            {/* <p>sucks..</p> */}


        </div>
    )



}

export default DayColumn









