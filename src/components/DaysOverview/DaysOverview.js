import DayColumn from './DayColumn';


const DaysOverview = ({dates}) => { // Notice that we are destructuring the input object

    console.log('DayOverview is receiving:', dates);
    console.log('DayOverview is receiving:', typeof(dates));
    console.log('--------------------------------------');

    return (
        <div>
            {dates.map((date)=>
                <div key={date.id}>
                    <h1>Day Overview</h1>
                    <h3>{date.date}</h3>
                    <DayColumn stays={date.stays} /> 
                </div>
            )}
            {/* <DayColumn days={days} /> */}
        </div>
    )
}

export default DaysOverview
