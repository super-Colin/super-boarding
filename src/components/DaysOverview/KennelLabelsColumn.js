

const KennelLabelsColumn = ({kennelSettings}) => {
    console.log("kennel settings", kennelSettings);
    console.log("kennel settings ENTRIES", Object.entries(kennelSettings.kennelSizes));


    const generateKennelLabels = kennelSize => {
        console.log("generate from", kennelSize);
        let labels = [];
        let i = 1;
        while(i <= kennelSize.total){
            labels.push(<div key={i}>{kennelSize.size + " #" + i}</div>);
            i++;
        }
        console.log("labels is", labels);
        return labels;
    }

    return (
        <div>
            {kennelSettings.kennelSizes.map((kennelSize)=>
                generateKennelLabels(kennelSize)
            )}
        </div>
    )
}

export default KennelLabelsColumn
