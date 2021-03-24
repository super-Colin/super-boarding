

const KennelLabelsColumn = ({kennelSettings}) => {
    // console.log("kennel settings", kennelSettings);
    // console.log("kennel settings ENTRIES", Object.entries(kennelSettings.kennelSizes));


    const generateKennelLabels = kennelSize => {
        // console.log("generate from", kennelSize);
        let labels = [];
        let i = 0;
        while(i < kennelSize.total){
            labels.push(<div key={i} className="kennelGrid_labelCell" >{kennelSize.size + " #" + (i + 1)}</div>);
            i++;
        }
        // console.log("labels is", labels);
        return labels;
    }

    return (
        <div className="kennelLabelsColumn_container" >
        <h2>Kennel</h2>
            {kennelSettings.kennelSizes.map((kennelSize)=>
                generateKennelLabels(kennelSize)
            )}
        </div>
    )
}

export default KennelLabelsColumn
