
const DaySingleKennel = ({kennel}) => {

// const generateKennelStatuses = kennelSize => {
//     console.log("generate from", kennelSize);
//     let statuses = [];
//     let i = 1;
//     while(i <= kennelSize.total){
//         labels.push(<div key={i} className="kennelLabelsColumn_label kennelGrid_height" >{kennelSize.size + " #" + i}</div>);
//         i++;
//     }
//     console.log("labels is", labels);
//     return statuses;
// }


    return (
        <div className="daySingleKennel kennelGrid_cell">
            {/* <h5>Kennel #{kennel.kennelId}:</h5> */}
            <p>{kennel.kennelSize}</p>
            {/* <p>{kennel.dogName}</p> */}
        </div>
    )
}

export default DaySingleKennel
