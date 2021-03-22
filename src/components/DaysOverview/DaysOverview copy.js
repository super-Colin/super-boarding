import DayColumn from './DayColumn';


const DaysOverview = ({dates}) => { // Notice that we are destructuring the input object

    console.log('DayOverview is receiving:', dates);
    console.log('DayOverview is receiving:', typeof(dates));
    console.log('DayOverview is receiving ENTRIES:', Object.entries(dates));
    console.log('DayOverview is receiving ENTRIES:', typeof(Object.entries(dates)) );
    console.log('--------------------------------------');

    return (
        <div>
            {dates.map((date)=>{
                <div>
                    <h1>Day Overview</h1>
                    <h3>{date.date}</h3>
                    <DayColumn key={date.id} stays={date.stays} /> 
                {console.log("date in overview loop is:", date, date.date)}
                </div>
            })}
            {/* <DayColumn days={days} /> */}
        </div>
    )
}

export default DaysOverview
